const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//job schema
const Job = new Schema({
    course: {
        type: String,
        required: true,
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
            "Technology, Engineering and Architecture"
        ],
    },
    apply: {
        type: Number,
        default: 0
    }
});

const JobModel = mongoose.model('jobs', Job);
module.exports = JobModel;