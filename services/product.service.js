//const {faker} = require('@faker-js/faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const StoreService = require('./store.service');
const storeService = new StoreService();
const CategoryService = require('./category.service');
const serviceCategory = new CategoryService();

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
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
    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    /*if (product.isBlock) {
      throw boom.conflict('product is block');
    }*/

    return product;
  }

  /* async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }*/
  async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  async delete(id) {
    await models.StoreProduct.destroy({where: { productId: id }});
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

  async createProductStatus(body) {
    const newProduct = await this.create(body);
    const category = await serviceCategory.findOne(newProduct.categoryId);
    
    var payload = { productId: newProduct.id, status: true };

    const stores = await storeService.find(category.ownerId);
    for (const store of stores.values()) {  
      payload.storeId= store.id;
      await models.StoreProduct.create(payload);
      //console.log(`payload item: ${JSON.stringify(payload)}`);
    }
    
    return newProduct;
  }

  async setProductStatus(productId, storeId, status) {
    // const productModel = await models.StoreProduct.findOne({
    //   where: { productId: productId, storeId: storeId}});
    //if (!productModel) {throw boom.notFound('product not found in the store');} else {
    const rta = await models.StoreProduct.update(
        { status: status },
        { where: { productId: productId, storeId: storeId}});//}
    if (rta==0) {
      throw boom.notFound('product not found in the store');
    }
    return rta;
  }

}

module.exports = ProductsService;
