const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_EXTRA_TABLE } = require('./category-extra.model');

const PRODUCT_EXTRA_TABLE = 'products_extra';

const ProductExtraSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  categoryExtraId: {
    field: 'category_extra_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_EXTRA_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class ProductExtra extends Model {

  static associate(models) {
    this.belongsTo(models.CategoryExtra, { as: 'categoryExtra' });
    this.belongsToMany(models.Store, {
      as: 'stores',
      through: models.StoreProductExtra,
      foreignKey: 'productExtraId',
      otherKey: 'storeId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_EXTRA_TABLE,
      modelName: 'ProductExtra',
      timestamps: false,
    };
  }
}

module.exports = { ProductExtra, ProductExtraSchema, PRODUCT_EXTRA_TABLE };
