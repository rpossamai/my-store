const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(60);
const price = Joi.number().integer().min(1);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const storeId = Joi.number().integer();
const productId = Joi.number().integer();
const ownerId = Joi.number().integer();
const status = Joi.boolean();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const createProductStoreSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
  ownerId: ownerId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.when('price_min', {
    is: Joi.exist(),
    then: price_max.required(),
  })
});

const setStatusSchema = Joi.object({
  //productId: productId.required(),
  storeId: storeId.required(),
  status: status.required()
});

module.exports = { createProductSchema, createProductStoreSchema, updateProductSchema, getProductSchema, queryProductSchema, setStatusSchema }
