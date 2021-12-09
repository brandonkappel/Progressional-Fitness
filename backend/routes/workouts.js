const express = require("express");
const {authUser} = require("../middleware/check-auth")

const router = express.Router();

const Workout = require("../models/workout");

router.post("",authUser,(req, res, next) => {
  console.error(req)
    const workout = new Workout({
      date: req.body.date,
      name: req.body.name,
      creator: req.userData.userId,
      // client: req.userData.userId
    });

    workout.save().then((createdWorkout) => {
      res.status(201).json({
        message: "Workout Added Successfully",
        workoutId: createdWorkout._id,
      });
    });
  }
);

router.put("/:id",authUser,(req, res, next) => {
  const workout = new Workout({
    _id: req.body.id,
    date: req.body.date,
    name: req.body.name,
    creator: req.userData.userId,
    // client: req.userData.userId
  });
  Workout.updateOne({ _id: req.params.id, creator: req.userData.userId }, workout).then((result) => {
    if(result.nModified > 0) {
    res.status(200).json({ message: "Update Successful" });
    } else {
    res.status(401).json({ message: "Not Authorized" });
    }
  });
});

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const workoutQuery = Workout.find();
  let fetchedWorkouts;
  if (pageSize && currentPage) {
    workoutQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  workoutQuery
    .then((documents) => {
      fetchedWorkouts = documents;
      return Workout.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Workouts fetched successfully!",
        posts: fetchedWorkouts,
        maxPosts: count,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Workout.findById(req.params.id).then((workout) => {
    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json({ message: "workout not found" });
    }
  });
});

router.delete("/:id", authUser, (req, res, next) => {
  Workout.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then((result) => {
    console.error(result)
    if(result.n > 0) {
      res.status(200).json({ message: "Deletion Successful" });
      } else {
      res.status(401).json({ message: "Not Authorized" });
      }
  });
});

module.exports = router;
