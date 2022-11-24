const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const productExtraId = Joi.number().integer();
const extra = Joi.object({productExtraId: productExtraId.required()});
const extras = Joi.array().items(extra);
const product = Joi.object({
  productId: productId.required(),
  amount: amount.required(),
  extras: extras.optional()
});
const products = Joi.array().items(product);



const getOrderSchema = Joi.object({
  id: id.required()
});

const createOrderSchema = Joi.object({
  customerId: customerId.required()
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

const addItemExtrasSchema = Joi.object({
  //customerId: customerId.required(),
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
  extras: extras.optional()
});

const createOrderProductsSchema = Joi.object({
  customerId: customerId.required(),
  products: products.required()
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema, addItemExtrasSchema, createOrderProductsSchema };
