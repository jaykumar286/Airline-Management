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
        return response
    } catch (error) {
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
module.exports = {
    sendBasicEmail,
    fetchPendingEmail,
    createNotification,
    updateTicket
}