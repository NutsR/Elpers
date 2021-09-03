const express = require('express');
const mongoose = require('mongoose');
const  mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const mapboxToken = 'pk.eyJ1IjoiYmxha2VucjAxIiwiYSI6ImNrdDFyZ3ZrZTBkOHMydm56Yjk3MGkwbnMifQ.G5bp_EBof1-WDjZ-WtRFcQ'
const geocoding = mbxGeocoding({ accessToken: mapboxToken })

const path = require('path');

const app = express();

const {descriptors, places } = require('./seedHelpers')
const Elper = require('../models/elper.js')
const citiesDB = require('./in.json');
mongoose.connect('mongodb://127.0.0.1:27017/elpCamp',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
} );


function makeid(length) { 
let result = ''; 
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
const charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
   result += characters.charAt(Math.floor(Math.random() *     charactersLength)); 
      } 
   return result; 
  }
const name = makeid(10);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
}); 
app.set('view engine', 'ejs');

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Elper.deleteMany({});
    for(let i = 0; i <= 50; i++){
        const place = sample(places);
        const descript = sample(descriptors);
       const random400 = Math.floor(Math.random() * 406 );
          const cities = citiesDB[random400].city;
   const geodata = await geocoding.forwardGeocode({
         query: cities,
	limit: 1
}).send();
const coord = geodata.body.features[0].geometry;
 const elp = new Elper({
	user: '6128f6e15241f91d9a5d7ad7',
        title: `${descript} ${place}` ,
        images:[ { url:'https://source.unsplash.com/collection/483251/1600x900', filename: name}],
        price: `${Math.floor(Math.random() * 1000 ) + 100}`,
        description: 'Random text based on your feedback actually we do not really  take your feedback if we like it then we call it a feedback else needless troll no critism allowed here',
        location: `${cities}, ${citiesDB[random400].admin_name}`,
  	geometry: coord
  })
       await elp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})

