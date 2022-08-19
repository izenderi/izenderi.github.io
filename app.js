const express = require('express');
const http = require('http');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

var index = require('./index.js');

app.get('/', index.view);

app.listen(3000);