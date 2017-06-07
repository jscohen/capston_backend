'use strict'

// const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const docSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String
  },
  title: {
    type: String
  },
  translation: {
    type: String
  }
})

const Doc = mongoose.model('Doc', docSchema)

module.exports = Doc
