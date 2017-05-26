const controller = require('lib/wiring/controller')
const models = require('app/models')
const Test = models.test

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')
const lodash = require('lodash')

const create = (req, res, next) => {
  const test = Object.assign(req.body.test, {
    _owner: req.user._id
  })
  Test.create(test)
    .then(test =>
      res.status(201)
      .json({
        test: test.toJSON({
          user: req.user
        })
      }))
    .catch(next)
}

const index = (req, res, next) => {
  Test.find(req.user === res._owner)
    .then(tests => res.json({
      tests: tests.map((e) =>
        e.toJSON({
          user: req.user
        }))
    }))
    .catch(next)
}

module.exports = controller({
  index,
  create,
}, { before: [
  { method: setUser, only: ['index'] },
  { method: authenticate}
  // { method: setModel(Test), only: ['show'] },
  // { method: setModel(Test, { forUser: true }), only: ['update', 'destroy'] }
] })
