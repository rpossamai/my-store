const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class LocationService {

  constructor(){
  }

  async create(data) {
    const newLocation = await models.Location.create(data);
    return newLocation;
  }


  async findByUser(userId) {
    const location = await models.Location.findAll({
      where: { userId }
    });
    return location;
  }

  async addDirection(data) {
    const newItem = await models.Location.create(data);
    return newItem;
  }

  async find() {
    return [];
  }

  /*async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    return order;
  }*/

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = LocationService;