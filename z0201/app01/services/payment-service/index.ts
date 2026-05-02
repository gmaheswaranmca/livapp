import express from "express";
import {Pool} from "pg";

const db_user = process.env.POSTGRES_USER || "default_user";
const db_pass = process.env.POSTGRES_PASSWORD || "default_password";
const db_host = process.env.POSTGRES_HOST || "default_host";
const db_port = process.env.POSTGRES_PORT || "default_port";
const db_name = process.env.PAYMENT_DB || "default_db";
const app_port = process.env.PAYMENT_PORT || "default_app_port";

const app=express();
app.use(express.json());

const pool=new Pool({
 host:db_host,
 user:db_user,
 password:db_pass,
 database:db_name,
 port: parseInt(db_port)
});

app.get('/payments/health',(req,res)=>res.json({status:'UP'}));
app.post('/payments/authorize', async(req,res)=>{
  const {orderId,amount}=req.body;

  const paymentId='P900';

  await pool.query(
  'INSERT INTO payments(payment_id,order_id,amount,status) VALUES($1,$2,$3,$4)',
  [paymentId,orderId,amount,'AUTHORIZED']
  );

  res.json({paymentId,status:'Authorized'});
});

app.listen(app_port, () => {
  console.log(`Server Started at localhost:${app_port}`)
});