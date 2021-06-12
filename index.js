const express = require('express');

const cookieParser = require('cookie-parser');
const { use } = require('./routes');

const app = express();

const port = 8000;

//we will require express ejs layout

const expressLayout = require('express-ejs-layouts');

const db = require('./config/mongoose');

// reading through the post request

app.use(express.urlencoded());

// using cookie parser middleware

app.use(cookieParser());

//include static files. Setting which folder it will look the files

app.use(express.static('./assets'));

app.use(expressLayout);

// extract style and script from subpages into the layout

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




//use express router

app.use('/', require('./routes'));


//set up the view engine

app.set('view engine', 'ejs');

app.set('views', './views');



app.listen(port, function(err){

    if (err){
        console.log(`There is a server error: ${err}`);
    }

    console.log(`Server running fine:${port}`);
});