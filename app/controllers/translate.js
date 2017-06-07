const express = require('express')
const router = express.Router()
const request = require('request')

router.get('/', function (req, res, next) {
  request({
    uri: 'https://translate.yandex.net/api/v1.5/tr.json/translate?&key=trnsl.1.1.20170502T140240Z.e335e8f283001e99.9b5c9ad87ddb4e729013b79f9009d8a6b993602f&lang=en-it&text=hello&options=1'
  },
  function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(body)
      res.json(body)
    } else {
      res.json(error)
    }
  })
})

module.exports = {
  router
}
