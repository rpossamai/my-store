const express = require('express');
const passport = require('passport');

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { checkRoles } = require('./../middlewares/auth.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema, queryCategorySchema } = require('./../schemas/category.schema');

const router = express.Router();
const service = new CategoryService();

router.get('/',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller', 'customer'),
  validatorHandler(queryCategorySchema, 'query'),
  async (req, res, next) => {
  try {
    const categories = await service.find(req.query);
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

  //Servicio utilizado para buscar los productos por categorias
  // con su disponibilidad asociada por tienda
router.get('/products',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller', 'customer'),
  validatorHandler(queryCategorySchema, 'query'),
  async (req, res, next) => {
  try {
    const categories = await service.findByOwner(req.query);
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

/*router.get('/categories-owner',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.owner;
      const categories = await service.findByOwner(owner.sub);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);*/

/*router.get('/categories-user',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.owner;
      const categories = await service.findByOwner(owner.sub);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);*/

router.get('/:id',
  //passport.authenticate('jwt', {session: false}),
  //checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
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
  validatorHandler(createCategorySchema, 'body'),
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
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
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
  validatorHandler(getCategorySchema, 'params'),
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
