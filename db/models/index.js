const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { CategoryExtra, CategoryExtraSchema } = require('./category-extra.model');
const { ProductExtra, ProductExtraSchema } = require('./product-extra.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { OrderProductProductExtra, OrderProductProductExtraSchema } = require('./order-product-product-extra.model');
const { Owner, OwnerSchema } = require('./owner.model');
const { Store, StoreSchema } = require('./store.model');
const { Role, RoleSchema } = require('./role.model');
const { Location, LocationSchema } = require('./location.model');
const { StoreProduct, StoreProductSchema } = require('./store-product.model');
const { StoreProductExtra, StoreProductExtraSchema } = require('./store-product-extra.model');
const { CategoryExtraProduct, CategoryExtraProductSchema } = require('./category-extra-product.model');
const { PaymentMethod, PaymentMethodSchema } = require('./payment-method.model');

function setupModels(sequelize) {
  Owner.init(OwnerSchema, Owner.config(sequelize));
  Store.init(StoreSchema, Store.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  CategoryExtra.init(CategoryExtraSchema, CategoryExtra.config(sequelize));
  ProductExtra.init(ProductExtraSchema, ProductExtra.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  OrderProductProductExtra.init(OrderProductProductExtraSchema, OrderProductProductExtra.config(sequelize));
  StoreProduct.init(StoreProductSchema, StoreProduct.config(sequelize));
  StoreProductExtra.init(StoreProductExtraSchema, StoreProductExtra.config(sequelize));
  CategoryExtraProduct.init(CategoryExtraProductSchema, CategoryExtraProduct.config(sequelize));
  Role.init(RoleSchema, Role.config(sequelize));
  Location.init(LocationSchema, Location.config(sequelize));
  PaymentMethod.init(PaymentMethodSchema, PaymentMethod.config(sequelize));

  User.associate(sequelize.models);
  Owner.associate(sequelize.models);
  Store.associate(sequelize.models);
  Customer.associate(sequelize.models);
  CategoryExtra.associate(sequelize.models);
  ProductExtra.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
  Location.associate(sequelize.models);
  PaymentMethod.associate(sequelize.models);
  //Role.associate(sequelize.models);

}

module.exports = setupModels;
