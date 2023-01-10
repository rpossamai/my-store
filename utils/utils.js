const boom = require('@hapi/boom');

const axios = require('axios')
const https = require('https')
const cheerio = require('cheerio')
const httpsAgent = new https.Agent({ rejectUnauthorized: false })


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

  //calcula el precio del delivery de acuerdo a la distancia entre el cliente y la sucursal
  async calculateDeliveryPrice(distance,prices){
      // distancia <= 5 then price=1;
      // distance <= 10 then price=2
  }

  //calcula el tiempo de espera aprox para que una orden sea entregada
  //parametro la cantidad de ordenes que fueron pagadas y/o estan siendo procesadas
  async calculateWaitTime(ordersQty /*,distance*/ ){
    //tiempo de preparacion de una orden
    //cantidad de ordenes
    //tiempo de recorrido??

  }

  /**
 * asynchronous method, get the currency values from the BCV website, the web site update daily
 * @async
 * @method bcvDolar
 * @example <caption> example usage of bcvDolar </caption>
 * dtDolar().then(data=>{console.log(data)})
 * @yields {Promise} Promise object that contains the following propierties '_dolar','_euro','_yuan','_lira','_rublo', all are number type
 */
  async bcvDolar(){
    try{
      const result=await axios.get('https://www.bcv.org.ve',{httpsAgent})
      const $ =cheerio.load(result.data)
      const dolar = formato($('#dolar').text())
      const euro  = formato($('#euro').text(),1)
      //const yuan  = formato($('#yuan').text(),2)
      //const lira  = formato($('#lira').text(),3)
      //const rublo  = formato($('#rublo').text(),4)
      return {
          _dolar: dolar,
          _euro: euro,
          //_yuan: yuan,//_lira: lira,//_rublo: rublo
      } 
    }catch(error){
      return {
        _dolar: 0,
        _euro: 0,
    } 
    }
 
  
}

/**
 * asynchronous method, get the currency values from the DolarToday website, the web site update daily
 * @async
 * @method dtDolar
 * @example <caption> example usage of dtDolar </caption>
 * dtDolar().then(data=>{console.log(data)})
 * @yields {Promise} Promise object that contains the following propierties '_USD','_EUR','_COL', all are number type
 */
async dtDolar() {
  try{
    const rest= await axios.get('https://s3.amazonaws.com/dolartoday/data.json',{httpsAgent})
    return {
      _USD:rest.data.USD,
      //_EUR:rest.data.EUR,
      //_COL:rest.data.COL
    }
  }catch(error){
    return {_USD:0}
  }

}

}

const formato = (str,int=0)=>{
    const monedas = ['USD','EUR','CNY','TRY','RUB']
    const valor=str
    .replace(/(\r\n|\n|\r)/gm, "")
    .replace(monedas[int],"")
    .trim()
    .replace(',','.')

    const res=parseFlt(valor)
    return res
    }

const parseFlt = (str,int=2)=>{
    const res=parseFloat(str).toFixed(int)
    return res
    }


module.exports = Utils;