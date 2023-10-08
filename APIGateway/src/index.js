const express = require("express");
const morgan = require('morgan')
const { createProxyMiddleware } = require('http-proxy-middleware');
const { rateLimit } = require('express-rate-limit');
const { default: axios } = require("axios");

const app = express();

const PORT = 3005;

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
})

app.use(morgan("combined"));
app.use(limiter);
app.use("/booking_service",async (req,res,next)=>{
    try {
        const response = await axios.get("http://localhost:3001/api/v1/isAuthenticated",{
            headers:{
                "x-access-token":req.headers["x-access-token"]
            }
        });
    
        if(response.data.isSuccess){
            next();
        }
        else{
            return  res.status(404).json(
                {
                    data:{},
                    err:"User Authentication fails!!",
                    message:"User Authentication fails!!",
                    isSuccess:false
                });
        }   
    } catch (error) {
        return  res.status(404).json(
            {
                data:{},
                err:"User Authentication fails!!",
                message:"User Authentication fails!!",
                isSuccess:false
            });
    }
 });
app.use('/booking_service', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

app.get("/home",(req,res)=>{
    return res.status(200).json(
        {
            isSucess:"true"
        }
    )
});

app.listen(PORT,()=>{
    console.log(`Server Running on:${PORT}`);
});