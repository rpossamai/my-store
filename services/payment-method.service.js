const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class PaymentMethodService {
  constructor() {}

  async create(data) {
    const newPaymentMethod = await models.PaymentMethod.create(data);
    return newPaymentMethod;
  }

  async findOne(id) {
    const paymentMethod = await models.PaymentMethod.findByPk(id);
    if (!paymentMethod) {
      throw boom.notFound('payment method not found');
    }
    return paymentMethod;
  }

  async find(storeId) {
    const options = {
      where: {}
    }
    if (storeId) {
      options.where.storeId = storeId;
    }
    const paymentMethods = await models.PaymentMethod.findAll(options);
    return paymentMethods;
  }

  /*async setStatus(id, status) {
    const rta = await models.PaymentMethod.update(
        { status: status },
        { where: { id: id}});
    if (rta==0) {
      throw boom.notFound('payment method not found in the store');
    }
    return rta;
  }*/

  async update(id, changes) {
    const paymentMethod = await this.findOne(id);
    const rta = await paymentMethod.update(changes);
    return rta;
  }

  async delete(id) {
    const paymentMethod = await this.findOne(id);
    await paymentMethod.destroy();
    return { id };
  }
}

module.exports = PaymentMethodService;
