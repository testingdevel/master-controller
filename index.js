const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = express.Router()

app.get('/', (req, res) => res.send('Welcome to the root route'))

app.post('/post', function (req, res) {
  console.log(req.body)
  res.send('POST request to the homepage')
})

app.listen(port, () => console.log(`Server is listening on port ${port}`))