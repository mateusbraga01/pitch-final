const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const academiaRoutes = require('./routes/academia');
const db = require('./db/database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/academia', academiaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
