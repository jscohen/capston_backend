'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Doc = models.doc

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  const userId = req.user.id.toString()
  Doc.find({_owner: userId})
    .then(docs => res.json({
      docs: docs.map((e) =>
        e.toJSON({ user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    doc: req.doc.toJSON({ user: req.user })
  })
}

const create = (req, res, next) => {
  const doc = Object.assign(req.body.doc, {
    _owner: req.user._id
  })
  Doc.create(doc)
    .then(doc =>
      res.status(201)
        .json({
          doc: doc.toJSON({ user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.

  req.doc.update(req.body.doc)
  .then(doc => res.sendStatus(201))
  .catch(next)
}

const destroy = (req, res, next) => {
  req.doc.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

const getVal = function (fullURL, callback) {
  const request = require('request')
  request(fullURL,
  function (error, response, body, getVal) {
    if (error || response.statusCode !== 200) {
      return error
    }
    callback(null, JSON.parse(body))
  })
}

const translate = (req, res, next) => {
  const uri = 'https://translate.yandex.net/api/v1.5/tr.json/translate?&key='
  const key = 'trnsl.1.1.20170502T140240Z.e335e8f283001e99.9b5c9ad87ddb4e729013b79f9009d8a6b993602f&lang='
  const fullURL = uri + key + req.body.doc.fromLanguage + '-' + req.body.doc.toLanguage + '&text=' + req.body.doc.text + '&options=1'
  const id = req.body.doc.id

  getVal(fullURL, function (err, body) {
    if (err) {
      console.log(err)
    } else {
      const result = body.text[0]
      Doc.findById(id)
      .then(doc => doc.update({$set: {text: result}}))
      .then(console.log('inside update'))
      .then(res.sendStatus(201))
      return result
    }
  })
}

module.exports = controller({
  index,
  show,
  create,
  update,
  translate,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  {method: authenticate},
  { method: setModel(Doc), only: ['show'] },
  { method: setModel(Doc, { forUser: true }), only: ['update', 'destroy'] }
] })
