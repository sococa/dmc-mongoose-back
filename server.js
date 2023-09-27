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

const io = new Server(httpServer, {
  cors: {
    origin: "https://pointandgo-frontend-alpha.vercel.app/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

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
  res.json("👩‍💻 Bienvenue sur le serveur Point&Go 🔥");
});
