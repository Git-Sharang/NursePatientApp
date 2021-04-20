const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const DailyMotivationSchema = new Schema({
    created:{
        type: Date,
        default: Date.now
    },
    title: String,
    message: String,
    nurse: {
        type: Schema.ObjectId,
        ref: 'Nurse'
    }
});

module.exports = mongoose.model('DailyMotivation', DailyMotivationSchema);