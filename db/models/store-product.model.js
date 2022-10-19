const { Model, DataTypes, Sequelize } = require('sequelize');

const { STORE_TABLE } = require('./store.model');
const { PRODUCT_TABLE } = require('./product.model');

const STORE_PRODUCT_TABLE = 'stores_products';

const StoreProductSchema =  {
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
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class StoreProduct extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STORE_PRODUCT_TABLE,
      modelName: 'StoreProduct',
      timestamps: false
    }
  }
}

module.exports = { StoreProduct, StoreProductSchema, STORE_PRODUCT_TABLE };
