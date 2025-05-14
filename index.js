const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

// db
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@learning.jizv1xw.mongodb.net/?retryWrites=true&w=majority&appName=learning`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // collection create
    const database = client.db("sushidb");
    const sushiCollection = database.collection("sushi");

    // GET- All sushi
    app.get("/sushi", async (req, res) => {
      const cursor = sushiCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // POST - Add new sushi
    app.post("/sushi", async (req, res) => {
      console.log("Data received on server:", req.body);
      const newSushi = req.body;
      const result = await sushiCollection.insertOne(newSushi);
      res.send(result);
    });

    // DELETE - A  sushi
    app.delete("/sushi/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await sushiCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
