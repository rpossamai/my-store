const { Model, DataTypes, Sequelize } = require('sequelize');

const { OWNER_TABLE } = require('./owner.model');

const CATEGORY_EXTRA_TABLE = 'categories_extra';

const CategoryExtraSchema = {
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
  type: {
    type: DataTypes.STRING,
    allowNull: true,
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


class CategoryExtra extends Model {

  static associate(models) {
    this.belongsTo(models.Owner, { as: 'owner' });
    this.hasMany(models.ProductExtra, {
      as: 'products_extra',
      foreignKey: 'categoryExtraId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_EXTRA_TABLE,
      modelName: 'CategoryExtra',
      timestamps: false
    }
  }
}

module.exports = { CategoryExtra, CategoryExtraSchema, CATEGORY_EXTRA_TABLE };
