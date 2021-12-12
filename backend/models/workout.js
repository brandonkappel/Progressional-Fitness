const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
  date: {type: Date},
  name: {type: String, },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  // workoutItems: {type: mongoose.Schema.Types.ObjectId, ref: "WorkoutItem"}
  client: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model('Workout', workoutSchema);
