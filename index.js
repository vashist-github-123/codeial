const express = require('express');

const app = express();

const port = 8000;


app.listen(port, function(err){

    if (err){
        console.log(`There is a server error: ${err}`);
    }

    console.log(`Server running fine:${port}`);
});