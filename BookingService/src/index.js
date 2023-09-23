const express = require("express");
const bodyParser = require("body-parser");

const {PORT} = require("./config/serverConfig");
const ApiRoutes = require("./routes/index");
const db = require("./models/index");

const app =express();

const setUpAndStartServer = () => {
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/api",ApiRoutes);

    if (process.env.DB_SYNC){
        db.sequelize.sync({alter:true});
    }

    app.listen(PORT,async()=>{
        console.log(`Server is running on ${PORT}`);
    });

};

setUpAndStartServer();