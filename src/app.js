const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('../utils/geocode');
const foreCast = require('../utils/forecast');

const app = express();

// Path
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsPath);

// Set up static directory
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bintang'
    }); 
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Bintang',
        helpText: 'This is help page where you get help'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Bintang',
        aboutText: 'This is basic project for knowing weather on certain area created with node js and express with the help from Watherstack API'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            message: 'Error, please provide the address'
        })
    }

    geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {                  
            return res.send({ error });
        }
    
        foreCast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});