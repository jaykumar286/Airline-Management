const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");

const {PORT} = require("./config/serverConfig");
const {sendBasicEmail} = require("./services/email-service");

const setUpAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.listen(PORT,()=>{
        console.log(`Server running on PORT:${PORT}`);
    });
    // sendBasicEmail("supportflight@gmail.com","19bce038@nirmauni.ac.in","Test EMail","Hello World,Testin EMail");

    cron.schedule('* * * * *', () => {
        console.log('running a task every minute');
      });
};

setUpAndStartServer();