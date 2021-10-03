require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const encrypt = require("mongoose-encryption");
const md5 = require("md5");

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
    .post(function(req, res){
        const newUser = new User({
            email: req.body.username,
            password: md5(req.body.password)
        });
        newUser.save(function(err){
            if (!err){
                res.render("secrets");
            } else {
                console.log(err);
            }
        });    
    })
;
app.route("/login")
    .get(function(req, res){    
        res.render("login");    
    })
    .post(function(req, res){
        const username = req.body.username;
        const password = md5(req.body.password);
        User.findOne({email: username}, function(err, foundUser){
            if(err){
                console.log(err);
            } else {
                if (foundUser){
                    if (foundUser.password === password){
                        res.render("secrets");
                    }
                }
            }
        });
    });
    
;

app.listen(3000, function(){
    console.log("Server Started Successfully");
});