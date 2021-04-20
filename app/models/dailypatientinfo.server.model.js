const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const DailyPatientInfoSchema = new Schema({
    added:{
        type: Date,
        default: Date.now
    },
    pulseRate: Number,
    bloodPressure: String,
    weight: String,
    bodyTemperature: String,
    respiratoryRate: String,
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient'
    }
});

module.exports = mongoose.model('DailyPatientInfo', DailyPatientInfoSchema);