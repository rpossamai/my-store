const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model')

const LOCATION_TABLE = 'locations';

const LocationSchema = {
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
    allowNull: true,
    type: DataTypes.STRING,
    unique: false,
  },
  latitude: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  longitude: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  }, 
  /*type: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: false,
  },*/
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
    unique: false,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Location extends Model {
  static associate(models) {
    this.belongsTo(models.User, {as: 'user'});
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName:LOCATION_TABLE,
      modelName: 'Location',
      timestamps: false
    }
  }
}


module.exports = { LOCATION_TABLE, LocationSchema, Location}