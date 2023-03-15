const express = require("express");
const chalk = require("chalk");
// const bcrypt = require("bcrypt");
const slug = require("slug");
const app = express();
const port = 8080;
require("dotenv").config();

console.log(chalk.blue("Hello"), chalk.magenta("World!")); // DIT IS EEN CHECK VOOR CHALK

app
  .use("/public", express.static("public"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set("view engine", "ejs")
  .set("views", "views");

const date = new Date().toLocaleDateString();

// const genres = ["Drum & Bass", "Pop", "Rap", "Tech-House", "Old School Hip Hop"];

// app.get("/users", (req, res) => {
//   res.render("userlist", { title: "All users", users });
// });

// app.get("/users/:userName", (req, res) => {
//   const user = users.find(user => user.name == req.params.userName);
//   res.render("account");
// });

// HOMEPAGE
app.get("/", (req, res) => {
  res.render("index");
});

// REGISTER PAGE
app.get("/register", (req, res) => {
  res.render("register", { title: "Sign up here", date });
});

// LOGIN PAGE
app.get("/login", (req, res) => {
  res.render("login");
});

// ACCOUNT PAGE
app.get("/account/:userId/:slug", (req, res) => {
  res.render("account");
});

// CONTACT PAGE
app.get("/contact", (req, res) => {
  res.render("contact");
});

// MONGODB CONNECTION

async function connectDB () {
  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = process.env.DB_CONNECTION_STRING;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  try {
    console.log("awaiting connection");
    await client.connect();
    console.log("connected");
    let db = client.db("blockTechDB");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.post("/account", async (req, res) => {
  connectDB();

  const user = {
    slug: slug(req.body.name + req.body.lastname, { lower: false }),
    name: req.body.name,
    lastname: req.body.lastname,
    dateofbirth: req.body.dateofbirth,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    passwordcheck: req.body.passwordcheck
  };
  if (req.body.password !== req.body.passwordcheck) {
    res.send("Passwords do not match");
  } else {
    db.collection("collection1").insertOne(user, function (err, collection) {
      if (err) throw err;
      console.log("succes");
    });
    res.render("account", { user });
  }
});

app.listen(port, async () => {
  console.log(chalk.green(`My new first server hosted on port ${port}!`));
  const databaseConnection = await connectDB();
  const theData = await db.collection("collection1").find({}).toArray();
  // await db.collection('collection1').deleteMany({});     TO DELETE DB DATA
});

// 404 PAGE
app.use((req, res) => {
  res.status(404).render("404");
});

// REMOVE ACCOUNT
