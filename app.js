const express = require('express')
const path = require('path')
const app = express()
  
// View Engine Setup
app.set('views', path.join(__dirname, './'))
app.set('view engine', 'ejs')

// Try to link up static css to html
app.use(express.static(path.join(__dirname, 'assets')))
// app.use('/css', express.static(path.join(__dirname, 'assets/css')))
  
app.get('/', function(req, res){
    // Rendering our web page i.e. Demo.ejs
    // and passing title variable through it
    res.render('index')
})
  
app.listen(8080, function(error){
    if(error) throw error
    console.log("Server created Successfully. Listening on 8080")
})