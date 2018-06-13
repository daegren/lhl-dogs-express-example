const PORT = process.env.PORT || 8080;
const express = require("express");

const app = express();

app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`App is running @ http://localhost:${PORT}`);
});
