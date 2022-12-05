const express = require("express");
const path = require("path");
const app = express();
const  mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/signupDance', {useNewUrlParser: true});
const port = 8000;

//Define mongoose schema
const signupSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Signup = mongoose.model('Signup', signupSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))// For serving static file
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')// Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// Set the views directory

//ENDPOINTS
app.get('/', (req, res)=>{
    const params ={}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res)=>{
    const params ={}
    res.status(200).render('contact.pug', params);
});

app.get('/signup', (req, res)=>{
    const params ={}
    res.status(200).render('signup.pug', params);
});

app.post('/signup', (req, res)=>{
    var myData = new Signup(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    //  res.status(200).render('signup.pug');
});

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});