const express = require('express');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, addItemSchema, addItemExtrasSchema, createOrderProductsSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();


router.get(
  '/stores/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findByStore(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/products',
  validatorHandler(createOrderProductsSchema, 'body'),
  async (req, res, next) => {
    try {
      const products = req.body.products;
      const newOrder = await service.create({
        'customerId':req.body.customerId, 'paymentMethodId':req.body.paymentMethodId,
        'locationId':req.body.locationId,'storeId':req.body.storeId,
        'status':req.body.status,'type':req.body.type
      });

      for (const product of products.values()) {
        product ['orderId'] = newOrder.id;
        newItem = await service.addItem(product);
      }
      const order = await service.findOne(newOrder.id);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemExtrasSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
