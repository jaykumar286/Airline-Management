const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/email-config");

const setUpJobs = () => {
  cron.schedule("* * * * *", async () => {
    // bussiness logic code (services)
    console.log("Cron Job");
    const res = await emailService.fetchPendingEmail();
    try {
      res.forEach((email) => {
        sender.sendMail(
          {
            from: "gokuxss4k@gmail.com",
            to: email.recepientEmail,
            subject: email.subject,
            text: email.content,
          },
          async (error, data) => {
            if (error) {
              console.log(error);
            } else {
              console.log(data);
              await emailService.updateTicket(email.id, { status: "SUCCESS" });
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = setUpJobs;
