const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=0cd99522a6017f8a00a76a2d4add79b1&query=' + longitude + ',' + latitude + '&units=f';

    request({url: url, json: true}, (error, { body }) => {
        if (error) {    
            callback('Unable to connect to the geolocation service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined,`${body.current.weather_descriptions[0]}. The temperature is ${body.current.temperature} Celcius but it's feels like ${body.current.feelslike} Celcius`);
        }
    })
}

module.exports = forecast;