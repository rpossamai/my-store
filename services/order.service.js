const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async createOrderProducts(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  /*async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }*/

  async addItem(data) { 
    const newItem = await models.OrderProduct.create(data);

    var extrasList=[];
    var extraPayload = {};
    if(data.extras){
      for (const extra of data.extras.values()) {
        extraPayload = {};
        extraPayload ['orderProductId'] = newItem.id;
        extraPayload ['productExtraId'] = extra.productExtraId
        //extraPayload.productExtraId = extra.productExtraId;
        //extrasList[i]=extraPayload;
        extrasList.push(extraPayload);
      }
      console.log('Extras:');
      console.log(extrasList);
      await models.OrderProductProductExtra.bulkCreate(extrasList, 
        { returning: true }) // will return all columns for each row inserted
        .then((result) => {
          //console.log(result);  
        });
        
    }else{console.log('extrasList VACIA');}

    return newItem;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          attributes: {exclude: ['photo']},
          include: [{association: 'user',
          attributes: {exclude: ['password','recoveryToken']}}]
        },//,'items'
        {
          association: 'orderProducts',
          include: ['product','extras']   
        }  
      ]
    });
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
        },//{ association: 'items' },
        {
          association: 'orderProducts',
          include: ['product','extras']   
        }    
      ]
    });
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
