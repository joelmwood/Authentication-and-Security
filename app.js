const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const encrypt = require("mongoose-encryption");

const app = express();

app.use(express.static("public"));
app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin-joel:Test123@cluster0.x17z2.mongodb.net/usersDB", {
  useNewUrlParser: true
});

const userSchema = ({
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.get


app.listen(3000, function(){
    console.log("Server Started Successfully");
})