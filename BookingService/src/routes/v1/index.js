const express = require("express");

const {BookingController } = require("../../controllers/index");
// const {createChannel} = require("../../utils/message-queue");

const router = express.Router();
// const channel = await createChannel();
const bookingController = new BookingController();

router.post("/bookings",bookingController.create);
router.post("/publish",bookingController.sendMessageQueue);
module.exports = router;