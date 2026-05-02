import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.SHIPPING_DB || "default_db";
const app_port = process.env.SHIPPING_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/shipments/health',(req,res)=>res.json({status:'UP'}));
app.post('/shipments/create', async(req,res)=>{
 const {orderId}=req.body;

 const shipmentId='S333';

 await pool.query(
 'INSERT INTO shipments(shipment_id,order_id,status) VALUES($1,$2,$3)',
 [shipmentId,orderId,'CREATED']
 );

 res.json({shipmentId,status:'Created'});
});

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});