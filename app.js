require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { initialize } = require('passport');

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");

const app = express();

//TEST TO LOG VARIABLE FROM .ENV
// console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://admin-joel:Test123@cluster0.x17z2.mongodb.net/usersDB", {
  useNewUrlParser: true
});
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

//MD5 ENCRYPTION 
//userSchema.plugin(encrypt,  {secret: process.env.SECRET, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.route("/")
    .get(function(req, res){    
        res.render("home");    
    })
;

app.route("/secrets")
    .get(function(req, res){
        if (req.isAuthenticated()) {
            res.render("secrets");
        } else {
            res.redirect("/login");
        }
    });
;

app.route("/register")
    .get(function(req, res){    
        res.render("register");    
    })
    .post(function(req, res){
        User.register({username: req.body.username}, req.body.password, function(err, username){
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });
            }
        });
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
        const user = new User ({
            username: req.body.username,
            password: req.body.password
        });

        req.login(user, function(err){
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/secrets");
                });
            }
        });
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

app.route("/logout")
    .get(function(req, res){
        req.logOut();
        res.redirect("/");
    })
;

app.listen(3000, function(){
    console.log("Server Started Successfully");
});