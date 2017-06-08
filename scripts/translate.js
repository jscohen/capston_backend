// const express = require('express')
// const router = express.Router()
const request = require('request')
const uri = 'https://translate.yandex.net/api/v1.5/tr.json/translate?&key='
const key = 'trnsl.1.1.20170502T140240Z.e335e8f283001e99.9b5c9ad87ddb4e729013b79f9009d8a6b993602f&lang=en-'

const getTranslation = function (text, lang) {
  const fullURL = uri + key + lang + '&text=' + text + '&options=1'
  request(fullURL,
  function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const result = JSON.parse(body)
      const text = result.text[0]
      return text
    }
    return false
  })
}

module.exports = {
  getTranslation
}
