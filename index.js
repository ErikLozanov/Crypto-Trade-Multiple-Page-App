const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const {authentication} = require('./middlewares/authMiddleware');

const app = express();


app.engine('hbs', handlebars.engine({extname: 'hbs'}));

app.set('view engine', 'hbs');

// static folder that contains all assets like CSS or Images
app.use(express.static('public'));
// middleware that parses the body after sent form 
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/crypto')
.then(() => console.log('DB Connected Successfully!'))
.catch((err) => console.log(err.message));

app.listen(5000,() => console.log('Server is running on port 5000...'));