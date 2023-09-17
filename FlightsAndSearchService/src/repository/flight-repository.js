const { Op, where } = require("sequelize");
const {Flight} = require("../models/index");

class FlightRepositery{

    #createFilter(data){

        let filter = {};
        
        if (data.arrivalAirporId){
            filter.arrivalAirporId = data.arrivalAirporId;
        }
        
        if(data.departureAirportId){
            filter.departureAirportId = data.departureAirportId;
        }
        
        if(data.minPrice && data.maxPrice){
            Object.assign(filter,{price:{[Op.between]:[data.minPrice,data.maxPrice]}});
        }
        else if(data.minPrice){
            Object.assign(filter,{price:{[Op.gte]:data.minPrice}});
        }
        else if(data.maxPrice){
            Object.assign(filter,{price:{[Op.lte]:data.maxPrice}});
        }
        return filter;
    }

    async createFlight(data){
        try {
            const flight = await Flight.create(data);
            return flight
        } catch (error) {
            console.log("Something went wrong in flighr repo!!");
            throw {error};
        }
    }


    async getFlight(flightId) {
        try {
          const flight = await Flight.findByPk(flightId);
          return flight;
        } catch (error) {
          console.log("Something went wrong in repository layer!!");
          throw { error };
        }
      }

      async getAllFlight(filter) {
        try {
          const filterObject = this.#createFilter(filter); 
          const flight = await Flight.findAll({where:filterObject});
          return flight;
        } catch (error) {
          console.log("Something went wrong in repository layer!!");
          throw { error };
        }
      }
    
}

module.exports =FlightRepositery;