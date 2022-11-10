const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class StoreService {
  constructor() {}

  async create(data) {
    const newStore = await models.Store.create(data);
    return newStore;
  }

  async find(ownerId) {
    const options = {
      where: {}
    }
    //const { ownerId } = ownerId;
    if (ownerId) {
      options.where.ownerId = ownerId;
    }
    const stores = await models.Store.findAll(options);
    return stores;
  }

}

module.exports = StoreService;
