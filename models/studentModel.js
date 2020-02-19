var mongoose = require('mongoose');         // Use mongoose
var Schema = mongoose.Schema;

const Student = Schema({
    _id: {
        type: mongoose.Types.ObjectId, auto: true
    },
    name: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true
    }
    }
);

Student.statics.Get = function(where = {}, sort = {}) {
    return this.find(where).sort(sort);
}

// Export the module
module.exports = mongoose.model('Student', Student);
