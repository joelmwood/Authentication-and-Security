require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");

const app = express();

console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin-joel:Test123@cluster0.x17z2.mongodb.net/usersDB", {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

//MD5 ENCRYPTION 
//userSchema.plugin(encrypt,  {secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);

app.route("/")
    .get(function(req, res){    
        res.render("home");    
    })
;

app.route("/register")
    .get(function(req, res){    
        res.render("register");    
    })
    //--------------BCRYPT ENCRYPTION--------------  
    // .post(function(req, res){
    //     bcrypt.hash(req.body.password, saltRounds, function(err, hash){
    //         const newUser = new User({
    //             email: req.body.username,
    //             password: hash
    //         });
    //         newUser.save(function(){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 res.render("/secrets");
    //             }
    //         });
    //     });
    // });
    //--------------------MD5 ENCRYPTION-----------------
    // .post(function(req, res){
    //     const newUser = new User({
    //         email: req.body.username,
    //         password: md5(req.body.password)
    //     });
    //     newUser.save(function(err){
    //         if (!err){
    //             res.render("secrets");
    //         } else {
    //             console.log(err);
    //         }
    //     });    
    // })
;
app.route("/login")
    .get(function(req, res){    
        res.render("login");    
    })
    .post(function(req, res){

    })
    //---------------BCRYPT ENCRYPTION----------------------
    // .post(function(req, res){
    //     const username = req.body.username;
    //     const password = req.body.password;

    //     User.findOne({email: username}, function(err, foundUser){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             if (foundUser) {
    //                 bcrypt.compare(password, foundUser.password, function(err, result){
    //                     if (result === true ){
    //                         res.render("/secrets");
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // })
    //-------------------MD5 ENCRYPTION----------------------
    // .post(function(req, res){
    //     const username = req.body.username;
    //     const password = md5(req.body.password);
    //     User.findOne({email: username}, function(err, foundUser){
    //         if(err){
    //             console.log(err);
    //         } else {    
    //             if (foundUser){
    //                 if (foundUser.password === password){
    //                     res.render("secrets");
    //                 }
    //             }
    //         }
    //     });
    // });
    
;

app.listen(3000, function(){
    console.log("Server Started Successfully");
});