const request = require('request');

//let's use callback function to call any location instead of giving same url
const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXJwaXRoYW5hZ2F2YXJhIiwiYSI6ImNrZjV6NGJycTBkZWgzNHFqMWxzeWZuM3kifQ.ljeYOBcxf7gHgdzq7dyrfw&limit=1'
  // request({url: url, json: true}, (error, response) => {
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('There is something wrong to connect!', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
         latitude : body.features[0].center[1],
         longitude : body.features[0].center[0],
         location : body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
