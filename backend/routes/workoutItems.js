const express = require("express");
const {authUser} = require("../middleware/check-auth")

const router = express.Router();

const WorkoutItem = require("../models/workoutItem");

router.post("",authUser,(req, res, next) => {
    const workoutItem = new WorkoutItem({
      name: req.body.name,
      description: req.body.description,
      comments: req.body.comments,
      // workouts:
      // client: req.userData.userId
    });

    workoutItem.save().then((createdWorkoutItem) => {
      res.status(201).json({
        message: "Workout Item Added Successfully",
        workoutItemId: createdWorkoutItem._id,
      });
    });
  }
);

router.put("/:id",authUser,(req, res, next) => {
  const workoutItem = new WorkoutItem({
    _id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    comments: req.body.comments,
    // client: req.userData.userId
  });
  WorkoutItem.updateOne({ _id: req.params.id }, workoutItem).then((result) => {
    if(result.nModified > 0) {
    res.status(200).json({ message: "Update Successful" });
    } else {
    res.status(401).json({ message: "Not Authorized" });
    }
  });
});

router.get("", (req, res, next) => {
 WorkoutItem.find().then((item)=> {
   if(item){
     res.status(200).json({
       message: "Programs found",
       workoutItem: item
     })
   }
 })

});

router.get("/:id", (req, res, next) => {
  WorkoutItem.findById(req.params.id).then((item) => {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Workout item not found" });
    }
  });
});

router.delete("/:id", authUser, (req, res, next) => {
  WorkoutItem.deleteOne({ _id: req.params.id}).then((result) => {
    if(result.n > 0) {
      res.status(200).json({ message: "Deletion Successful" });
      } else {
      res.status(401).json({ message: "Not Authorized" });
      }
  });
});

module.exports = router;
