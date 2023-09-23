const axios = require('axios');
const {BookingReposirory} = require("../repository/index");
const {FLIGHT_SERVICE_PATH} = require("../config/serverConfig"); 
const {ServiceError} = require("../utils/errors/index");

class BookingService{

    constructor(){
        this.bookingRepository = new BookingReposirory();
    }

    async createBooking(data){
        try {
            const flightId = data.flightId;
            const flightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flightResponse = await axios.get(flightURL);            
            const flightData = flightResponse.data.data;
            let priceOfFlight = flightData.price;
            if (data.noOfSeates > flightData.totalSeats){
                throw new ServiceError("Something wrong on Booking!!","Insufficient seats");
            }
            const totalCost = priceOfFlight * data.noOfSeates;
            const bookingData = {...data,totalCost:totalCost};
            const booking = await this.bookingRepository.create(bookingData);
            await axios.patch(`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`,{
                totalSeats:flightData.totalSeats - bookingData.noOfSeates
            });
            return booking;
        } catch (error) {
            if(error.name == "ValidationError" || error.name == "ValidationError"){
                throw error;
            }
            throw new ServiceError();
        }
    };
};

module.exports = BookingService;