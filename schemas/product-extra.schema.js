const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(60);
const price = Joi.number().integer().min(1);
const description = Joi.string().min(5);
const image = Joi.string().uri();
const categoryExtraId = Joi.number().integer();
const storeId = Joi.number().integer();
const ownerId = Joi.number().integer();
const status = Joi.boolean();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductExtraSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryExtraId: categoryExtraId.required()
});

const createProductExtraStoreSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryExtraId: categoryExtraId.required(),
  ownerId: ownerId.required()
});

const updateProductExtraSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryExtraId
});

const getProductExtraSchema = Joi.object({
  id: id.required(),
});

const queryProductExtraSchema = Joi.object({
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
  storeId: storeId.required(),
  status: status.required()
});

module.exports = { createProductExtraSchema, createProductExtraStoreSchema, updateProductExtraSchema, getProductExtraSchema, queryProductExtraSchema, setStatusSchema }
