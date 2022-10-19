const bcrypt = require('bcrypt');

'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');
const { CategorySchema, CATEGORY_TABLE} = require('./../models/category.model');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');
const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require('./../models/order-product.model');

const { RoleSchema, ROLE_TABLE } = require('./../models/role.model');
const { LocationSchema, LOCATION_TABLE } = require('./../models/location.model');
const { OwnerSchema, OWNER_TABLE } = require('./../models/owner.model');
const { StoreSchema, STORE_TABLE } = require('./../models/store.model');
const { StoreProductSchema, STORE_PRODUCT_TABLE } = require('./../models/store-product.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(OWNER_TABLE, OwnerSchema);
    await queryInterface.createTable(STORE_TABLE, StoreSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    await queryInterface.createTable(STORE_PRODUCT_TABLE, StoreProductSchema);

    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
    await queryInterface.createTable(LOCATION_TABLE, LocationSchema);


    const hash = await bcrypt.hash('987654321', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        //id: 1,
        email: 'admin@gmail.com',
        password: hash,
        role: 'ADMIN',
        created_at: new Date()
      },
      {
        //id: 2,
        email: 'alquadrado.pizza@gmail.com',
        password: hash,
        role: 'OWNER',
        created_at: new Date()
      }
    ]);

    await queryInterface.bulkInsert(OWNER_TABLE, [
      {
        //id: 1,
        name: 'ALQUADRADO PIZZA',
        user_id: 2,
        created_at: new Date()
      }
    ]);
    
    await queryInterface.bulkInsert(CATEGORY_TABLE, [
      {
        name: 'Icónicos',
        image: 'https://placeimg.com/640/480/animals',
        owner_id: 1,
        created_at: new Date()
      },
      {
        name: 'Entradas',
        image: 'https://placeimg.com/640/480/animals',
        owner_id: 1,
        created_at: new Date()
      },
      {
        name: 'Pizzas tradicionales',
        image: 'https://placeimg.com/640/480/animals',
        owner_id: 1,
        created_at: new Date()
      },
      {
        name: 'Especialidades AlQuadrado',
        image: 'https://placeimg.com/640/480/animals',
        owner_id: 1,
        created_at: new Date()
      },
      {
        name: 'Postres',
        image: 'https://placeimg.com/640/480/animals',
        owner_id: 1,
        created_at: new Date()
      }
    ]);


    await queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Chistobites',
        price: 8,
        description: 'Bites rellenos de chistorra y queso crema',
        image: 'https://placeimg.com/640/480/animals',
        category_id: 2,
        created_at: new Date()
      },
      {
        name: 'Pizza full jamon',
        price: 12,
        description: 'Queso mozarella, salsa Napole y full Jamón',
        image: 'https://placeimg.com/640/480/animals',
        category_id: 3,
        created_at: new Date()
      },
      {
        name: 'Pizza full maiz',
        price: 12,
        description: 'Queso mozarella, salsa Napole y full Maíz',
        image: 'https://placeimg.com/640/480/animals',
        category_id: 3,
        created_at: new Date()
      },
      {
        name: 'Salchicha Italiana',
        price: 12,
        description: 'Queso mozarella, salsa Napole y full Salchicha Italiana',
        image: 'https://placeimg.com/640/480/animals',
        category_id: 3,
        created_at: new Date()
      }
    ]);

    await queryInterface.bulkInsert(LOCATION_TABLE, [
      {
        name: 'CARACAS',
        description: 'tiendas que estan localizadas en caracas',
        coordinates: '10.504851, -66.921608',
        created_at: new Date()
      },
      {
        name: 'ALTOS_MIRANDINOS',
        description: 'tiendas que estan localizadas en los altos mirandinos',
        coordinates: '10.381363302434657, -66.96636946424778',
        created_at: new Date()
      }
    ]);

    await queryInterface.bulkInsert(ROLE_TABLE, [
      {name: 'ADMIN',
      created_at: new Date()},
      {name: 'OWNER',
      created_at: new Date()},
      {name: 'STORE',
      created_at: new Date()},
      {name: 'SELLER',
      created_at: new Date()},
      {name: 'CUSTOMER',
      created_at: new Date()}
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(STORE_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(STORE_TABLE);
    await queryInterface.dropTable(OWNER_TABLE);
    await queryInterface.dropTable(USER_TABLE);

    await queryInterface.dropTable(ROLE_TABLE);
    await queryInterface.dropTable(LOCATION_TABLE);
    
    
  },
};
