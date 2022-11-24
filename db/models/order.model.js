const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.FLOAT,
    get() {
      /*if (this.items != null) {
        if (this.items.length > 0) {
          return this.items.reduce((total, item) => {
            return total + (item.price * item.OrderProduct.amount);
          }, 0);
        }
      }*/
      if (this.orderProducts != null) {       
        if (this.orderProducts.length > 0) {
          return this.orderProducts.reduce((total, orderProduct) => { 
            total = total + (orderProduct.product.price * orderProduct.amount);
            
            orderProduct.extras.reduce((totalExtra, extra) => {
              total= total + (extra.price * orderProduct.amount);
              console.log('total+Extra:'+total);
              return totalExtra;
            }, 0);

            console.log('total:'+total);
            return total;
          }, 0);
        }
      }
      return 0;
    },
  },
};

class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
    this.hasMany(models.OrderProduct, {
      as: 'orderProducts',
      foreignKey: 'orderId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
