const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");

router.get("/:id", (req, res) => {
  console.log("IN GET ALLLLL");
  Collection.find({ user_id: req.params.id }, (err, items) => {
    if (!err) {
      res.send(items);
    } else {
      res.status(500).json({ err });
    }
  }).catch(err => console.log(err));
});

router.post("/", (req, res) => {
  Collection.findOne({ title: req.body.title }, (err, album) => {
    if (album) {
      res.json({
        type: "error",
        message: "This album already exists in database!"
      });
    } else {
      let collection = new Collection({
        user_id: req.body.id,
        title: req.body.title,
        artist: req.body.artist,
        image: req.body.image,
        year: req.body.year,
        label: req.body.label,
        genre: req.body.genre,
        isTrade: false
      });
      collection.save((err, collection) => {
        if (err) {
          res.json({ type: "error", message: "Database Error adding album" });
        } else {
          res.json(collection);
        }
      });
    }
  }).catch(err => console.log(err));
});

router.post("/trade", (req, res) => {
  console.log(req.body.id);
  // Collection.findByIdAndUpdate(
  //   req.body.id,
  //   {
  //     $set: {
  //       isTrade: true
  //     }
  //   },
  //   { new: true },
  //   (err, album) => {
  //     if (err) console.log("ERROR: ====>", err);
  //   }
  // ).catch(err => console.log(err));
});

router.get("/delete/:id", (req, res) => {
  Collection.deleteOne({ _id: req.params.id }, err => {
    console.log(err);
    res.json(err);
  }).catch(err => console.log(err));
});

module.exports = router;
