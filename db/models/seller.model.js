const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');
const { STORE_TABLE } = require('./store.model')

const SELLER_TABLE = 'sellers';

const SellerSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  /*lastName: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true,
  },*/
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
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

class Seller extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.belongsTo(models.Store, {as: 'store'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SELLER_TABLE,
      modelName: 'Seller',
      timestamps: false
    }
  }
}

module.exports = { Seller, SellerSchema, SELLER_TABLE };
