const express = require('express');
const passport = require('passport');

const CategoryExtraService = require('../services/category-extra.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');
const { createCategoryExtraSchema, updateCategoryExtraSchema, getCategoryExtraSchema, queryCategoryExtraSchema } = require('../schemas/category-extra.schema');

const router = express.Router();
const service = new CategoryExtraService();

/*router.get('/',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller', 'customer'),
  validatorHandler(queryCategoryExtraSchema, 'query'),
  async (req, res, next) => {
  try {
    const categories = await service.find(req.query);
    res.json(categories);
  } catch (error) {
    next(error);
  }
});*/

//Servicio utilizado para buscar los productos-extra(adicionales) por su categoria-extra correspondiente. 
//filtrado por el id de owner y el id de store
router.get('/',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller', 'customer'),
  validatorHandler(queryCategoryExtraSchema, 'query'),
  async (req, res, next) => {
  try {
    const categories = await service.findByOwner(req.query);
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

//Servicio utilizado para buscar los productos-extra(adicionales) por su categoria-extra correspondiente. 
//filtrado por el producto al que se le puede agregar dicho adicional (productos-extra)
router.get('/products/:id',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller', 'customer'),
  validatorHandler(queryCategoryExtraSchema, 'query'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categories = await service.findByProduct(req.query,id);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getCategoryExtraSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin'),
  validatorHandler(createCategoryExtraSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller'),
  validatorHandler(getCategoryExtraSchema, 'params'),
  validatorHandler(updateCategoryExtraSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller'),
  validatorHandler(getCategoryExtraSchema, 'params'),
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
