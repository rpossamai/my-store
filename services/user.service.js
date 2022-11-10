const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

const CustomerService = require('./customer.service');
const customerService = new CustomerService();

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async createUserCustomer(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newData = {
      ...data,
      password: hash,
      customer: {
        ...data.customer
      }
    }
    const newUser = await models.User.create(newData, {
      include: ['customer']
    });
    delete newUser.dataValues.password;
    delete newUser.customer.dataValues.photo;
    return newUser;
  }

  async find() {
    const users = await models.User.findAll({
      //include: ['customer']
    });
    return users;
  }

  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id,{
      include: ['customer']
    });
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async findByUsername(username) {
    var user;
    if (username.indexOf('@') == -1) {
      const customer = await customerService.findByPhone(username);
      if (!customer) {
        throw boom.notFound();
      }
      user = await this.findOne(customer.userId);
    } else {
      user = await this.findByEmail(username);
    }
    if (!user) {
      throw boom.notFound();
    }
    delete user.dataValues.password;
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
