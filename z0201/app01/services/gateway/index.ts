import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app_port = process.env.GATEWAY_PORT || "default_app_port";
const order_port = process.env.ORDER_PORT || "default_order_port";

const app = express();


/*
app.use(
 "/api/orders",
 createProxyMiddleware({
   target:`http://order-service:${order_port}`,
   changeOrigin:true
 })
);*/

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: `http://order-service:${order_port}`, // use localhost if not in Docker
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": ""
    }
  })
);

app.get("/health",(req,res)=>{
 res.json({status:"UP"});
});

app.listen(app_port,()=>{
 console.log(`Gateway Started at localhost:${app_port}`);
});