require("dotenv").config();

const express = require("express");
const app = express();

const expressFormidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(expressFormidable());
app.use(cors());

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("connexion à la bdd réussie");
} catch (error) {
  console.log("ERREUR : ", error.message);
}

// routes
const register = require("./routes/user");
const customerFeedback = require("./routes/customerFeedback");
const education = require("./routes/education");
const dogSitting = require("./routes/dogSitting");
const tip = require("./routes/tip");
const admin = require("./routes/admin");

app.use(register);
app.use(customerFeedback);
app.use(education);
app.use(dogSitting);
app.use(tip);
app.use(admin);

app.get("/", (req, res) => {
  res.json("👩‍💻 Bienvenue sur le serveur de DMC 🔥");
});

app.all("*", (req, res) => {
  // route qui va envoyer une erreur 404 en cas de mauvaise URL
  res
    .status(404)
    .json({ message: "⚠️ Oh no ! This route doesn't exist ! ( ´•̥×•̥` )" });
});
