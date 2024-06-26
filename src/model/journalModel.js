const mongoose = require('mongoose');

const journalSchema = mongoose.Schema(
    {
        title:{
            type : String,
            required : [true, "please provide the title"]

        },
        body:{
            type : String,
            required : [true, "please provide the journal"]
        },
    },
    {
        timestamps:true
    }
);

const Journal = mongoose.model('Journal',journalSchema);

module.exports = Journal;