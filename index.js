const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

const app = express();

let dogsDb = [
  {
    id: "baa22af1-6054-41e6-b1f4-135fa67820d0",
    name: "Sherman",
    hairColor: "Cream"
  },
  {
    id: "f4458326-5757-44ba-830e-aeccb00b95c5",
    name: "Wyatt",
    hairColor: "Golden"
  }
];

const findDog = id => {
  const dog = dogsDb.filter(dog => dog.id === id)[0];
  return dog;
};

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/dogs/new", (req, res) => {
  res.render("dogs/new");
});

app.post("/dogs", (req, res) => {
  const newDog = {
    id: uuid(),
    name: req.body.name,
    hairColor: req.body.hairColor
  };

  dogsDb.push(newDog);

  res.redirect(`/dogs/${newDog.id}`);
});

app.get("/dogs/:id/edit", (req, res) => {
  const dog = findDog(req.params.id);
  if (dog) {
    res.render("dogs/edit", { dog: dog });
  } else {
    res.status(404).render("404");
  }
});

app.post("/dogs/:id", (req, res) => {
  const dog = findDog(req.params.id);
  if (dog) {
    dog.name = req.body.name;
    dog.hairColor = req.body.hairColor;
    res.redirect("/dogs");
  } else {
    res.status(404).render("404");
  }
});

// app.get('/dogs', function(req, res) {});
app.get("/dogs", (req, res) => {
  res.render("dogs/index", { dogs: dogsDb });
});

app.get("/dogs/:id", (req, res) => {
  const dog = findDog(req.params.id);
  if (dog) {
    res.render("dogs/show", { dog: dog });
  } else {
    res.render("404").status(404);
  }
});

app.post("/dogs/:id/delete", (req, res) => {
  const foundDog = findDog(req.params.id);
  if (foundDog) {
    dogsDb = dogsDb.filter(dog => dog.id !== foundDog.id);
    res.redirect("/dogs");
  } else {
    res.status(404).render("404");
  }
});

app.listen(PORT, () => {
  console.log(`App is running @ http://localhost:${PORT}`);
});
