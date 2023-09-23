const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/errors/index");
const { StatusCodes } = require("http-status-codes");

class BookingReposirory {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw AppError(
        "RepositoryError",
        "Can not create booking",
        "Some issue with booking,try again later!!",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(data){
    try {
        
    } catch (error) {
        
    }

  }
}

module.exports = BookingReposirory;
