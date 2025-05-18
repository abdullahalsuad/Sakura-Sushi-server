const { ObjectId } = require("mongodb");
const {
  getAllSushi,
  getSingleSushi,
  createSushi,
  deleteSushi,
} = require("../models/sushiModel");

// Controller to fetch all sushi items.
const getSushi = async (req, res) => {
  try {
    const sushi = await getAllSushi();
    res.json(sushi);
  } catch (err) {
    res.status(500).json({ error: "Failed to get sushi" });
  }
};

// Controller to fetch single sushi items
const singleSushi = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getSingleSushi(id);

    if (!result) {
      return res.status(404).json({ message: "Sushi not found." });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to get single sushi" });
  }
};

// Controller to create sushi
const addSushi = async (req, res) => {
  try {
    const result = await createSushi(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed create  sushi" });
  }
};

// Controller to delete sushi
const removeSushi = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSushi(new ObjectId(id));

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Sushi not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed delete  sushi" });
  }
};

module.exports = {
  getSushi,
  singleSushi,
  addSushi,
  removeSushi,
};
