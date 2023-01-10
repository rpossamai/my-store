const express = require('express');
//const bcv = require('bcv-divisas');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, calculateOrderPriceSchema,
  addItemExtrasSchema, createOrderProductsSchema, updatOrderSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

const Utils = require('./../utils/utils.js');
const utils = new Utils();


router.get(
  '/stores/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findByStore(id, req.query);
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
        'status':req.body.status,'type':req.body.type,
        'image':req.body.image,
        'note':req.body.note
      });

      for (const product of products.values()) {
        product ['orderId'] = newOrder.id;
        newItem = await service.addItem(product);
      }
      const order = await service.findOne(newOrder.id);
      delete order.dataValues.image;
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

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updatOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/products/calculate-prices',
  validatorHandler(calculateOrderPriceSchema, 'body'),
  async (req, res, next) => {
    try {
      const products = req.body.products;
      var subtotal = 0;
      if (products != null) {       
        if (products.length > 0) {
          subtotal = products.reduce((total, product) => {
            total = total + product.price * product.amount;
            //console.log('price:'+product.price);
            if (product.extras != null) {
              product.extras.reduce((totalExtra, extra) => {
                total = total + extra.price * product.amount;
              }, 0);
            }
            //console.log('total:'+total);
            return total;
          }, 0);
        }
      }
      const bcvDolar =  (await utils.bcvDolar())._dolar;
      //const blackDolar = (await utils.dtDolar())._USD;
      res.status(201).json({
        subtotal : subtotal, //service:0,'iva%':12,'IGTF%':3,
        bcvDolar: bcvDolar,
        rates: await service.findRates()
        //blackDolar: blackDolar, bcvEuro: (await utils.bcvDolar())._euro,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
