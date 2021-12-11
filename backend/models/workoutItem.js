const mongoose = require('mongoose');

const workoutItemSchema = mongoose.Schema({
  name: {type: String, },
  description: {type: String, },
  comments: {type: String},
  // creator: {type: mongoose.Schema.Types.ObjectId, ref: "User",  require: true }
});

module.exports = mongoose.model('WorkoutItem', workoutItemSchema);
