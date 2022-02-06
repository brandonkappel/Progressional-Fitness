const express = require("express");
const {authUser} = require("../middleware/check-auth")

const router = express.Router();

const WorkoutItem = require("../models/workoutItem");

router.post("",authUser,(req, res, next) => {
  // console.error(req.body)
  let items = req.body
WorkoutItem.insertMany(items).then((createdWorkoutItem) => {
  res.status(201).json(createdWorkoutItem);
});

    // const workoutItem = new WorkoutItem({
    //   name: req.body.name,
    //   description: req.body.description,
    //   comments: req.body.comments,
    //   workout: req.body.workout,
    //   // client: req.userData.userId
    // });

    // workoutItem.save().then((createdWorkoutItem) => {
    //   res.status(201).json({
    //     message: "Workout Item Added Successfully",
    //     workoutItemId: createdWorkoutItem._id,
    //   });
    // });
  }
);

router.put("",authUser,(req, res, next) => {
  // console.error(req.body)
  const workoutItems = []
  req.body.forEach(item => {
    workoutItems = new WorkoutItem({
      _id: item.id,
      name: item.name,
      description: item.description,
      comments: item.comments,
      workout: item.workout? item.workout : null
    });
  })
  console.error(workoutItems)
  WorkoutItem.updateMany({ _id: { $in: [workoutItems._id] } }, workoutItems).then((result) => {
    // console.error(result)
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
       workoutItems: item
     })
   }
 })

});

router.get("/:id", (req, res, next) => {
  console.error(req.params.id)
  let workoutId = req.params.id
  WorkoutItem.find({workout: workoutId}).then((item) => {
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
