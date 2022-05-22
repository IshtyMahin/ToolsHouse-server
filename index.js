const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfbpp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});



async function run() {
  try {
    await client.connect();
    const userCollection = client.db("assignment12").collection("users");

    

      app.put("/user/:email", async (req, res) => {
        const email = req.params.email;
        const user = req.body;
        const filter = { email: email };
        const options = { upsert: true };
        const updateDoc = {
          $set: user,
        };
        const result = await userCollection.updateOne(filter, updateDoc, options);
        const token = jwt.sign(
          { email: email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        res.send({ result });
      });
  } finally {
  }
}

run();

app.get("/", (req, res) => {
  res.send("Hello world from my website");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
