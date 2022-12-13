const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const status = Joi.boolean();

const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone =  Joi.string();
const photo =  Joi.string();

const username = Joi.string();
const storeId = Joi.number().integer();

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const createUserCustomerSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  customer: Joi.object({
    name: name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    photo: photo.optional()
  })
});

const createUserSellerSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
  seller: Joi.object({
    name: name.optional(),
    storeId: storeId.required(),
  })
});

const updateUserSchema = Joi.object({
  email: email,
  role: role,
  status:status
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const getUserUsernameSchema = Joi.object({
  username: username.required(),
});

module.exports = { createUserSchema, updateUserSchema, 
  getUserSchema, getUserUsernameSchema, 
  createUserCustomerSchema, createUserSellerSchema }
