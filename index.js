const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const mongoose = require('mongoose');//
require('dotenv').config();//Dotenv is a dependency that loads environment variables from a .env

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;/*.env.test & .env.production*/ ;


//Conexión a base de datos
//const username = "alquadrado";//const password = "alquadrado";//const dbName = "alquadradodb";
//const uri = `mongodb+srv://${username}:${password}@cluster0.98ogoej.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}`
            +`@cluster0.98ogoej.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri)
  .then(() => console.log('Connected database'))
  .catch(e => console.log(e));
//End Conexión a base de datos


app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port: ' +  port);
});
