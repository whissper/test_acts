var express		= require('express');
var actsRouter  = require('./ActsRouter');

var backend = express();

//to serve static files such as images, CSS files, and JavaScript files
backend.use('/acts', express.static('frontend'));
//mount route handler
backend.use('/acts', actsRouter);

backend.listen(3003, () => {
    console.log('new test backend is listening on port 3003!');
});