const express = require("express");
const cors = require("cors");
const connectDatabase = require("./src/config/database");
const userRoutes = require("./src/users/routes/userRoutes.js");
const contentRoutes = require("./src/contents/routes/contentRoutes");
const paperRoutes = require("./src/papers/routes/paperRoutes");
const badgeRoutes = require("./src/badges/routes/badgeRoutes");
const authRoutes = require("./src/auth/routes/authRoutes");
require('dotenv').config()


const app = express();
const allowedOrigins = ["https://d3moon-core-666.vercel.app"];

if (process.env.ENV === 'DEV') {
  allowedOrigins.push("http://localhost:3000");

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

app.use(cors({ origin: allowedOrigins }));

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(contentRoutes);
app.use(authRoutes);
app.use(paperRoutes);
app.use(badgeRoutes);

module.exports = app;
