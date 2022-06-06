const mongoose = require('mongoose');

//job schema
var jobSchema = new mongoose.Schema({
    course: {
        type: String,
        validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
        message: 'Must be a URL'
    },
    coursename: {
        type: String,
        required: true
    },
    coursecode: {
        type: String,
        required: true
    },
    studytype: {
        type: String,
        enum: [
            'Bachelor',
            'Master',
            'PhD',
            'One year programme',
            'Other',
        ],
        required: true,
        min: 1
    },
    examform: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        enum: [
            "Aesthetics, Fine Art and Music Studies",
            "Econmics, Management and Administration",
            "Fisheries",
            "History, Religion, Culture and Ideas",
            "Information Technology og informatics",
            "Languages ans Literature",
            "Mathematics and Natural Science",
            "Media Studies and Communication",
            "Medicine, Health and Social Studies",
            "Pedagogics",
            "Social Sciences and Psychology",
            "Sport Sciences",
            "Teacher Education",
            "Technology, Engineering and Architecture",
        ],
        required: true,
        min: 1,
    },
    open: {
        type: Boolean,
        required: true,
    },
    matched: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('jobs', jobSchema);