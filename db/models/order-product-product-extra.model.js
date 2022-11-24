const { Model, DataTypes, Sequelize } = require('sequelize');

const { ORDER_PRODUCT_TABLE } = require('./order-product.model');
const { PRODUCT_EXTRA_TABLE } = require('./product-extra.model');

const ORDER_PRODUCT_PRODUCT_EXTRA_TABLE = 'orders_products_products_extra';

const OrderProductProductExtraSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
 /* amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },*/
  orderProductId: {
    field: 'order_product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productExtraId: {
    field: 'product_extra_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_EXTRA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class OrderProductProductExtra extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_PRODUCT_EXTRA_TABLE,
      modelName: 'OrderProductProductExtra',
      timestamps: false
    }
  }
}

module.exports = { OrderProductProductExtra, OrderProductProductExtraSchema, ORDER_PRODUCT_PRODUCT_EXTRA_TABLE };
