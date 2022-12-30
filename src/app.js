const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utilities/_app_weather_geocode.js');
const forecast = require('./utilities/_app_weather_forecast.js');

// -NOTE - 
// node provides following paths:
// console.log(__dirname);
// console.log(__filename);

const publicDirPath = path.join(__dirname, '../public');
console.log(publicDirPath);


// invoke and then define
// express can send html or JSON directly to client
const app = express();

//--------------------------------------------
// 7-47 setup template engine
// handlebars setup

// add following to fix path issue for express and HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));
//--------------------------------------------

// WHEN REQUESTS OCCUR IN BROWSER ThE FOLLOWING GET HIT 1-BY-1

// customize server
app.use(express.static(publicDirPath));


// HANDLE ROOT PATH
app.get('', (req, res) => {
  // res.send - no longer using send method, instead use 'render' for HBS views
  res.render('index', {
    title: 'Z-WEATHER',
    name: 'zach thompson',
    copyright: 'zt@2023'
  }); // index HBS view

})

// HANDLE ABOUT PATH
app.get('/about', (req, res) => {
  // res.send - no longer using send method, instead use 'render' for HBS views
  res.render('about', {
    title: 'Z-about',
    copyright: 'zt@2023'
  }); // index HBS view

})


// 08-54-part 2 -- query string for weather
// HANDLE PRODUCTS PATH
app.get('/weather', (req, res) => {
  // localhost:3000/products?search=games&rating=5
  const address = req.query.address;
  if (!address) {
    // use return here to avoid sending 2 responses!
    return res.send({
      error: 'You must provide an address'
    });
  }
  //--------------------
  //--------------------
  // 08-55 -- add geocode and forecast utility methods to express app

  geocode(address, (error, data) => {
    if (error) return res.send({error});

    else {
        const {lat, long, loc} = data; // destructuring of geocode

        // 06 - 38 -- CALLBACK CHAINING
        forecast(lat, long, (forecastError, forecastData) => {
          // console.log('Error', forecastError);
          // console.log('Data', forecastData);
          // console.log(address);
          if (forecastError) return res.send({error});
          else {
            res.send({
              forecast: forecastData.descriptions,
              temp: forecastData.temp,
              // location: "Houston",
              city: address,
              state: forecastData.state
            });
          }
          
                  
        });
    }
    
  });
  //--------------------
  //--------------------


  

})


// 08-54 -- Query Strings and JSON Response
// HANDLE PRODUCTS PATH
app.get('/products', (req, res) => {
  // localhost:3000/products?search=games&rating=5
  
  if (!req.query.search) {
    // use return here to avoid sending 2 responses!
    return res.send({
      error: 'You must provide a search term'
    });
  }
  console.log(req.query.search);
  return res.send({
    products: []
  })

})

// HANDLE HELP PATH
app.get('/help', (req, res) => {
  // res.send - no longer using send method, instead use 'render' for HBS views
  res.render('help', {
    title: 'Z-HELP',
    copyright: 'zt@2023'
  }); // index HBS view

})

app.get('/help/*', (req, res) => {
  // res.send - no longer using send method, instead use 'render' for HBS views
  res.send('No help article found'); // index HBS view
})


// HANDLE EXCEPTIONS 404 - NEEDS TO BE LAST FOR WILDCARD!!!!!
app.get('*', (req, res) => {
  // res.send - no longer using send method, instead use 'render' for HBS views
  res.send('404 Page Not Found'); // index HBS view
})


// app.com
app.get('', (req, res) => {
  res.send('hello express');  
});


// CHALLENGE 07-45 -- refactor use express.static with path to html templates
// ----------------------------------------------------
// // app.com/about
// app.get('/about', (req, res) => {
//   res.send('hello about');  
// });

// // app.com/help
// app.get('/help', (req, res) => {
//     res.send('hello help');  
//   });
// ----------------------------------------------------


// CHALLENGE
// SETUP ABOUt AND WEATHER ROUTE


app.get('/weather', (req, res) => {
    // pass html or json
    const html = `<h1>weather</h1>`;
    const jsonContent = {
        name: 'ricky',
        age: 5
    };
    // res.send(html);  
    res.send(jsonContent);  
});



  app.listen(3000, () => console.log('server is up on 3000'));