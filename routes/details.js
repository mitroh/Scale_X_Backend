const express = require("express");
const app = express();
const router = express.Router();
const DexSchema = require("../model/Main");

//CREATE
router.post("/create", async (req, res) => {
  try {
    const newPost = new DexSchema(req.body);
    console.log(req.body);
    console.log(newPost);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await DexSchema.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await DexSchema.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POSTS
router.get("/:id", async (req, res) => {
  try {
    const post = await DexSchema.findById(req.params.id)
      .select({ volume: 1, priceUsd: 1 })
      // .select("volume priceUsd -volume._id")
      .exec();
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("", async (req, res) => {
  try {
    const post = await DexSchema.find()
      .select({ volume: 1, priceUsd: 1 })
      .exec();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
