const { CityService } = require("../services/index");

const cityService = new CityService();

const create = async (req, res) => {
  try {
    const city = await cityService.createCity(req.body);
    return res.status(201).json({
      data: city,
      isSucess: true,
      message: "Succefull in creating!!",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      isSucess: false,
      message: "Unsuccefull in creating!!",
      err: {},
    });
  }
};

const get = async (req, res) => {
  try {
    const city = await cityService.getCity(req.params.id);
    return res.status(200).json({
      data: city,
      isSucess: true,
      message: "Succefull in fetching!!",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      isSucess: false,
      message: "Unsuccefull in fetching!!",
      err: {},
    });
  }
};

const getAll = async (req, res) => {
  try {
    const city = await cityService.getAllCity(req.query);
    return res.status(200).json({
      data: city,
      isSucess: true,
      message: "Succefull in all cities fetching!!",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      isSucess: false,
      message: "Unsuccefull in all cities fetching!!",
      err: {},
    });
  }
};

const update = async (req, res) => {
  try {
    const city = await cityService.updateCity(req.params.id, req.body);
    return res.status(200).json({
      data: city,
      isSucess: true,
      message: "Succefull in updating!!",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      isSucess: false,
      message: "Unsuccefull in updating!!",
      err: {},
    });
  }
};

const destroy = async (req, res) => {
  try {
    const city = await cityService.deleteCity(req.params.id);
    return res.status(200).json({
      data: city,
      isSucess: true,
      message: "Succefull in deleting!!",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      isSucess: false,
      message: "Unsuccefull in deleting!!",
      err: {},
    });
  }
};

module.exports = {
  create,
  get,
  update,
  destroy,
  getAll
};
