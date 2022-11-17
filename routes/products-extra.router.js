const express = require('express');

const ProductsExtraService = require('../services/product-extra.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductExtraSchema, updateProductExtraSchema, 
  getProductExtraSchema, queryProductExtraSchema, setStatusSchema
 } = require('../schemas/product-extra.schema');

const router = express.Router();
const service = new ProductsExtraService();

router.get('/',
  validatorHandler(queryProductExtraSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getProductExtraSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

/*router.post('/',
  validatorHandler(createProductExtraSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);*/

//Creacion de product por owner, ademas agrega el status por store
router.post('/',
  validatorHandler(createProductExtraSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.createProductStatus(body);     
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getProductExtraSchema, 'params'),
  validatorHandler(updateProductExtraSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

//Modifica el status de producto para habilitarlo/deshabilitarlo
router.patch('/:id/status',
  validatorHandler(setStatusSchema, 'body'),
  async (req, res, next) => {
    try {
      //const { productId, storeId, status} = req.body;
      const { id } = req.params; //idProduct
      const body = req.body;
      const product = await service.setProductStatus(id, body.storeId,body.status);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getProductExtraSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
