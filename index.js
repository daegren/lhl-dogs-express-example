const PORT = process.env.PORT || 8080;
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid/v4");

const app = express();

/**
 * An array which contains the data for the application
 */
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

/**
 * Find a dog from the database by ID.
 *
 * @param {uuid} id A `UUID` which identifies the dog to find.
 * @returns { (Object | undefined) } The dog that was found in the database
 */
const findDog = id => {
  const dog = dogsDb.filter(dog => dog.id === id)[0];
  return dog;
};

// Use `ejs` as our view engine
app.set("view engine", "ejs");
// Use `body-parser` to parse request bodies.
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * A helper to render out a 404 response.
 *
 * @param {Express.Response} res The response object.
 */
const render404 = res => {
  res.status(404).render("404");
};

// GET /dogs/new - Create Form
app.get("/dogs/new", (req, res) => {
  res.render("dogs/new");
});

// POST /dogs - Create Action
app.post("/dogs", (req, res) => {
  const newDog = {
    id: uuid(),
    name: req.body.name,
    hairColor: req.body.hairColor
  };

  dogsDb.push(newDog);

  res.redirect(`/dogs/${newDog.id}`);
});

// GET /dogs/:id/edit - Update Form
app.get("/dogs/:id/edit", (req, res) => {
  const dog = findDog(req.params.id);
  if (dog) {
    res.render("dogs/edit", { dog: dog });
  } else {
    render404(res);
  }
});

// POST /dogs/:id - Update action
app.post("/dogs/:id", (req, res) => {
  const dog = findDog(req.params.id);
  if (dog) {
    dog.name = req.body.name;
    dog.hairColor = req.body.hairColor;
    res.redirect("/dogs");
  } else {
    render404(res);
  }
});

// GET /dogs - Index for dogs
app.get("/dogs", (req, res) => {
  res.render("dogs/index", { dogs: dogsDb });
});

// GET /dogs/:id - Show for dogs
app.get("/dogs/:id", (req, res) => {
  const dog = findDog(req.params.id);
  if (dog) {
    res.render("dogs/show", { dog: dog });
  } else {
    render404(res);
  }
});

// POST /dogs/:id/delete - Delete a dog
app.post("/dogs/:id/delete", (req, res) => {
  const foundDog = findDog(req.params.id);
  if (foundDog) {
    dogsDb = dogsDb.filter(dog => dog.id !== foundDog.id);
    res.redirect("/dogs");
  } else {
    render404(res);
  }
});

// Start the app, listening on `PORT`
app.listen(PORT, () => {
  console.log(`App is running @ http://localhost:${PORT}`);
});
