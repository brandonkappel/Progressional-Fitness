const mongoose = require('mongoose');

const workoutItemSchema = mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  comments: {type: String},
  // creator: {type: mongoose.Schema.Types.ObjectId, ref: "User",  require: true }
});

module.exports = mongoose.model('WorkoutItem', workoutItemSchema);
