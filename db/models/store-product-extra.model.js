const { Model, DataTypes, Sequelize } = require('sequelize');

const { STORE_TABLE } = require('./store.model');
const { PRODUCT_EXTRA_TABLE } = require('./product-extra.model');

const STORE_PRODUCT_EXTRA_TABLE = 'stores_products_extra';

const StoreProductExtraSchema =  {
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
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  storeId: {
    field: 'store_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: STORE_TABLE,
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

class StoreProductExtra extends Model {

  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STORE_PRODUCT_EXTRA_TABLE,
      modelName: 'StoreProductExtra',
      timestamps: false
    }
  }
}

module.exports = { StoreProductExtra, StoreProductExtraSchema, STORE_PRODUCT_EXTRA_TABLE };
