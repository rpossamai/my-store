const boom = require('@hapi/boom');
// tiene que ser dinámico
function validatorHandler(schema, property) {//clousures
  return (req, res, next) => {
    const data = req[property];// puede venir en body, params, o query
    //const { error } = schema.validate(data);// abortEarly para que envíe todos los errores juntos
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;
