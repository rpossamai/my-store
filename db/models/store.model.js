const { Model, DataTypes, Sequelize } = require('sequelize');

const { OWNER_TABLE } = require('./owner.model');

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
    field: 'social_id',
  },
  socialName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'social_name',
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
  },  
  ownerId: {
    field: 'owner_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: OWNER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Store extends Model {

  static associate(models) {
    this.belongsTo(models.Owner, { as: 'owner' });
    this.belongsToMany(models.Product, {
      as: 'products',
      through: models.StoreProduct,
      foreignKey: 'storeId',
      otherKey: 'productId'
    });
    this.hasMany(models.PaymentMethod, {
      as: 'paymentMethods',
      foreignKey: 'storeId'
    });
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
