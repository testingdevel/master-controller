const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const router = express.Router()

app.get('/', (req, res) => res.send('Welcome to the root route'))

app.listen(port, () => console.log(`Server is listening on port ${port}`))