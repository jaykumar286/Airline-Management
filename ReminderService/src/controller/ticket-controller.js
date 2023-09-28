const TicketService = require("../services/email-service");

const create = async (req, res) => {
  try {
    const response = await TicketService.createNotification(req.body);
    return res.status(200).json({
      data: response,
      message: "Succesfully created ticket",
      error: {},
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      message: "Error on created ticket",
      error: error,
      isSuccess: false,
    });
  }
};

module.exports = { create };
