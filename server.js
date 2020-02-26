// Imports
const express = require('express')
const path = require('path')

// Init app
const app = express()

// Display static site
app.use(express.static('public'))

// Start server
app.listen(8080)
