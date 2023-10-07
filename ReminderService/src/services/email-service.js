const sender = require("../config/email-config");
const TicketRepository = require("../repository/ticket-repository");

const repo = new TicketRepository();

const sendBasicEmail  = (mailFrom,mailTo,mailSubject,mailBody) => {
    try {
        sender.sendMail(
            {
                from:mailFrom,
                to:mailTo,
                subject:mailSubject,
                text:mailBody
            }
        )   
    } catch (error) {
        console.log("Error on sending basic email");
    }
};

const fetchPendingEmail =async (timeStamp) => {
    try {
        const response = await repo.get({status:"PENDING"});
        return response;
    } catch (error) {
        console.log("Error on fetchin pendin email");
    }
}

const createNotification = async (data) => {
    try {
        const response = await repo.create(data);
        console.log(data);
        return response
    } catch (error) {
        console.log(error)
        console.log("Error on creating email");
    }
}


const updateTicket = async(ticketId,data) => {
    try {
        const response = await repo.update(ticketId,data);
        return response
    } catch (error) {
        console.log("Error on creating email");
    }
};

const subscribeEvent = async(payload) => {
    let service = payload.service;
    let data = payload.data;

    switch(service){
        case "CREATE_TICKET" : 
            await createNotification(data);
            break;
        case "SEND_BASIC_MAIL":
            await sendBasicEmail();
            break;
        default:
            console.log("No valid event!!");
            break;
    }
};

module.exports = {
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateTicket,
    subscribeEvent
}