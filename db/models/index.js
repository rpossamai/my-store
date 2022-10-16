const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { Owner, OwnerSchema } = require('./owner.model');
const { Store, StoreSchema } = require('./store.model');
const { Role, RoleSchema } = require('./role.model');
const { Location, LocationSchema } = require('./location.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  Owner.init(OwnerSchema, Owner.config(sequelize));
  Store.init(StoreSchema, Store.config(sequelize));

  Role.init(RoleSchema, Role.config(sequelize));
  Location.init(LocationSchema, Location.config(sequelize));


  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);

  Owner.associate(sequelize.models);
  Store.associate(sequelize.models);
  //Role.associate(sequelize.models);
  //Store.associate(sequelize.models);
}

module.exports = setupModels;
