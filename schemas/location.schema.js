const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const description = Joi.string();
const longitude = Joi.string();
const latitude = Joi.string();
const userId = Joi.number().integer();

const getLocationSchema = Joi.object({
  id: id.required(),
});

const createLocationSchema = Joi.object({
  name : name.required(),
  description : description.optional(),
  longitude : longitude.required(),
  latitude : latitude.required(),
  userId : userId.required(),
});

const updateLocationSchema = Joi.object({
  name,
  description,
  longitude,
  latitude
});


module.exports = { getLocationSchema, createLocationSchema, updateLocationSchema };
