const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

const Utils = require('./../utils/utils.js');
const utils = new Utils();

class StoreService {
  constructor() {}

  async create(data) {
    const newStore = await models.Store.create(data);
    return newStore;
  }

  async find(ownerId) {
    const stores = await models.Store.findAll({
      where: { ownerId }, include: ['location']
    });
    return stores;
  }
 
  async findOrderedByDistance(ownerId, latitude, longitude, radiusKm) {
    var distanceKm=0; var metrics = []; var storeAux = {}; 
    var storesList=[];
    var nearestDistanceKm=10000;var nearestStore = {};

    const stores = await models.Store.findAll({ where: { ownerId }, include: ['location'] });
    
    for (const store of stores.values()) {
      metrics = {};storeAux = {};
      //calculateDistance(lon1, lon2, lat1, lat2)//getDistanciaMetros(lat1,lon1,lat2,lon2)
      //distanceKm = await utils.calculateDistance(-66.84512522749166,store.location.longitude,10.482542288672368,store.location.latitude);
      distanceKm = await utils.getDistanciaMetros(
        latitude,longitude,store.location.latitude, store.location.longitude)/1000;   

      metrics ['status'] = 1;
      metrics ['message'] = 'ADDRESS INSIDE OF RADIUS';
      metrics ['distanceKm'] = distanceKm;
      metrics ['waitTime'] = "30-40 min aprox"; //CALCULARRR XXXXX
      metrics ['deliveryPrice'] = 1; //CALCULARRR XXXXX

      storeAux ['id'] = store.id;
      storeAux ['socialId'] = store.socialId;
      storeAux ['socialName'] = store.socialName;
      storeAux ['phone'] = store.phone;
      storeAux ['schedule'] = "11am - 11:59pm"//store.schedule;
      storeAux ['location'] = store.location;
      storeAux ['metrics'] = metrics;
      
      if(latitude==0 || longitude==0){
        storeAux.metrics ['status'] = 0;
        storeAux.metrics ['message'] = 'ADDRESS COORDINATES ARE ZERO. YOU GET MAIN STORE';
        nearestStore=storeAux;
        break;
      }

      if(distanceKm <= radiusKm){   
        storesList.push(storeAux);
      }else{
        //Devolverle un elemento con tienda mas cercana pero fuera del radio establecido  
        if(metrics.distanceKm < nearestDistanceKm){
          storeAux.metrics ['status'] = -1;
          storeAux.metrics ['message'] = 'ADDRESS OUTSIDE OF RADIUS. YOU GET THE NEAREST STORE.';
          nearestDistanceKm=metrics.distanceKm;
          nearestStore=storeAux;
        }
      }      
    }
    //Funcion flecha que ordena las tienda segun distancia mas cercana al cliente
    storesList.sort((a,b)=>a.metrics.distanceKm - b.metrics.distanceKm);

    if(storesList.length==0){
      storesList.push(nearestStore);   
    }

    return storesList;
  }

}

module.exports = StoreService;
