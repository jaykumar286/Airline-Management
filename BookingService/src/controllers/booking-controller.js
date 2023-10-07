const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const { createChannel, publishMessage } = require("../utils/message-queue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {

  async sendMessageQueue(req, res) {
    try {
      const channel = await createChannel();
      const payload = { 
        data:{
            subject:"this a subject2",
            content:"this is a content2",
            recepientEmail:"19BCE038@nirmauni.ac.in",
            notificationTime:"2021-07-06 09:49:00.000000"
        },
        service:"CREATE_TICKET"
      };
      publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
      return res.status(StatusCodes.OK).json({
        data: payload.data,
        message: "Successfully publish",
        isSucess: true,
        err: {},
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        data: {},
        message: error.message,
        isSucess: false,
        err: error.explanation,
      });
    }
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        data: response,
        message: "Successfully Booking",
        isSucess: true,
        err: {},
      });
    } catch (error) {
      console.log(error);
      return res.status(error.statusCode).json({
        data: {},
        message: error.message,
        isSucess: false,
        err: error.explanation,
      });
    }
  }
}
// const create = async(req,res) => {
//     try {

//         const response = await bookingService.createBooking(req.body);
//         return res.status(StatusCodes.OK).json(
//             {
//                 data:response,
//                 message:"Successfully Booking",
//                 isSucess:true,
//                 err:{}
//             }
//         );
//     } catch (error) {
//         console.log(error);
//         return res.status(error.statusCode).json(
//             {
//                 data:{},
//                 message:error.message,
//                 isSucess:false,
//                 err:error.explanation
//             }
//         );
//     }

// };

module.exports = BookingController;
