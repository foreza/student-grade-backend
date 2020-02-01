var mongoose = require('mongoose');         // Use mongoose
var Schema = mongoose.Schema;               // We're using a schema


const Student = Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    },
    meta: {
        created_at: {
            type: Date,
            default: Date.now
        }
    }
    }
);

// Export the module
module.exports = mongoose.model('Student', Student);
