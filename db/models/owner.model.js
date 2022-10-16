const { Model, DataTypes, Sequelize } = require('sequelize');

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
  }
}

class Owner extends Model {
  static associate(models) {
   /* this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });*/
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