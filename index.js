const express = require('express')
const request = require('request-promise-native')
const apiUrls = require('./apiUrls')

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

const getTopStories = () => {
  return request({
    uri: `${apiUrls.apiClient}/api/v1/news/top-stories`,
    json: true
  })
}

const getInternationalNews = () => {
  return request({
    uri: `${apiUrls.apiClient}/api/v1/news/world`,
    json: true
  })
}

const getLocalNews = () => {
  return request({
    uri: `${apiUrls.apiClient}/api/v1/news/local`,
    json: true
  })
}

const intentToClient = {
  "top 5 stories": getTopStories,
  "international news": getInternationalNews,
  "local news": getLocalNews
}

console.log(apiUrls)

app.get('/', (req, res) => res.send('Welcome to the root route'))

app.post('/post', function (req, res) {
  console.log(req.body)
  console.log("User text: ",  req.body.text)

  const requestBody = {
    request: req.body.text
  }

  return request({
    uri: apiUrls.nlu,
    method: 'POST',
    body: requestBody,
    json: true
  })

  .then(intentObj => {
    console.log("intent: ", intentObj)

    const client = intentToClient[intentObj.intent]
    return client()
  })

  .then(data => {
    console.log(data)
    return res.send(data)
  })

})

app.listen(port, () => console.log(`Server is listening on port ${port}`))