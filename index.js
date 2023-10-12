const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const app = express();


app.engine('hbs', handlebars.engine({extname: 'hbs'}));

app.listen(5000,() => console.log('Server is running on port 5000...'));
// static folder that contains all assets like CSS or Images
app.use(express.static('public'));
// middleware that parses the body after sent form 
app.use(express.urlencoded({extended: false}));

app.use(routes);