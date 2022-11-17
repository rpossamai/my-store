const express = require('express');

const validatorHandler = require('../middlewares/validator.handler');
const { getLocationSchema, createLocationSchema } = require('../schemas/location.schema');

const router = express.Router();

const LocationService = require('../services/location.service');
const service = new LocationService();

router.get('/users/:id',
  validatorHandler(getLocationSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const location = await service.findByUser(id);
      res.json(location);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createLocationSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newLocation = await service.create(body);
      res.status(201).json(newLocation);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
