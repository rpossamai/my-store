const { Model, DataTypes, Sequelize } = require('sequelize');

const DELIVERY_PRICE_TABLE = 'delivery_prices';

const DeliveryPriceSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  distanceMax: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false,
    field: 'distance_max',
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
    unique: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class DeliveryPrice extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName:DELIVERY_PRICE_TABLE,
      modelName: 'DeliveryPrice',
      timestamps: false
    }
  }
}


module.exports = { DELIVERY_PRICE_TABLE, DeliveryPriceSchema, DeliveryPrice }