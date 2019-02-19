const express = require('express')
const app = express()
const router = express.Router()
const port = process.env.PORT || 5501

app.set('port', port)

app.use('/', (req, res) => {
  res.send('API working here!')
})

app.listen(port, () => console.log(`Server initialized, port: ${port}`))
