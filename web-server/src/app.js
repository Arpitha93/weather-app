const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const directoryPath = path.join(__dirname, '../public')
//which gets the path from index.html and express use it
//by using this function so we can elinminate the app.get
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs') //setup handler bars so this case we do not require html we can delete(index.html)
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(directoryPath)) //setup static directory serve

// to access the handlerbars we will use
app.get('', (req, res) => {
  res.render('index', {
    title : 'Weather App',
    name : 'Arpitha'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title : 'About me',
    name : 'Arpitha'
  })
})

//challenge 4: Setup a template for help page
// 1. setup a help template to render a help message to the screen
// 2. setup a help route to render the template withe an example message
// 3. Visit the route in your browser and see the help message print

app.get('/help', (req, res) => {
  res.render('help', {
    title : 'You have reached Help Page',
    name : 'Arpitha'
  })
})

//challenge 5: Create a partial for footer
// 1. setup a template for the footer partial "Created by 'someName'"
// 2. Render the partial at the bottom of three Page
// 3. Test your work

//app.com
//app.com/Help
//app.com/about

// app.get('', (req, res) => {
//   // res.send('Hello Express!');
//   res.send('<h1> Weather App </h1>'); // sending html request
// })

// app.get('/help', (req, res) => {
//   // res.send('Help page!')
//   res.send([{
//     name : 'Arpitha'
//   }, {
//     name : 'Arjun'
//   }])
// })

//challenge 1 : setup two new routes
// 1. Setup an about route and render a page title
// 2. Setup an weather route and render a page title
// 3. Test your work

//challenge 2 : Update routes
// 1. setup about route to render a title with html
// 2. setup weather route to send back json
//    - object with forecast and locating string
// 3. Test your work

//challenge 3. Create two more html files
// 1. create a html file for about with About title
// 2. create a html file for help with Help title
// 3. Remove the old route handlers for both
// 4. Test your Work

// app.get('/about', (req, res) => {
//   res.send('<h1> About page! </h1>')
// })

// challenge 7: Wireup /weather
// 1. require geocode/forecast into the app.js
// 2. use the address to geocode
// 3. use the Coordinate to get the forecast
// 4. send back the real forecast and location

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'No address found'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forecast : forecastData,
        location,
        address : req.query.address
      })
    })
  })
})

//challenge 6: Update weather endpoint to accept address
// 1. No address? send back an error
// 2. address? send back static JSON
//    - Add address property onto JSON which returns the address
// 3. Test /weather and /weather?address=san Jose

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error : 'Provide a search term'
    })
  }
  console.log(req.query.search);
  res.send([{
    product : []
  }])
})

//if any other webpage visited 404 error
app.get('*', (req, res) => {
  res.render('404', {
    title : '404 Page',
    name : 'Arpitha',
    errorMessage : 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('server is running at port 3000');
})
