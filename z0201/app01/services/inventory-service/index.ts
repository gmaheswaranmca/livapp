import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.INVENTORY_DB || "default_db";
const app_port = process.env.INVENTORY_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/inventory/health',(req,res)=>res.json({status:'UP'}));

app.post('/inventory/reserve', async(req,res)=>{
 const {orderId,items}=req.body;
 const sku=items[0].sku;
 const qty=items[0].qty;

 const c=await pool.connect();
 try{
   await c.query('BEGIN');

   const r=await c.query(
    'SELECT quantity_available FROM inventory_stock WHERE sku=$1 FOR UPDATE',
    [sku]
   );

   if(r.rows.length===0){
      await c.query('ROLLBACK');
      return res.status(404).json({error:'SKU_NOT_FOUND'});
   }

   if(r.rows[0].quantity_available < qty){
      await c.query('ROLLBACK');
      return res.status(400).json({error:'OUT_OF_STOCK'});
   }

   await c.query(
    `UPDATE inventory_stock
      SET quantity_available=quantity_available-$1,
          quantity_reserved=quantity_reserved+$1
      WHERE sku=$2`,
    [qty,sku]
   );

   await c.query('COMMIT');

   res.json({reservationId:'R100',status:'Reserved'});
 }catch(e){
   await c.query('ROLLBACK');
   res.status(500).json({error:'RESERVE_FAILED'});
 }finally{
   c.release();
 }
});

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});