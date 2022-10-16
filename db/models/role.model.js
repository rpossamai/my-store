const { Model, DataTypes, Sequelize } = require('sequelize');

const ROLE_TABLE = 'roles';

const RoleSchema = {
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

class Role extends Model {
  static associate(models) {
   /* this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    });*/
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName:ROLE_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}


module.exports = { ROLE_TABLE, RoleSchema, Role }