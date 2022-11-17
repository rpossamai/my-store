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
      as: 'productsExtra',
      foreignKey: 'categoryExtraId',
    });
    //indica que una categoria-extra(adicional) esta disponible a uno o muchos productos
    this.belongsToMany(models.Product, {
      as: 'products',
      through: models.CategoryExtraProduct,
      foreignKey: 'categoryExtraId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_EXTRA_TABLE,
      modelName: 'CategoryExtra',
      timestamps: false,
    };
  }
}

module.exports = { CategoryExtra, CategoryExtraSchema, CATEGORY_EXTRA_TABLE };
