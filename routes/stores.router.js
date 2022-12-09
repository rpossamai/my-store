const express = require('express');

const StoreService = require('../services/store.service');
const PaymentMethodService = require('../services/payment-method.service');

const validatorHandler = require('../middlewares/validator.handler');
const { 
  createPaymentMethodSchema, updatePaymentMethodSchema, 
  getPaymentMethodSchema, getPaymentMethodStoreSchema, 
  getStoresByDistanceSchema, getStoresSchema
} = require('../schemas/store.schema');

const router = express.Router();

const service = new StoreService();
const servicePaymentMethod = new PaymentMethodService();

router.get('/owners/:id/',
  validatorHandler(getStoresSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const stores = await service.find(id);
      res.json(stores);
    } catch (error) {
      next(error);
    }
  }
);

//Consulta las tiendas ordenadas ascendentemente 
//por la distancia que se encuentra de la ubicacion del cliente 
router.post('/owners/:id/stores-by-distances',
  validatorHandler(getStoresSchema, 'params'),
  validatorHandler(getStoresByDistanceSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { latitude, longitude, radiusKm } = req.body;
      const stores = await service.findOrderedByDistance(id, latitude, longitude, radiusKm);
      res.json(stores);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id/payment-methods',
  validatorHandler(getPaymentMethodStoreSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const paymentMethods = await servicePaymentMethod.find(id);
      res.json(paymentMethods);
    } catch (error) {
      next(error);
    }
  }
);

//Creacion de PaymentMethod por store, ademas agrega el status por store
router.post('/payment-methods',
  validatorHandler(createPaymentMethodSchema, 'body'),
  async (req, res, next) => {
    try {
      //const { id } = req.params;
      const body = req.body;
      const newPaymentMethod = await servicePaymentMethod.create(body);     
      res.status(201).json(newPaymentMethod);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/payment-methods/:paymentMethodId',
  validatorHandler(getPaymentMethodSchema, 'params'),
  validatorHandler(updatePaymentMethodSchema, 'body'),
  async (req, res, next) => {
    try {
      const { paymentMethodId } = req.params;
      const body = req.body;
      const paymentMethod = await servicePaymentMethod.update(paymentMethodId, body);
      res.json(paymentMethod);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/payment-methods/:paymentMethodId',
  validatorHandler(getPaymentMethodSchema, 'params'),
  async (req, res, next) => {
    try {
      const { paymentMethodId } = req.params;
      await servicePaymentMethod.delete(paymentMethodId);
      res.status(201).json({paymentMethodId});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
