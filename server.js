/*
 * Write your server-side JS code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Everett Goldfarb
 * Email: goldfare@oregonstate.edu
 */
var express = require('express')
require('dotenv').config()

var fs = require('fs')
var port = process.env.PORT || 8000
var app = express()
var postData = require("./postData.json")
app.set("view engine", "ejs")

app.use(express.static('static'))

app.use(function(req, res, next) {
    console.log("Method: " + req.method + ", Requested url: " + req.url)
    next()
})

app.get('/', function(req, res) {
    res.status(200).render("index", {
        posts: postData
    })
})

app.get('/posts/:post', function (req, res, next) {
    var thisPost = req.params.post
    var thisPostData = postData[thisPost-1]
    if (thisPostData) {
        res.status(200).render('itemview', {
            city: thisPostData.city,
            description: thisPostData.description,
            price: thisPostData.price,
            photoUrl: thisPostData.photoUrl,
            condition: thisPostData.condition
        })
    } else {
        next()
    }
})

app.get("/*splat", function (req, res, next) {
    res.status(404).render("404")
})

app.listen(port, function (err) {
    if (err) {
        throw err
    }
    console.log("== Server listening on port:", port)
})