import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.ORDER_DB || "default_db";
const app_port = process.env.ORDER_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/orders/health',(req,res)=>res.json({status:'UP'}));

async function postJson(url:string,payload:any){
 const r=await fetch(url,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(payload)
 });
 if(!r.ok) throw new Error(await r.text());
 return r.json();
}

app.post('/orders/create', async(req,res)=>{
 const body=req.body || {
   customerId:'C101',
   items:[{sku:'P1',qty:2}],
   amount:2500
 };

 const orderId='O500';

 try{
   await pool.query(
   'INSERT INTO orders(order_id,customer_id,amount,status) VALUES($1,$2,$3,$4)',
   [orderId,body.customerId,body.amount,'PENDING']
   );

   await pool.query(
   'INSERT INTO order_items(order_id,sku,qty) VALUES($1,$2,$3)',
   [orderId,body.items[0].sku,body.items[0].qty]
   );

   await postJson(
    'http://inventory-service:5001/inventory/reserve',
    {orderId,items:body.items}
   );

   await postJson(
    'http://payment-service:5002/payments/authorize',
    {orderId,amount:body.amount}
   );

   await postJson(
    'http://shipping-service:5003/shipments/create',
    {orderId}
   );

   await pool.query(
    'UPDATE orders SET status=$1 WHERE order_id=$2',
    ['COMPLETED',orderId]
   );

   res.json({orderId,status:'COMPLETED'});
 }
 catch(e){
   await pool.query(
    'UPDATE orders SET status=$1 WHERE order_id=$2',
    ['CANCELLED',orderId]
   );

   res.status(500).json({
     orderId,
     status:'CANCELLED',
     error:'FLOW_FAILED'
   });
 }
});

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});