const express = require('express')
const routes = express.Router()

const Controller = require('./controllers/Controller')

routes.get('/get/:nfc_qrcode', Controller.get)

module.exports = routes