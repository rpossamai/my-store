const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const productsExtraRouter = require('./products-extra.router');
const categoriesExtraRouter = require('./categories-extra.router');
const usersRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customersRouter = require('./customers.router');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const locationsRouter = require('./locations.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/categories-extra', categoriesExtraRouter);
  router.use('/products-extra', productsExtraRouter);
  router.use('/users', usersRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', authRouter);
  router.use('/profile', profileRouter);
  router.use('/locations',locationsRouter);
}

module.exports = routerApi;
