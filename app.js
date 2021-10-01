const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const encrypt = require("mongoose-encryption");

const app = express();