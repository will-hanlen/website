// Imports
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

// Init app
const app = express()

// Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'assets', 'favicon.png')))

// Display static site
app.use(express.static('public'))

// Start server
app.listen(8080)
