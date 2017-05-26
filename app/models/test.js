const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalPrice: {
    type: Number
  }
})

const Test = mongoose.model('Test', testSchema)

module.exports = Test
