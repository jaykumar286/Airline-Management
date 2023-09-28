const { TicketNotification } = require("../models/index");
const { Op } = require("sequelize");

class TicketRepository {
  
  async getAll() {
    try {
      const tickets = await TicketNotification.findAll();
      return tickets;
    } catch (error) {
      throw Error;
    }
  }

  async create(data) {
    try {
      const ticket = await TicketNotification.create(data);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async update(ticketId,data) {
    try {
      const ticket = await TicketNotification.findByPk(ticketId);
      ticket.status = data.status
      await ticket.save();
      return ticket;
   } catch (error) {
      throw error;
    }
  }

  async get(filter) {
    try {
      const ticket = await TicketNotification.findAll({
        where: {
          status: filter.status,
          notificationTime: {
            [Op.lte]: new Date(),
          },
        },
      });
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TicketRepository;
