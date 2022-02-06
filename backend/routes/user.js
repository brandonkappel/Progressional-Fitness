const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authUser, authRole} = require("../middleware/check-auth")


const User = require("../models/user");

const router = express.Router();

//Create
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});


router.post("/login", (req, res, next) => {
  console.error('hello')
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(402).json({
          message: "Auth Failed",
        });
      }
      fetchedUser = user
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(402).json({
          message: "Auth Failed",
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        role: fetchedUser.role
      });
    })
    .catch((err) => {
      return res.status(402).json({
        message: "Auth Failedddd",
      });
    });
});

//Read
router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const userQuery = User.find();
  let fetchedUsers;
  if (pageSize && currentPage) {
    userQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  userQuery
    .then((documents) => {
      fetchedUsers = documents;
      return User.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: fetchedUsers,
        maxUsers: count,
      });
    });
});

router.post("/newUser", authUser, (req, res, next) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role
    });

    user.save().then((createdUser) => {
      res.status(201).json({
        message: "User Added Successfully",
        userId: createdUser._id,
      });
    });
  }
);

//Update
router.put(
  "/:id", authUser, authRole(),
  (req, res, next) => {
    console.error(req)
  const user = new User({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role
  });
  User.updateOne({ _id: req.params.id }, user).then((result) => {
    console.error(result)
    if(result.nModified > 0) {
    res.status(200).json({ message: "Update Successful" });
    } else {
    res.status(401).json({ message: "Not Authorized" });
    }
  });
});

// Update specific
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  });
});

//Delete
router.delete("/:id",  (req, res, next) => {
  User.deleteOne({ _id: req.params.id}).then((result) => {
    console.error(result)
    if(result.n > 0) {
      res.status(200).json({ message: "Deletion Successful" });
      } else {
      res.status(401).json({ message: "Not Authorized" });
      }
  });
});

module.exports = router;
