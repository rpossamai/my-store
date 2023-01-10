const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');
const { LOCATION_TABLE } = require('./location.model');
const { PAYMENT_METHODS_TABLE } = require('./payment-method.model');
const { STORE_TABLE } = require('./store.model');

const bcv = require('bcv-divisas');

const ORDER_TABLE = 'orders';
 
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  status: { //SUCCESSFUL, PAID, PROCESSING, FINISHED, DELIVERED
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
    defaultValue: 'SUCCESSFUL'
  },
  type: {//DELIVERY / PICKUP
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
  //si type=DELIVERY,el location es la direccion del cliente
  //si type=PICKUP, el location es la direccion de la sucursal a donde se hizo el pedido
  locationId: {
    field: 'location_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: LOCATION_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  paymentMethodId: {
    field: 'payment_method_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PAYMENT_METHODS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  storeId: {
    field: 'store_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: STORE_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  note: { 
    allowNull: true,
    type: DataTypes.STRING,
    unique: false,
    defaultValue: ''
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  total: {
    type: DataTypes.FLOAT,
    get() {
      /*if (this.items != null) {
        if (this.items.length > 0) {
          return this.items.reduce((total, item) => {
            return total + (item.price * item.OrderProduct.amount);
          }, 0);
        }
      }*/
      if (this.orderProducts != null) {       
        if (this.orderProducts.length > 0) {
          return this.orderProducts.reduce((total, orderProduct) => { 
            total = total + (orderProduct.product.price * orderProduct.amount);
            
            orderProduct.extras.reduce((totalExtra, extra) => {
              total= total + (extra.price * orderProduct.amount);
              //console.log('total+Extra:'+total);
              return totalExtra;
            }, 0);

            //console.log('total:'+total);
            //bcv.bcvDolar().then(data=>{console.log('bcvdolar:'+data["_dolar"])});
            //bcv.dtDolar().then(data=>{console.log(`TASA: ${JSON.stringify(data)}`)});
            //bcv.bcvDolar().then(data=>{console.log(`TASA: ${JSON.stringify(data)}`)});
            
            return total;
          }, 0);
        }
      }
      return 0;
    },
  },
};

class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    this.belongsTo(models.Location, {
      as: 'location',
    });
    this.belongsTo(models.PaymentMethod, {
      as: 'paymentMethod',
    });
    this.hasMany(models.OrderProduct, {
      as: 'orderProducts',
      foreignKey: 'orderId'
    });
    /*this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });*/
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
