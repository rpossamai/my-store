const { Model, DataTypes, Sequelize } = require('sequelize');

const RATE_TABLE = 'rates';

const RateSchema = {
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
  percentage: {
    allowNull: false,
    type: DataTypes.DECIMAL,
    unique: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Rate extends Model {
  static associate(models) {
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName:RATE_TABLE,
      modelName: 'Rate',
      timestamps: false
    }
  }
}


module.exports = { RATE_TABLE, RateSchema, Rate }