const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
      pass_code: {type: String, maxlength: 7, trim: true, required: true},
      savings: [{
          amount:  {type: Number, default: 0},
          time_stamp: { type : Date, default: Date.now},
      }],
      cashouts: [{
          amount:  {type: Number, default: 0},
          time_stamp: { type : Date, default: Date.now},
      }],

      time_stamp: { type : Date, default: Date.now },   
})

module.exports = mongoose.model('User', userSchema);