const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class CategoryService {

  constructor(){}

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find(query, userId) {
    const options = {
      include: ['products'],
      where: {}
    }

    const { ownerId } = query;
    if (ownerId) {
      options.where.ownerId = ownerId;
    }
   /* const { storeId } = query;
    if (storeId) {
      options.where.storeId = storeId;
    }*/
    const owner = await models.Owner.findAll({where: { userId }});//owner tiene un campo user id
    const categories = await models.Category.findAll(options);
    return categories;
  }

  //Busca primero el user, el owner y luego filtra la categoria en el where
  async findByOwner(query) {
    const options = {
      include: ['products'],
      where: {}
    }
    const { ownerId } = query;
    if (ownerId) {
      options.where.ownerId = ownerId;
    }

    const categories = await models.Category.findAll(options);
    return categories;
  }

  /*async findByOwner(ownerId) {
    const categories = await models.Category.findAll({
      where: {
        '$owner.id$': ownerId
      },
      include: [
        {
          association: 'owner',
          include: ['user']
        }
      ]
    });
    return categories;
  }*/

  /*async findByUser(userId) {
    const category = await models.Category.findAll({
      where: {
        '$owner.user.id$': userId
      },
      include: [
        {
          association: 'owner',
          include: ['user']
        }
      ]
    });
    return orders;
  }*/

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    return category;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

}

module.exports = CategoryService;
