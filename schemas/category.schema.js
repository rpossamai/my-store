const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const ownerId = Joi.number().integer();
const storeId = Joi.number().integer();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
  ownerId: ownerId.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  image: image
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const queryCategorySchema = Joi.object({
  ownerId,
  storeId
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, queryCategorySchema }
