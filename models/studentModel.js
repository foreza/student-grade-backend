var mongoose = require('mongoose');         // Use mongoose
var Schema = mongoose.Schema;

const Student = Schema({
    _id: {
        type: mongoose.Types.ObjectId, auto: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [12, 'Name too long'],
        minlength: [1, 'Name too short']
    },
    grade: {
        type: Number,
        required: true,
        min: [0, 'Number too low'],
        max: [100, 'Number too high']
    }, 
    versionKey: false 
    }
);

// Export the module
module.exports = mongoose.model('Student', Student);
