const express = require('express');
const connectDatabase = require('./src/config/database');
const userRoutes = require('./src/users/routes/userRoutes.js');
const contentRoutes = require('./src/contents/routes/contentRoutes');
const paperRoutes = require('./src/papers/routes/paperRoutes');
const badgeRoutes = require('./src/badges/routes/badgeRoutes');
const authRoutes = require('./src/auth/routes/authRoutes')

const app = express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(contentRoutes);
app.use(authRoutes);
app.use(paperRoutes);
app.use(badgeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
