const {FlightService} = require("../services/index");

const flightService = new FlightService();


const create = async (req,res) => {
    try {
        const flight = await flightService.createFlight(req.body);
        return res.status(200).json(
            {
                data:flight,
                sucess:true,
                err:{},
                message:"Succesful in flight created!!"
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                data:{},
                sucess:true,
                err:error,
                message:"Unsuccesful in flight created!!"
            }
        )
    }

};

const getAll = async (req,res) => {
    try {
        const flight = await flightService.getAllFlightData(req.query);
        return res.status(200).json(
            {
                data:flight,
                sucess:true,
                err:{},
                message:"Succesful in flight fetched!!"
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                data:{},
                sucess:true,
                err:error,
                message:"Unsuccesful in flight fetched!!"
            }
        )
    }

};

module.exports = {
    create,
    getAll
};