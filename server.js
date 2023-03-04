const express = require('express');
const app = express();
const port = 8080;


app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');


app.get('/', (req, res) => {
  res.render('index', {message: 'Hi, how are you doing?'})
});

app.get('/register', (req, res) => {
  res.render('register', {welcomemessage: 'Hello Tristan, I hope u have a beautiful day!'})
});

app.get('/login', (req, res) => {
  res.render('login', {check: 'Hoi DiT WErkt Nu wEl'})
});

app.get('/*', (req, res) => {
  res.status(404).send('Sorry, the page you are looking for was not found.');
});

app.listen(port, () => {
  console.log(`My new first server hosted on port ${port}!`)
});



// Here we'll make an object to shove into the homepage view

var userList = [
  {
    Name: 'Tristan',
    Age: '23',
    Gender: 'Male',
    Genres: ["Drum & Bass", "Rap", "Old School Hip Hop"]
  },
  {
    Name: 'Serena',
    Age: '24',
    Gender: 'Female',
    Genres: ["Pop", "Drum & Bass", "Rap", "Tech-House"]
  }
];