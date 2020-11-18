const mongoose = require('mongoose')


const SubjectSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  date_birth: String,
  age: String,
  gender: String,
  hba1c: String,
  duration_diabetes: String,
  type_diabetes: String,
  address: {
    type: [String],
    default: ["Florinópolis", "SC", "Brasil"]
  },
  height: String,
  weight: String,
  obrien: String,
  hrv: String,
  brs: String,
  pupil: String,
  last_exam: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'subject' })


module.exports = mongoose.model('Subject', SubjectSchema);