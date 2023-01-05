const boom = require('@hapi/boom');

const { Op } = require('sequelize');
var moment = require('moment');
const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    delete newOrder.dataValues.image;
    return newOrder;
  }

  async addItem(data) { 
    const newItem = await models.OrderProduct.create(data);

    var extrasList=[];
    var extraPayload = {};
    if(data.extras){
      for (const extra of data.extras.values()) {
        extraPayload = {};
        extraPayload ['orderProductId'] = newItem.id;
        extraPayload ['productExtraId'] = extra.productExtraId
        extrasList.push(extraPayload);
      }
      //console.log('Extras:');
      //console.log(extrasList);
      await models.OrderProductProductExtra.bulkCreate(extrasList, 
        { returning: true }) // will return all columns for each row inserted
      .then((result) => {/*console.log(result);*/});
        
    }//else{console.log('extrasList VACIA');}

    return newItem;
  }

  async findByStore(storeId, query) {
    const options = {
        where: { storeId },
        include: [
          {
            association: 'customer',
            attributes: {exclude: ['photo']},
            include: [{association: 'user',
            attributes: {exclude: ['password','recoveryToken']}}]
          },'location','paymentMethod',
          {
            association: 'orderProducts',
            include: ['product','extras']   
          }  
        ],attributes:{exclude: ['image']}
    };

    const { status } = query;
    if (status) { options.where.status = status; }

    const orders = await models.Order.findAll(options);
    return orders;
  }

  async findByUser(userId, query) {
    const options = {
      where: {
        '$customer.user.id$': userId
      },
      include: [ 
        { 
          association: 'customer',
          attributes: {exclude: ['photo']},
          include: [{association: 'user',
          attributes: {exclude: ['password','recoveryToken']}}]
        },'location','paymentMethod',//,'items'
        {
          association: 'orderProducts',
          include: ['product','extras']   
        }
      ],attributes:{exclude: ['image']}
    };

    const { status, createdAt } = query;

    if (status) { options.where.status = status; }

    if (createdAt) {
      var initDate = moment(createdAt);//.subtract(4, 'hours');
      var endDate = moment(initDate).add(1, 'months');
      //console.log(initDate._d);      
      options.where.createdAt = { [Op.between]: [initDate, endDate] };
    }

    const orders = await models.Order.findAll(options);
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          attributes: {exclude: ['photo']},
          include: [{association: 'user',
          attributes: {exclude: ['password','recoveryToken']}}]
        },'location','paymentMethod',//{ association: 'items' },
        {
          association: 'orderProducts',
          include: ['product','extras']   
        }    
      ]//,attributes:{exclude: ['image']}
    });
    return order;
  }

  async findOneBasic(id) {
    const order = await models.Order.findByPk(id, {attributes:{exclude: ['image']}});
    return order;
  }

  async update(id, changes) {
    const user = await this.findOneBasic(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
