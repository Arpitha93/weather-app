const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=2561de5b13ece1679aba865b61b4ecc5&query='+ latitude + ',' + longitude + ' &units=f'

  // request({url : url, json: true}, (error, response) => {
  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback('There is something wrong to connect!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees outside and feels like ' + body.current.feelslike);
    }
  })
}

module.exports = forecast
