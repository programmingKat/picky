require('dotenv').config()

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const { ObjectId, ServerApiVersion } = require('mongodb')

let port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;
//let configDB = require('./config/.env');
let db

// config ~ connect to the database

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function runStableAPIConnect() {
  //try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const result = await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
    db = client.db(process.env.DBNAME)
    require('./app/routes.js')(app, db, ObjectId);
    return result;
//   } 
//   finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }

}
runStableAPIConnect().catch(console.dir);


// MongoClient.connect(configDB.url, 
//     {}, 
//     (error, client) => {
//     if (error) {
//         throw error;
//     }
//     db = client.db(dbName);
//     console.log("Connected to `" + dbName + "`!");
//     require('./app/routes.js')(app, db, ObjectID);
// });

// mongoose.connect(configDB.url)
//     .then((err, database) => {
//         console.log(err)
//         db = database
//         console.log(db)
//         console.log('database connected')
//         require('./app/routes.js')(app, db, ObjectID);
//     }
//     )
//     .catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(port);
console.log('Port is running on ' + port);