let sushiCollection;

// Injects the MongoDB database connection into this module.
async function injectDB(db) {
  sushiCollection = db.collection("users");
}

// Fetches all sushi items from the database.
const getAllSushi = async () => {
  const result = await sushiCollection.find().toArray();
  return result;
};

// Fetches single sushi items by its id.
const getSingleSushi = async (id) => {
  const result = await sushiCollection.findOne({ _id: id });
  return result;
};

// Create new sushi in the database
const createSushi = async (sushi) => {
  const result = await sushiCollection.insertOne(sushi);
  return result;
};

// Update sushi
const updateSushi = async (id, updatedData) => {
  const result = await sushiCollection.updateOne(
    { _id: id },
    { $set: updatedData },
    { upsert: false } // or true if you want to insert if not found
  );
  return result;
};

// Delete a sushi by its id
const deleteSushi = async (id) => {
  const result = await sushiCollection.deleteOne({ _id: id });
  return result;
};

module.exports = {
  injectDB,
  getAllSushi,
  getSingleSushi,
  createSushi,
  updateSushi,
  deleteSushi,
};
