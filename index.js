const express = require('express')
const app = express()
const router = express.Router()
const port = process.env.PORT || 5501

app.set('port', port)

app.use(express.static('public'))

app.use('/images/', () => {})

app.use('/', (req, res) => {
  res.send('<meta http-equiv="refresh" content="0; url=./" />')
})

app.listen(port, () => console.log(`Server initialized, port: ${port}`))
