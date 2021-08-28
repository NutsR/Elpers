const express = require('express');
const mongoose = require('mongoose');

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
       const elp = new Elper({
	user: '6128f6e15241f91d9a5d7ad7',
        title: `${descript} ${place}` ,
        img: 'https://source.unsplash.com/collection/483251/1600x900' ,
        price: `${Math.floor(Math.random() * 1000 ) + 100}`,
        description: 'Random text based on your feedback actually we do not really  take your feedback if we like it then we call it a feedback else needless troll no critism allowed here',
        location: `${citiesDB[random400].city}, ${citiesDB[random400].admin_name}`
    })
       await elp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
