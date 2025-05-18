const express = require("express");
const router = express.Router();

const {
  getSushi,
  singleSushi,
  addSushi,
  removeSushi,
} = require("../controllers/sushiController");

//  GET all sushi or POST new sushi
// router.route("/sushi").get(getSushi).post(addSushi);

// GET single sushi, DELETE sushi
// router.route("/sushi/:id").get(singleSushi).delete(removeSushi);

// GET all sushi
router.get("/sushi", getSushi);

// POST new sushi
router.post("/sushi", addSushi);

// GET single sushi
router.get("/sushi/:id", singleSushi);

// DELETE sushi
router.delete("/sushi/:id", removeSushi);

module.exports = router;
