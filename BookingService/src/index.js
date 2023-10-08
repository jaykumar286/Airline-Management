const express = require("express");
const bodyParser = require("body-parser");

const {PORT} = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const db = require("./models/index");

const app =express();

const setUpAndStartServer = () => {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/booking_service/api",ApiRoutes);

    app.get("/booking_service/api/v1/home",(req,res)=>{
        res.json({
            success:"true"
        })
    })

    if (process.env.DB_SYNC){
        db.sequelize.sync({alter:true});
    }

    app.listen(PORT,async()=>{
        console.log(`Server is running on ${PORT}`);

    });

};

setUpAndStartServer();