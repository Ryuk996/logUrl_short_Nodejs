const express= require('express')
const app = express();
require('dotenv').config()
const cors = require('cors')
const mongodb = require('mongodb');
const mongoose = require('mongoose')


// const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3002;

app.use(cors({
    origin: "*"
  }))
  //middleware
  app.use(express.json())
  
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-  With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods","POST,PUT,GET,DELETE")
//   next();   
// });
  // app.use(bodyParser.urlencoded({extended:true}))

  // Routes
app.use('/user', require('./Routes/userRoutes'))

app.use('/url', require('./Routes/urlRoutes'))

  // Connect to mongodb
const URL = process.env.MongoDb_url
mongoose.connect(URL, {
    // useCreateIndex: true,
    // useFindAndModify: false
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

// showUrlid: async (req,res) => {
//   try {
//       console.log(req.params.url.urlId)
//       // let urlData =await Users.findOne({shorturlLink :req.param.urlid} )
//       // console.log(urlData)
//       // res.redirect(urlData.urlLink)
//   } catch (error) {
//       res.status(500).json({msg:"internal server error"})
//   }
// }

app.use('http://localhost:3000/login',(req,res,next) => {
    res.json({msg:"hello all"})
}) 
  app.listen(PORT,function(){
    console.log(`The app is listening in port ${PORT}`)
})