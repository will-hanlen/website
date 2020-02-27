// Imports
const express = require('express')
const path = require('path')

// Init app
const app = express()

// Display static site
app.use(express.static('public'))

// Short url routing
app.get(/^\/([0-9a-zA-Z\-\_]+)$/, function(req, res) {
  // res.send(req.params)
  res.sendFile(`${req.params[0]}.html`, {root: path.join(__dirname, "public", "writing")})
})

// Image url simplification
app.get(/^\/([0-9a-zA-Z\-\_]+)\.svg$/, function(req, res) {
  // res.send(req.params)
  res.sendFile(`${req.params[0]}.svg`, {root: path.join(__dirname, "public", "writing")})
})

// Start server
app.listen(8080)
