const mongoose = require("mongoose");

const SubtasskSchema = new mongoose.Schema({
    completed: { type: Boolean, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    projectId: { type: String, required: true },
    finishDate: { type: Date, required: false },
})


module.exports = mongoose.model('Subtask', SubtasskSchema )