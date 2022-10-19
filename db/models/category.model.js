const { Model, DataTypes, Sequelize } = require('sequelize');

const { OWNER_TABLE } = require('./owner.model');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
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


class Category extends Model {

  static associate(models) {
    this.belongsTo(models.Owner, { as: 'owner' });
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'categoryId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false
    }
  }
}

module.exports = { Category, CategorySchema, CATEGORY_TABLE };
