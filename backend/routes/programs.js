const express = require("express");
const {authUser} = require("../middleware/check-auth")

const router = express.Router();

const Program = require("../models/program");

router.post("",authUser,(req, res, next) => {
    const program = new Program({
      name: req.body.name,
      description: req.body.description,
      // workouts:
      // client: req.userData.userId
    });

    program.save().then((createdProgram) => {
      res.status(201).json({
        message: "Program Added Successfully",
        programId: createdProgram._id,
      });
    });
  }
);

router.put("/:id",authUser,(req, res, next) => {
  const program = new Program({
    _id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    // workout:
    // client: req.userData.userId
  });
  Program.updateOne({ _id: req.params.id }, program).then((result) => {
    if(result.nModified > 0) {
    res.status(200).json({ message: "Update Successful" });
    } else {
    res.status(401).json({ message: "Not Authorized" });
    }
  });
});

router.get("", (req, res, next) => {
 Program.find().then((program)=> {
   if(program){
     res.status(200).json({
       message: "Programs found",
       programs: program
     })
   }
 })

});

router.get("/:id", (req, res, next) => {
  Program.findById(req.params.id).then((program) => {
    if (program) {
      res.status(200).json(program);
    } else {
      res.status(404).json({ message: "program not found" });
    }
  });
});

router.delete("/:id", authUser, (req, res, next) => {
  Program.deleteOne({ _id: req.params.id}).then((result) => {
    if(result.n > 0) {
      res.status(200).json({ message: "Deletion Successful" });
      } else {
      res.status(401).json({ message: "Not Authorized" });
      }
  });
});

module.exports = router;
