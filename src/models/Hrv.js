const mongoose = require('mongoose')


const HrvSchema = new mongoose.Schema({
    id_subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    date: Date,
    time_domain: {
        ppData: String, // link aws
        signalData: String, // link aws
        nn_intervals: {
            numInterval: String,
            mean: String,
            min: String,
            max: String,
            sdnn: String
        },
        nn_intervals_diff: {
            mean: String,
            min: String,
            max: String,
            rmssd: String,
            sdsd: String
        },
        heart_rate: {
            mean: String,
            min: String,
            max: String,
            stdDev: String
        },
        derivers: {
            nn50: String,
            nn50nni: String,
            nn20: String,
            nn20nni: String
        }
    },
    frequency_domain: {
        totalPower: String,
        lfhfRatio: String,
        vlf: {
            peak: String,
            abs: String,
            rel: String,
            log: String,
        },
        lf : {
            peak: String,
            abs: String,
            rel: String,
            log: String,
            norm: String
        },
        hf : {
            peak: String,
            abs: String,
            rel: String,
            log: String,
            norm: String
        }
    },
    non_linear : {
        poincare: {
            sd1: String,
            sd2: String,
            csi:String,
            cvi:String
        }
    },

    uploadedAt: {
        type: Date,
        default: Date.now
      }

}, { collection: 'hrv' })


module.exports = mongoose.model('Hrv', HrvSchema);