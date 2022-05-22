const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bfbpp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run(){
    try{
        await client.connect();


    }
    finally{

    }
}

run();

app.get('/',(req,res)=>{
    res.send("Hello world from my website");
});

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});