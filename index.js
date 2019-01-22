const express = require('express')
const request = require('request-promise-native')

const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => res.send('Welcome to the root route'))

app.post('/post', function (req, res) {
  console.log(req.body)
  console.log("User text: ",  req.body.text)

  const requestBody = {
    request: req.body.text
  }

  console.log('Sending request to NLU')

  return request({
    uri: 'http://10.147.2.34:5000/',
    method: 'POST',
    body: requestBody,
    json: true
  })
    .then(intent => {
      console.log(intent)

      return res.send(intent)
    })


  res.send('POST request to the homepage')
})

app.listen(port, () => console.log(`Server is listening on port ${port}`))