const express = require("express");
const app = express();
const port = 3000;

const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Manually Creating & Fetching Data Through An Array Insted Of Database
let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I Love Coding",
  },
  {
    id: uuidv4(),
    username: "Rahul Kumar",
    content: "I Love Developing",
  },
  {
    id: uuidv4(),
    username: "Rahul",
    content: "I am selected at Wipro",
  },
];

app.get("/", function (req, res) {
  res.send("You Are on Root Page");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.get("/posts", function (req, res) {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", function (req, res) {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  post.content = req.body.content;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
