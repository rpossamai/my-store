const Joi = require('joi');

const id = Joi.number().integer();
const address = Joi.string();
const number = Joi.string();
const city = Joi.string();
const state = Joi.string();
const reference = Joi.string();
const longitude = Joi.string();
const latitude = Joi.string();
const type = Joi.string();
const userId = Joi.number().integer();

const getLocationSchema = Joi.object({
  id: id.required(),
});

const createLocationSchema = Joi.object({
  address : address.required(),
  number : number.optional(),
  city : city.required(),
  state : state.required(),
  reference : reference.optional(),
  longitude : longitude.required(),
  latitude : latitude.required(),
  type : type.required(),
  userId : userId.required(),
});

const updateLocationSchema = Joi.object({
  address,
  number,
  city,
  state,
  reference,
  longitude,
  latitude,
  type
});


module.exports = { getLocationSchema, createLocationSchema, updateLocationSchema };
