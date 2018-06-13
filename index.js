const PORT = process.env.PORT || 8080;
const express = require("express");

const app = express();

const dogsDb = [
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

app.set("view engine", "ejs");

// app.get('/dogs', function(req, res) {});
app.get("/dogs", (req, res) => {
  res.render("dogs/index", { dogs: dogsDb });
});

app.listen(PORT, () => {
  console.log(`App is running @ http://localhost:${PORT}`);
});
