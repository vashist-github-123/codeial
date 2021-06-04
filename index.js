const express = require('express');
const { use } = require('./routes');

const app = express();

const port = 8000;

//use express router

app.use('/', require('./routes'));


app.listen(port, function(err){

    if (err){
        console.log(`There is a server error: ${err}`);
    }

    console.log(`Server running fine:${port}`);
});