const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();
const type = Joi.string();
const ownerId = Joi.number().integer();
const storeId = Joi.number().integer();

const createCategorySchema = Joi.object({
  name: name.required(),
  image: image.required(),
  type: type.optional(),
  ownerId: ownerId.required()
});

const updateCategorySchema = Joi.object({
  name: name,
  type: type,
  image: image
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const queryCategorySchema = Joi.object({
  ownerId,
  type
  //storeId
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema, queryCategorySchema }
