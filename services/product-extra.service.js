const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const StoreService = require('./store.service');
const storeService = new StoreService();
const CategoryExtraService = require('./category-extra.service');
const serviceCategoryExtra = new CategoryExtraService();

class ProductsExtraService {
  constructor() {}

  async create(data) {
    const newProduct = await models.ProductExtra.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['categoryExtra'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.ProductExtra.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.ProductExtra.findByPk(id);
    if (!product) {
      throw boom.notFound('product extra not found');
    }
    return product;
  }

  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    await models.StoreProductExtra.destroy({where: { productExtraId: id }});
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

  async createProductStatus(body) {
    const newProduct = await this.create(body);
    const category = await serviceCategoryExtra.findOne(newProduct.categoryExtraId);
    
    var payload = { productExtraId: newProduct.id, status: true };
    const stores = await storeService.find(category.ownerId);
    for (const store of stores.values()) {  
      payload.storeId= store.id;
      await models.StoreProductExtra.create(payload);
      //console.log(`payload item: ${JSON.stringify(payload)}`);
    }
    return newProduct;
  }

  async setProductStatus(productId, storeId, status) {
    const rta = await models.StoreProductExtra.update(
        { status: status },
        { where: { productExtraId: productId, storeId: storeId}});
    if (rta==0) {
      throw boom.notFound('product extra not found in the store');
    }
    return rta;
  }

}

module.exports = ProductsExtraService;
