const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()


const port = process.env.PORT || 5000

// middleware

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://bistroUser:JnP6VBsyUJLK5Jy1@cluster0.un1xhdi.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const menuCollection = client.db("bistroDB").collection("menu");


    app.get('/menu', async (req, res) => {
      const menuServer = await menuCollection.find().toArray();
      res.send(menuServer);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Bistro boss is .....')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})