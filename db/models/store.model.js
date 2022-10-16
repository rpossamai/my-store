const { Model, DataTypes, Sequelize } = require('sequelize');

//const { USER_TABLE } = require('./user.model')

const STORE_TABLE = 'stores';

const StoreSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  socialId: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  socialName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name',
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }/*,
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
  }*/
}

class Store extends Model {

  static associate(models) {
    /*this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'storeId'
    });*/
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: STORE_TABLE,
      modelName: 'Store',
      timestamps: false
    }
  }
}

module.exports = { Store, StoreSchema, STORE_TABLE };
