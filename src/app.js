const express = require('express')
const bodyParser = require('body-parser')
const Redis = require('./redis')

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  req.client = Redis.getClient()
  next()
})

app.get('/message', (req, res) => {
  req.client.get('api', (error, reply) => {
    if (error) {
      return res.status(500).send(error.message)
    }
    return res.send(reply)
  })
})

app.post('/message', (req, res) => {
  if (!req.body.message) {
    return res.sendStatus(400)
  }
  try {
    req.client.set('api', req.body.message)
    return res.end()
  } catch (error) {
    return res.sendStatus(500)
  }
})

module.exports = app
