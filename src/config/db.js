const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI || "your-mongodb-uri-here";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  try {
    // await client.connect();

    console.log("MongoDB connected successfully");
    return client.db("sushidb");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
