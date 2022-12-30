const request = require('postman-request');
const { config } = require('dotenv');
config();


//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


// method to be invoked:
/*
forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', err);
    console.log('Data', data);
});
*/

const forecast = (lat, long, cb) => {
    console.log('lat::: ' + lat, '   long::: '+long);
    const wsKey = process.env.WEATHERSTACK_TOKEN;
    const wsUrl = 'http://api.weatherstack.com/';
    const wsAccess = `current?access_key=${wsKey}&name=Zach&query=`;
    const wsQueryLoc = `${lat},${long}`;
    const wsQueryLocEncoded = encodeURIComponent(wsQueryLoc);
    const wsQueryUnits = `&units=f`;
    const wsFullUrl = wsUrl + wsAccess + wsQueryLocEncoded + wsQueryUnits;

    console.log('full ws__________', wsFullUrl);

    request({url: wsFullUrl, json: true}, (error, response) => {
        if (error) {
            cb('unable to connect to location services!', undefined);
        }
        else if (response.body.error) {
            cb('unable to find location, try another search', undefined);
        }   
        else {
            const data = response.body;
            // console.log(data);
            cb (undefined, {
                temp: data.current.temperature, 
                city: data.location.name,
                descriptions: data.current.weather_descriptions,
                state: data.location.region
            });
            // cb(undefined, {
            //     lat: data.center[1],
            //     long: data.center[0],
            //     loc: data.place_name,
            // });
        } 
    });

}

module.exports = forecast;
