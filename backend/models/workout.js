const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  date: {type: Date},
  name: {type: String, required: true},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  // client: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model('Workout', workoutSchema);
