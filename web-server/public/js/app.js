console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})






// console.log('Client side is up and running!');
//
// // fetch('http://puzzle.mead.io/puzzle').then((response) => {
// //   response.json().then((data) => {
// //     console.log(data);
// //   })
// // })
//
// const weatherForm = document.querySelector('form')
// const search = document.querySelector('input')
// const messageOne = document.querySelector('#message-1')
// const messageTwo = document.querySelector('#message-2')
//
// //challenge 10: Render a content to paragraph
// // 1. Select the second message p from JavaScript
// // 2. Just before fetch, render a loading message and empty message p
// // 3. If error, render error
// // 4. if no error, render location and forecast
// // 5. Tset your work
//
// weatherForm.addEventListener('sumbit', (event) => {
//   event.preventDefault()
//
//   const location = search.value
//   messageOne.textContent = 'Loading...'
//   messageTwo.textContent = ''
//
//   //challenge 8: fetch weather
//   // 1. Setup a call to fetch a weather for Boston
//   // 2. Get the parse json response
//   //  - if error property print error
//   //  - if not print location and forecast
//   // 3. Test your work
//   fetch('http://localhost:3000/weather?address=?'+ location).then((response) => {
//     response.json().then((weatherData) => {
//       if (weatherData.error) {
//         // console.log(weatherData.error);
//         messageOne.textContent = weatherData.error
//       } else {
//         messageOne.textContent = weatherData.location
//         messageTwo.textContent = weatherData.forecast
//           // console.log(weatherData.location);
//           // console.log(weatherData.forecast);
//       }
//     })
//   })
// })
//
// // challenge 9: Use input value to get weather
// // 1. Migrate fetch call into the submit callback
// // 2. Use the search text as a address to query the string value
// // 3. submit the form with a valid and invalid test
