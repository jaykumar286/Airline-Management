const express = require("express");
const bodyParser = require("body-parser");

const {PORT} = require("./config/serverConfig");
const {sendBasicEmail} = require("./services/email-service");
const jobs = require("./utils/job");
const TicketController = require("./controller/ticket-controller");

const setUpAndStartServer =async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    
    app.post("/api/v1/tickets",TicketController.create);
    
    app.listen(PORT,()=>{
        console.log(`Server running on PORT:${PORT}`);
        jobs();
    });

    
    // sendBasicEmail("supportflight@gmail.com","19bce038@nirmauni.ac.in","Test EMail","Hello World,Testin EMail");

    // cron.schedule('* * * * *', () => {
    //     console.log('running a task every minute');
    //   });
};

setUpAndStartServer();