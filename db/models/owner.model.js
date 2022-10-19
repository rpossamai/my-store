const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model')

const OWNER_TABLE = 'owners';

const OwnerSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
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
  }
}

class Owner extends Model {

  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
    this.hasMany(models.Category, {
      as: 'categories',
      foreignKey: 'ownerId'
    });
    this.hasMany(models.Store, {
      as: 'stores',
      foreignKey: 'ownerId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: OWNER_TABLE,
      modelName: 'Owner',
      timestamps: false
    }
  }
}


module.exports = { OWNER_TABLE, OwnerSchema, Owner }