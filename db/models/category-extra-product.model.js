const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_EXTRA_TABLE } = require('./category-extra.model');
const { PRODUCT_TABLE } = require('./product.model');

const CATEGORY_EXTRA_PRODUCT_TABLE = 'categories_extra_products';

const CategoryExtraProductSchema =  {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  status: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  categoryExtraId: {
    field: 'category_extra_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_EXTRA_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class CategoryExtraProduct extends Model {

  static associate(models) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_EXTRA_PRODUCT_TABLE,
      modelName: 'CategoryExtraProduct',
      timestamps: false
    }
  }
}

module.exports = { CategoryExtraProduct, CategoryExtraProductSchema, CATEGORY_EXTRA_PRODUCT_TABLE };
