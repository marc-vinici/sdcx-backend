const mongoose = require('mongoose')


const ObrienSchema = new mongoose.Schema({
  id_subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject'
  },
  date: Date,
  resting: {
    mean: String,
    min: String,
    max: String,
    stdDev: String,
    rrRatio: String,
    ppData: String, // link aws
    signalData: String // link aws
  },

  deep_breathing: {
    mean: String,
    min: String,
    max: String,
    stdDev: String,
    rrRatio: String,
    ppData: String, // link aws
    signalData: String // link aws
  },

  valsalva: {
    mean: String,
    min: String,
    max: String,
    stdDev: String,
    rrRatio: String,
    ppData: String, // link aws
    signalData: String // link aws
  },

  standing: {
    mean: String,
    min: String,
    max: String,
    stdDev: String,
    rrRatio: String,
    ppData: String, //link aws
    signalData: String // link aws
  },
  bphr_rest: [String], // systolic, diastolic, heart rate
  bphr_stand: [String],
  bphr_pc: [String],
  score: String,

  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'obrien' })


module.exports = mongoose.model('Obrien', ObrienSchema);