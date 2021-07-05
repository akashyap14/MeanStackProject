const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const postRoutes = require('./routes/posts');

mongoose.connect("mongodb+srv://akashyap14:zrBc0M6u4gxZ91vR@cluster0.riw3w.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(()=>{
        console.log("Connected successfully");
    })
    .catch(()=>{
        console.log("Connection failed!")
    })

const Post = require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/api/posts',postRoutes)

module.exports = app;


