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

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  {method: authenticate},
  { method: setModel(Doc), only: ['show'] },
  { method: setModel(Doc, { forUser: true }), only: ['update', 'destroy'] }
] })
