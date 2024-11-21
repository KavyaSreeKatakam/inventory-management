var express = require('express');
var router = express.Router();
const app = express();
const { ObjectId } = require('mongodb');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const multer = require("multer");
const upload = multer({dest: "./uploads/"});
const fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add/:num1/and/:num2', (req,res)=>{
  res.json({"Addition" : parseInt(req.params.num1) + parseInt(req.params.num2)});

});

const {MongoClient} = require("mongodb")

const client = new MongoClient("mongodb://localhost:27017");

const getConnection = async  () => { 
  console.log("here");
    try{
        await client.connect()
        console.log("connected successfully");
    }
    catch(err){
      console.log("errror while connecting",err)
    }
}
const collection = client.db("inventoryManagement").collection("inventoryTable"); 
const getRecords = async () => {
  getConnection();
    const result =  collection.find({}).toArray(function(err, docs) {
        console.log('Found the following documents:');
        console.log(docs);
      });
    return result;


}

app.listen(async ()=>{
    console.log("router listen");
    await getConnection();
})

router.get('/Inventory/getInventoryData', (req,res)=>{
  var x;
  getRecords()
  .then((result) => res.json(result));

});

router.post('/Inventory/updateInventoryData', async (req, res) => {

  try{
    const options = { upsert:false};
    const query = {"_id": new ObjectId(req.body.id)};
    const newValues = {$set: {"name": req.body.name, "quantity": req.body.quantity}};
    await client.db("inventoryManagement").collection("inventoryTable").updateOne( query,  newValues, options );

  }
  catch(error){
    console.log(error);
  }

  res.send("200")
});

router.use('/uploads', express.static('uploads'));

router.post("/uploadFile", upload.single("image"), (req, res) => {
  let fileType = req.file.mimetype.split("/")[1];
  let newFilename = req.file.filename + "." + fileType;
  fs.rename(`./uploads/${req.file.filename}`, `./uploads/${newFilename}`,  async function(){
    console.log("200");
   await collection.insertOne({ name: req.body.name, quantity: req.body.quantity, image: `./uploads/${newFilename}`}, function(err, result) {
      if (err) {
        console.error('Error uploading file to MongoDB', err);
        return;
      }
    });
  });
  res.send("200")
})


router.delete('/Inventory/deleteInventoryData/:id', async (req, res) => {
  try{
    const query = {"_id": new ObjectId(req.params.id)};
    console.log("id i router", query);
    await client.db("inventoryManagement").collection("inventoryTable").deleteOne( query );

  }
  catch(error){
    console.log(error);
  }

  res.send("200")
});

// Signup and Login Page details

const userCollection = client.db("loginDB").collection("usersTable"); 
const getUserRecords = async () => {
  getConnection();
    const result1 =  await userCollection.find({}).toArray();
    return result1;
}

router.get('/getUsersData', (req,res)=>{
  var x;
  getUserRecords()
  .then((result) => res.json(result));

});


const getLoginUserRecords = async (userName, password) => {
  getConnection();
  const result1 = await userCollection.find({
    userName: userName ,
    password: password
  }).toArray();
    return result1;
}

router.get('/getLoginUsersData/:userName/:password', async (req, res) => {
  var result = [];
  try {
    result = await getLoginUserRecords(req.params.userName, req.params.password);
    if (result.length > 0) {
      res.json({ resStatus: "success", data: result });
    } else if (result.length === 0) {
      res.json({ resStatus: "failure", data: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});


router.post('/addUser', async (req, res) => {
  try{
    await userCollection.insertOne(req.body);
  }
  catch(error){
    console.log(error);
  }
  res.send("200")
});



const getProfileUserRecords = async (user) => {
  getConnection();
  const result1 = await userCollection.find({
    userName: user
  }).toArray();

    console.log("result", result1);
    return result1;
}

router.get('/getProfileUserRecords/:user', (req,res)=>{
  var x;
  getProfileUserRecords(req.params.user)
  .then((result) => res.json(result));

});

module.exports = router;


