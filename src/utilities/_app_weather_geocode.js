const request = require('postman-request');
const { config } = require('dotenv');
config();




//-------------------------------------------------------------------------
// 06 - 36 - REFACTORED CALLBACK CODE
//-------------------------------------------------------------------------


const geocode = (address, cb) => {
    const mbKey = process.env.MAPBOX_TOKEN;
    const mbUrl = `https://api.mapbox.com/geocoding/v5/`;
    const mbEndpoint = 'mapbox.places';
    const mbSearchTextEncoded = encodeURIComponent(address);
    const mbLimit = '&limit=1';
    const mbFullUrl = `${mbUrl}${mbEndpoint}/${mbSearchTextEncoded}.json?access_token=${mbKey}&limit=1`;
    console.log('Matchbox: ', mbFullUrl);
    // use ENCODED URI on ADDRESS
    // const encodedAddress = encodeURIComponent(address);
    request({url: mbFullUrl, json: true}, (error, response) => {
        if (error) {
            cb('unable to connect to location services!', undefined);
        }
        else if (response.body.features.length === 0) {
            cb('unable to find location, try another search', undefined);
        }   
        else {
            const data = response.body.features[0];
            cb(undefined, {
                lat: data.center[1],
                long: data.center[0],
                loc: data.place_name,
            });
        } 
    });
};

module.exports = geocode;