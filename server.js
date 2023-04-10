/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

/**========================================================================
 *                       Requiring seperate routes
 *========================================================================**/

/**========================================================================
 *                      Requiring mongoose models
 *========================================================================**/

const { User } = require('./models/userModel');

/**========================================================================
 *                  Defining and connection to database
 *========================================================================**/

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}${process.env.DB_URI}`;

async function main () {
  await mongoose.connect(uri, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('Succesfully connected');
}
main().catch((err) => console.log(err));

/**========================================================================
 *                           Middleware
 *========================================================================**/

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**========================================================================
 *                           Templating
 *========================================================================**/

app.set('view engine', 'ejs');

/**========================================================================
 *                           Sessions
 *========================================================================**/

const sessionSecret = process.env.SESSION_SECRET;
const store = new MongoDBStore({
  uri,
  collection: process.env.DB_COLLECTION_SESSIONS
});

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  store
}));

/**========================================================================
 *                           Routing
 *========================================================================**/

/**----------------------
 *    Home Page
 *------------------------**/
app.use('/', (req, res) => {
  res.render('pages/index');
});

// /**----------------------
//  *    Home Page
//  *------------------------**/
// app.use('/profile', profileRouter);

// /**----------------------
//  *    Home Page
//  *------------------------**/
// app.use('/profile', profileRouter);

// /**----------------------
//  *    Home Page
//  *------------------------**/
// app.use('/profile', profileRouter);

// /**----------------------
//  *    Home Page
//  *------------------------**/
// app.use('/profile', profileRouter);

// /**----------------------
//  *    Home Page
//  *------------------------**/
// app.use('/profile', profileRouter);

/**========================================================================
 *                           404 Error Handler
 *========================================================================**/

app.use((req, res) => {
  res
    .status(404)
    .send(
      'We`re sorry, we were not able to find the page you were looking for'
    );
});

/**========================================================================
 *                           Start Webserver
 *========================================================================**/

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
