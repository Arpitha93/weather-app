const request = require('request');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// challenge 4 : Accept location via command line arguments
// 1. Access the command line without using yargs
// 2. Use the string value as input for geocode
// 3. Only use geocode if location is provided
// 4. Test your work

// challenge 5 : Use both destruction and property shorthand in weather app
// 1. Use destruction in app.js, geocode.js, forecast.js
// 2. Use property shorthand in  geocode.js, forecast.js
// 3. Test your work
const address = process.argv[2]

if (!address) {
  console.log('please provide valid address');
} else {
  // geocode(address, (error, data) => {
  //destructing thr object
  geocode(address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return console.log(error);
    }
    //callback chaining
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(location)
      console.log(forecastData)
    })
  })
}


// const url = 'http://api.weatherstack.com/current?access_key=2561de5b13ece1679aba865b61b4ecc5&query=37.8267,-122.4233&units=f'

// request({url : url}, (error, response) => {
//   const data = JSON.parse(response.body)
//   console.log(data.current);
// })

//for automatically parsing the JSON data we can call json in request
//challenge 1 : print a small forecast to user
// 1. print " it is currently x temperature and it feels like x temperature"
// 2. test your Work

// request({url : url, json: true}, (error, response) => {
//   if (error) {
//     console.log('There is something wrong to connect!');
//   } else if (response.body.error) {
//     console.log('Unable to find location');
//   } else {
//     console.log(response.body.current.weather_descriptions[0] + '. it is currently ' + response.body.current.temperature + ' degrees outside and feels like ' + response.body.current.feelslike);
//   }
// })

// using Geocoding to fetch latitude and longitude of places
// challenge 2 : Setup error hangling fro geocodind
// 1. setup an error handler for low level error
// 2. Test by disabling the network and running the app
// 3. setup error handling for no matching result
// 4. test your work

// const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXJwaXRoYW5hZ2F2YXJhIiwiYSI6ImNrZjV6NGJycTBkZWgzNHFqMWxzeWZuM3kifQ.ljeYOBcxf7gHgdzq7dyrfw&limit=1'
// request({url: geoURL, json: true}, (error, response) => {
//   if (error) {
//     console.log('There is something wrong to connect!');
//   } else if (response.body.features.length === 0) {
//     console.log('Unable to find location');
//   } else {
//     const latitude = response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log('Latitude is ' + latitude + ' and longitude is ' + longitude);
//   }
// })
// geocode('Boston', (error, data) => {
//   // console.log('error', error);
//   // console.log('data', data);
// })


// challenge 3: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(44.1545, -75.7088, (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })
