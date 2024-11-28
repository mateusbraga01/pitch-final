const UserModel = require('../models/UserModel');

exports.registerUser = (req, res) => {
  const { email, password, tag } = req.body;

  UserModel.registerUser(email, password, tag, (err, userId) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: userId });
  });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  UserModel.loginUser(email, password, (err, user) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (user) {
      res.json({ user });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
};
