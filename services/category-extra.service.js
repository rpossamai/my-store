const boom = require('@hapi/boom');

const { models }= require('../libs/sequelize');

class CategoryExtraService {
  constructor() {}

  async create(data) {
    const newCategory = await models.CategoryExtra.create(data);
    return newCategory;
  }

  /*async find(query) {
    const options = {
      include: ['products'],
      where: {},
    };
    const { ownerId } = query;
    if (ownerId) {
      options.where.ownerId = ownerId;
    }
    const categories = await models.CategoryExtra.findAll(options);
    return categories;
  }*/

  //Servicio utilizado para buscar los productos por categorias
  // con su disponibilidad asociada por tienda
  async findByOwner(query) {
    const { ownerId, storeId } = query;
    var options = '';
    if (storeId) {
      options = {
        include: [ {
            association: 'products',
            include: ['stores'] },
        ], where: { '$products.stores.id$': storeId },
      };
    } else {
      options = {
        include: [ {
            association: 'products',
            include: ['stores'] },
        ], where: {},
      };
    }
    if (ownerId) { options.where.ownerId = ownerId; }

    const categories = await models.CategoryExtra.findAll(options);
    return categories;
  }

  //Servicio utilizado para buscar los productos por categorias
  // con su disponibilidad asociada por tienda
  async findByProduct(query, productId) {
    const { ownerId } = query;
    var options = {
      include: [{
          association: 'productsExtra',
          include: ['stores'] },
        { association: 'products' }
      ],where: { '$products.id$': productId },
    };
    if (ownerId) { options.where.ownerId = ownerId; }

    const categories = await models.CategoryExtra.findAll(options);
    return categories;
  }

  async findOne(id) {
    const category = await models.CategoryExtra.findByPk(id, {
      include: ['products']});
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

module.exports = CategoryExtraService;
