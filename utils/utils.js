const boom = require('@hapi/boom');

//const { models } = require('./../libs/sequelize');

class Utils {

  constructor(){}


  async calculateDistance(lon1, lon2, lat1, lat2){
    let p = 0.017453292519943295;
    let c = Math.cos;
    let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((lon1- lon2) * p))) / 2;
    let dis = (12742 * Math.asin(Math.sqrt(a)));
    return Math.trunc(dis);
  }

  async getDistanciaMetros(lat1,lon1,lat2,lon2){
    const rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km 
    var dLat = rad( lat2 - lat1 );
    var dLong = rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * 
    Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    //aquí obtienes la distancia en metros por la conversion 1Km =1000m
    var d = R * c * 1000; 
    return d ; 
  }

}

module.exports = Utils;