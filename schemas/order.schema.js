const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
//SUCCESSFUL, PAID, PROCESSING, FINISHED, DELIVERED
const status = Joi.string().default('SUCCESSFUL').default('PAID').default('PROCESSING').default('FINISHED').default('DELIVERED');
//DELIVERY / PICKUP
const type = Joi.string().default('DELIVERY').default('PICKUP');
const paymentMethodId = Joi.number().integer();
const locationId = Joi.number().integer();
const storeId = Joi.number().integer();
const image =  Joi.string();
const note =  Joi.string().max(255);

const price = Joi.number();
const amount = Joi.number().integer().min(1);
const productExtraId = Joi.number().integer();
const extra = Joi.object({productExtraId: productExtraId.required(), price: price.optional()});
const extras = Joi.array().items(extra);
const product = Joi.object({
  productId: productId.required(),
  amount: amount.required(),
  price: price.optional(),
  note: note.optional(),
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
  paymentMethodId: paymentMethodId.required(),
  locationId: locationId.required(),
  storeId: storeId.required(),
  status: status.required(),
  type: type.required(),
  image: image.optional(),
  note: note.optional(),
  products: products.required()
});

const calculateOrderPriceSchema = Joi.object({
  customerId: customerId.required(),
  paymentMethodId: paymentMethodId.required(),
  locationId: locationId.required(),
  storeId: storeId.required(),
  status: status.required(),
  type: type.required(),
  image: image.optional(),
  note: note.optional(),
  products: products.required()
});

const updatOrderSchema = Joi.object({
  paymentMethodId: paymentMethodId.optional(),
  locationId: locationId.optional(),
  storeId: storeId.optional(),
  status: status.optional(),
  type: type.optional(),
  image: image.optional(),
  note: note.optional()
});

module.exports = { getOrderSchema, createOrderSchema, addItemSchema, 
  addItemExtrasSchema, createOrderProductsSchema, updatOrderSchema, calculateOrderPriceSchema };
