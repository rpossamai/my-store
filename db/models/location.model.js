const { Model, DataTypes, Sequelize } = require('sequelize');

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
    unique: true,
  },  
  description: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  coordinates: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Location extends Model {
  static associate(models) {
   /* this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });*/
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