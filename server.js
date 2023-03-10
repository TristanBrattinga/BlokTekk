const express = require('express');
const chalk = require('chalk');
const app = express();
const port = 8080;
require('dotenv').config();
console.log(process.env);

console.log(chalk.blue('Hello'),chalk.magenta('World!')); // DIT IS EEN CHECK VOOR CHALK

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'views');

// Here I'll make an object to shove into the homepage view

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

const genres = ["Drum & Bass", "Pop", "Rap", "Tech-House", "Old School Hip Hop"];

app.get('/', (req, res) => {
  res.render('index', {message: 'Hi, how are you doing?'})
});

app.get('/users', (req, res) => {
  res.render('userlist', {title: 'All users', users})
});

app.get('/users/:userName', (req, res) => {
  const user = users.find(user => user.name == req.params.userName);
  res.render('userdetails', {title: `User details for ${user.name}`, user})
});

app.get('/register', (req, res) => {
  res.render('register', {title: 'Sign up here', genres})
});

app.post('/users', (req, res) => {
  let user = {name: req.body.name, age: req.body.age, gender: req.body.gender, genres: req.body.genres};
  console.log(req.body.genres);
  users.push(user);
  res.render('userlist', {title: 'Succesfully registered user', users})
});


app.get('/*', (req, res) => {
  res.status(404).send('Sorry, the page you are looking for was not found.');
});

async function connectDB(){
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = process.env.DB_CONNECTION_STRING;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  try {
    console.log('awaiting connection');
    await client.connect();
    console.log('connected');
    db = client.db('Testdb');
  }
  catch(error){
    console.error(error);
    throw error;
  }
};


app.listen(port, async () => {
  console.log(chalk.green(`My new first server hosted on port ${port}!`));
  let databaseConnection = await connectDB();
  let theData = await db.collection('collection1').find({}).toArray();
  console.log(theData);
});

