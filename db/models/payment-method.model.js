const { Model, DataTypes, Sequelize } = require('sequelize');

const { STORE_TABLE } = require('./store.model')

const PAYMENT_METHODS_TABLE = 'payment_methods';

const PaymentMethodSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  icon: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  }, 
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  storeId: {
    field: 'store_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: false,
    references: {
      model: STORE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class PaymentMethod extends Model {
  static associate(models) {
    this.belongsTo(models.Store, {as: 'store'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName:PAYMENT_METHODS_TABLE,
      modelName: 'PaymentMethod',
      timestamps: false
    }
  }
}


module.exports = { PAYMENT_METHODS_TABLE, PaymentMethodSchema, PaymentMethod}