const express = require('express');
const app = express();
const port = 8080;

app
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


app.listen(port, () => {
  console.log(`My new first server hosted on port ${port}!`)
});



// Here we'll make an object to shove into the homepage view

const users = [
  {
    name: 'Tristan',
    age: '23',
    gender: 'Male',
    genres: ["Drum & Bass", "Rap", "Old School Hip Hop"]
  },
  {
    name: 'Serena',
    age: '24',
    gender: 'Female',
    genres: ["Pop", "Drum & Bass", "Rap", "Tech-House"]
  }
];

app.get('/users', (req, res) => {
  res.render('userlist', {title: 'All users', users})
});

app.get('/users/:userName', (req, res) => {
  const user = users.find(user => user.name == req.params.userName);
  res.render('userdetails', {title: `User details for ${user.name}`, user})
});


app.get('/*', (req, res) => {
  res.status(404).send('Sorry, the page you are looking for was not found.');
});