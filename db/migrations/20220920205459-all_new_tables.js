const bcrypt = require('bcrypt');

('use strict');

const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');
const { CategorySchema, CATEGORY_TABLE } = require('./../models/category.model');
const { ProductSchema, PRODUCT_TABLE } = require('./../models/product.model');
const { CategoryExtraSchema, CATEGORY_EXTRA_TABLE } = require('../models/category-extra.model');
const { ProductExtraSchema, PRODUCT_EXTRA_TABLE } = require('../models/product-extra.model');
const { OrderSchema, ORDER_TABLE } = require('./../models/order.model');
const { OrderProductSchema,  ORDER_PRODUCT_TABLE} = require('./../models/order-product.model');
const { OrderProductProductExtraSchema,  ORDER_PRODUCT_PRODUCT_EXTRA_TABLE} = require('./../models/order-product-product-extra.model');

const { RoleSchema, ROLE_TABLE } = require('./../models/role.model');
const { LocationSchema,  LOCATION_TABLE} = require('./../models/location.model');
const { OwnerSchema, OWNER_TABLE } = require('./../models/owner.model');
const { StoreSchema, STORE_TABLE } = require('./../models/store.model');
const { StoreProductSchema,STORE_PRODUCT_TABLE} = require('./../models/store-product.model');
const { StoreProductExtraSchema,STORE_PRODUCT_EXTRA_TABLE} = require('./../models/store-product-extra.model');
const { CategoryExtraProductSchema, CATEGORY_EXTRA_PRODUCT_TABLE } = require('../models/category-extra-product.model');

//const InitialData = require('./../initial-data');
//const initialData = new InitialData();

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(OWNER_TABLE, OwnerSchema);
    await queryInterface.createTable(STORE_TABLE, StoreSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CATEGORY_EXTRA_TABLE, CategoryExtraSchema);
    await queryInterface.createTable(PRODUCT_EXTRA_TABLE, ProductExtraSchema);
    await queryInterface.createTable(ORDER_TABLE, OrderSchema);
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
    await queryInterface.createTable(ORDER_PRODUCT_PRODUCT_EXTRA_TABLE, OrderProductProductExtraSchema);
    await queryInterface.createTable(STORE_PRODUCT_TABLE, StoreProductSchema);
    await queryInterface.createTable(STORE_PRODUCT_EXTRA_TABLE, StoreProductExtraSchema);
    await queryInterface.createTable(CATEGORY_EXTRA_PRODUCT_TABLE, CategoryExtraProductSchema);
    
    await queryInterface.createTable(ROLE_TABLE, RoleSchema);
    await queryInterface.createTable(LOCATION_TABLE, LocationSchema);

    
    const hash = await bcrypt.hash('987654321', 10);
    await queryInterface.bulkInsert(USER_TABLE, [
      {
        //id: 1,
        email: 'admin@gmail.com',
        password: hash,
        role: 'ADMIN',
        created_at: new Date(),
      },
      {
        //id: 2,
        email: 'alquadrado.pizza@gmail.com',
        password: hash,
        role: 'OWNER',
        created_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert(OWNER_TABLE, [
      {
        //id: 1,
        name: 'ALQUADRADO PIZZA',
        user_id: 2,
        created_at: new Date(),
      },
    ]);
    await queryInterface.bulkInsert(STORE_TABLE, [
      {
        social_id: 1,
        social_name: 'ALQUADRADO PIZZA LOS RUICES',
        owner_id: 1,
        phone: 123456789,
        created_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert(CATEGORY_TABLE, [
      {
        name: 'Icónicos',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Entradas',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Pizzas tradicionales',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Especialidades AlQuadrado',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Postres',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      }
    ]);

    await queryInterface.bulkInsert(PRODUCT_TABLE, [
      {
        name: 'Pepperoni Cheese Rolls',
        price: 6,
        description: '6 enrrollados de pepperoni + queso ozarella perfectamente horneados + salsa alquadrado para untar.',
        image: 'https://i.imgur.com/Fzaz6Rw.png',
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Cheese Sticks',
        price: 7,
        description: '',
        image: 'https://i.imgur.com/dXpjw50.png',
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Al Quadrado Chicken Wings',
        price: 7,
        description: '12 alitas de pollo Bbq + papas fritas',
        image: 'https://i.imgur.com/RldqANf.jpg',
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Costillas Bbq + Papas',
        price: 13,
        description: '1Kg de costillas Bbq +250gr de papas fritas',
        image: 'https://i.imgur.com/2pBFE8R.png',
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Chistobites',
        price: 7,
        description: 'Delicioasos Bites rellenos de chistorra y queso crema con toppiong de mantequilla de ajo y ajonjoli. (incluye salsa de la casa para untar).',
        image: 'https://i.imgur.com/8q0PGYJ.png',
        category_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Pizza Margarita + 1 Ingred',
        price: 12,
        description: 'Queso mozarella, salsa Napole y full Jamón',
        image: 'https://i.imgur.com/XIpXtdu.png',
        category_id: 3,
        created_at: new Date(),
      },
      {
        name: 'Pizza full jamon',
        price: 12,
        description: 'Queso mozarella, salsa Napole y full Jamón',
        image: 'https://i.imgur.com/vvlCtmq.png',
        category_id: 3,
        created_at: new Date(),
      },
      {
        name: 'Pizza full maiz',
        price: 12,
        description: 'Queso mozarella, salsa Napole y full Maíz',
        image: 'https://i.imgur.com/4ppAgQz.png',
        category_id: 3,
        created_at: new Date(),
      },
      {
        name: 'Salchicha Italiana',
        price: 12,
        description: 'Queso mozarella, salsa Napole y full Salchicha Italiana',
        image: 'https://i.imgur.com/UByzcBJ.png',
        category_id: 3,
        created_at: new Date(),
      },
      {
        name: 'Pizza Hawaiana',
        price: 10,
        description: 'Queso mozarella, salsa Napole y piña',
        image: 'https://i.imgur.com/UByzcBJ.png',
        category_id: 3,
        created_at: new Date(),
      },
	    {
        name: 'Pizza 4 Estaciones',
        price: 12,
        description: 'Queso mozarella, salsa Napole y 4 Estaciones',
        image: 'https://i.imgur.com/d7ELQE2.png',
        category_id: 3,
        created_at: new Date(),
      },
	    {
        name: 'Pizza Primavera',
        price: 12,
        description: 'Queso mozarella, salsa Napole y 4 Estaciones',
        image: 'https://i.imgur.com/HqapVaZ.png',
        category_id: 3,
        created_at: new Date(),
      },
	    {
        name: 'Pizza Pepperoni',
        price: 12,
        description: 'Queso mozarella, salsa Napole',
        image: 'https://i.imgur.com/l3wcozu.jpg',
        category_id: 3,
        created_at: new Date(),
      },
	    {
        name: 'Pizza Vegetariana',
        price: 12,
        description: 'Queso mozarella, salsa Napole',
        image: 'https://i.imgur.com/KxvaNEm.png',
        category_id: 3,
        created_at: new Date(),
      },
	    {
        name: 'Pizza Tocineitor',
        price: 14,
        description: 'Queso mozarella, salsa Napole',
        image: 'https://i.imgur.com/BlyXqUV.png',
        category_id: 4,
        created_at: new Date(),
      },
	  	{
        name: 'Pizza Al Quadrado Especial',
        price: 14,
        description: 'Queso mozarella, salsa Napole',
        image: 'https://i.imgur.com/MVoCKUx.png',
        category_id: 4,
        created_at: new Date(),
      },
	  	{
        name: 'Pizza Montserratina',
        price: 14,
        description: 'Queso mozarella, salsa Napole',
        image: 'https://i.imgur.com/KkTdG4T.png',
        category_id: 4,
        created_at: new Date(),
      },
	  	{
        name: 'Pizza Vegetariana Doble',
        price: 14,
        description: 'Queso mozarella, salsa Napole',
        image: 'https://i.imgur.com/CqOINbL.jpg',
        category_id: 4,
        created_at: new Date(),
      },
	  	{
        name: 'Pizza Triple Pepperoni',
        price: 15,
        description: 'Queso mozarella, salsa Napole',
        image: 'https://i.imgur.com/f4TSJ2O.png',
        category_id: 4,
        created_at: new Date(),
      },
	    {
        name: 'Galleta Extra Grande Marmoleada',
        price: 3,
        description: 'Galleta Extra Grande Marmoleada.',
        image: 'https://i.imgur.com/rUjIzLw.png',
        category_id: 5,
        created_at: new Date(),
      },
	    {
        name: 'Galleta Extra Grande Chocolate',
        price: 3,
        description: 'Galleta Extra Grande Chocolate.',
        image: 'https://i.imgur.com/rUjIzLw.png',
        category_id: 5,
        created_at: new Date(),
      }
    ]);

    await queryInterface.bulkInsert(CATEGORY_EXTRA_TABLE, [  
      {
        name: 'Elige Tu Extra',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Bordes Para Tu Pizza',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      },
      {
        name: '¿Deseas Agregar Top Cheese?',
        image: '',
        owner_id: 1,
        created_at: new Date(),
      }
    ]);

    await queryInterface.bulkInsert(PRODUCT_EXTRA_TABLE, [
      {
        name: 'Queso',
        price: 1,
        description: 'Extra de Queso',
        image: '',
        category_extra_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Jamón',
        price: 1,
        description: 'extra de jamon',
        image: '',
        category_extra_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Maíz',
        price: 1,
        description: 'extra de Maíz',
        image: '',
        category_extra_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Chistorra',
        price: 1,
        description: 'extra de chistorra',
        image: '',
        category_extra_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Tocineta',
        price: 1,
        description: 'extra de chistorra',
        image: '',
        category_extra_id: 1,
        created_at: new Date(),
      },
      {
        name: 'Borde de Queso Mozzarella',
        price: 1,
        description: 'Borde de Queso Mozzarella',
        image: '',
        category_extra_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Borde de Queso Crema',
        price: 1,
        description: 'Borde de Queso Crema',
        image: '',
        category_extra_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Borde de Chistorra',
        price: 1,
        description: 'Borde de Chistorra',
        image: '',
        category_extra_id: 2,
        created_at: new Date(),
      },
      {
        name: 'Top cheese',
        price: 1,
        description: 'Top cheese',
        image: '',
        category_extra_id: 3,
        created_at: new Date(),
      }
    ]);

    await queryInterface.bulkInsert(ROLE_TABLE, [
      { name: 'ADMIN', created_at: new Date() },
      { name: 'OWNER', created_at: new Date() },
      { name: 'STORE', created_at: new Date() },
      { name: 'SELLER', created_at: new Date() },
      { name: 'CUSTOMER', created_at: new Date() },
    ]);

    await queryInterface.bulkInsert(STORE_PRODUCT_TABLE, [
      { product_id: 1,store_id: 1,status:true,created_at: new Date() },
      { product_id: 2,store_id: 1,status:true,created_at: new Date() },
      { product_id: 3,store_id: 1,status:true,created_at: new Date() },
      { product_id: 4,store_id: 1,status:true,created_at: new Date() },
      { product_id: 5,store_id: 1,status:true,created_at: new Date() },
      { product_id: 6,store_id: 1,status:true,created_at: new Date() },
      { product_id: 7,store_id: 1,status:true,created_at: new Date() },
      { product_id: 8,store_id: 1,status:true,created_at: new Date() },
      { product_id: 9,store_id: 1,status:true,created_at: new Date() },
      { product_id: 10,store_id: 1,status:true,created_at: new Date() },
      { product_id: 11,store_id: 1,status:true,created_at: new Date() },
      { product_id: 12,store_id: 1,status:true,created_at: new Date() },
      { product_id: 13,store_id: 1,status:true,created_at: new Date() },
      { product_id: 14,store_id: 1,status:true,created_at: new Date() },
      { product_id: 15,store_id: 1,status:true,created_at: new Date() },
      { product_id: 16,store_id: 1,status:true,created_at: new Date() },
      { product_id: 17,store_id: 1,status:true,created_at: new Date() },
      { product_id: 18,store_id: 1,status:true,created_at: new Date() },
      { product_id: 19,store_id: 1,status:true,created_at: new Date() },
      { product_id: 20,store_id: 1,status:true,created_at: new Date() },
      { product_id: 21,store_id: 1,status:true,created_at: new Date() },
    ]);

    await queryInterface.bulkInsert(STORE_PRODUCT_EXTRA_TABLE, [
      { product_extra_id: 1,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 2,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 3,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 4,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 5,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 6,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 7,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 8,store_id: 1,status:true,created_at: new Date() },
      { product_extra_id: 9,store_id: 1,status:true,created_at: new Date() },
    ]);

    await queryInterface.bulkInsert(CATEGORY_EXTRA_PRODUCT_TABLE, [
      { product_id: 7,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 7,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 7,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 8,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 8,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 8,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 9,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 9,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 9,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 10,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 10,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 10,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 11,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 11,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 11,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 12,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 12,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 12,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 13,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 13,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 13,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 14,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 14,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 14,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 15,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 15,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 15,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 16,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 16,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 16,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 17,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 17,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 17,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 18,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 18,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 18,category_extra_id: 3,status:true,created_at: new Date() },
      { product_id: 19,category_extra_id: 1,status:true,created_at: new Date() },
      { product_id: 19,category_extra_id: 2,status:true,created_at: new Date() },
      { product_id: 19,category_extra_id: 3,status:true,created_at: new Date() },
    ]);

    await queryInterface.bulkInsert(LOCATION_TABLE, [
      {
        address: 'CARACAS',
        number:'1',
        city:'caracas',
        state:'miranda',
        reference: 'tiendas que estan localizadas en caracas',
        latitude: '-66.921608',
        longitude: '10.504851',
        type: 'OWNER',
        user_id: 2,
        created_at: new Date()
      },
      {
        address: 'ALTOS_MIRANDINOS',
        number:'1',
        city:'san antonio de los altos',
        state:'miranda',
        reference: 'tiendas que estan localizadas en los altos mirandinos',
        latitude: '10.381363302434657',
        longitude: '-66.96636946424778',
        type: 'OWNER',
        user_id: 2,
        created_at: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ROLE_TABLE);
    await queryInterface.dropTable(LOCATION_TABLE);

    await queryInterface.dropTable(CATEGORY_EXTRA_PRODUCT_TABLE);
    await queryInterface.dropTable(STORE_PRODUCT_TABLE);
    await queryInterface.dropTable(STORE_PRODUCT_EXTRA_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_PRODUCT_EXTRA_TABLE);
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(PRODUCT_EXTRA_TABLE);
    await queryInterface.dropTable(CATEGORY_EXTRA_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(STORE_TABLE);
    await queryInterface.dropTable(OWNER_TABLE);
    await queryInterface.dropTable(USER_TABLE);


  },
};
