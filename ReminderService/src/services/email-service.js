const sender = require("../config/email-config");

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

module.exports = {
    sendBasicEmail
}