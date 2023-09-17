const {FlightRepository,AirplaneRepository} = require("../repository/index");
const {compareTime} = require("../utils/helper");


class FlightService{
    constructor(){
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data){
        try {
            if(!compareTime(data.arrivalTime,data.departureTime))
            {
                throw {error:"Arrival Time can't be greater than departure time"};
            }
            const airplane =await this.airplaneRepository.getAirplane(data.airplaneId);
            const capacity = airplane.capacity.toString();
            const flightData = {
                ...data,totalSeats:airplane.capacity
            };
            const flight = await this.flightRepository.createFlight(flightData);
            return flight;
        } catch (error) {
            console.log("Something went wrong in flighr service!!")
            throw {error};
        }
    }

    async getAllFlightData(filter){
        try {
            const flights = await this.flightRepository.getAllFlight(filter);
            return flights;
        } catch (error) {
            console.log("Something went wrong in flighr service!!")
            throw {error};
        }
    }
}

module.exports = FlightService;