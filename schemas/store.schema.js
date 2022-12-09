const Joi = require('joi');

const id = Joi.number().integer();

const name = Joi.string().min(3).max(30);
const description = Joi.string();
const icon =  Joi.string();
const status = Joi.boolean();
const storeId = Joi.number().integer();
const paymentMethodId = Joi.number().integer();

const latitude = Joi.string();
const longitude = Joi.string();
const radiusKm = Joi.number().integer();

const getStoresSchema = Joi.object({
  id: id.required()
});

const getStoresByDistanceSchema = Joi.object({
  latitude: latitude.required(),
  longitude: longitude.required(),
  radiusKm: radiusKm.required(),
});

const createPaymentMethodSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  icon: icon.required(),
  status: status.required(),
  storeId: storeId.required(),
});

const updatePaymentMethodSchema = Joi.object({
  name: name.optional(),
  description: description.optional(),
  icon: icon.optional(),
  status: status.optional(),
});

const getPaymentMethodStoreSchema = Joi.object({
  id: id.required()
});

const getPaymentMethodSchema = Joi.object({
  paymentMethodId: paymentMethodId.required()
});

module.exports = { 
  createPaymentMethodSchema, updatePaymentMethodSchema, 
  getPaymentMethodSchema, getPaymentMethodStoreSchema,
  getStoresByDistanceSchema, getStoresSchema
 }
