const AcademiaModel = require('../models/AcademiaModel');

exports.addAcademia = (req, res) => {
  const { nome, endereco, tipo, preco, horario, imagem } = req.body;

  AcademiaModel.addAcademia({ nome, endereco, tipo, preco, horario, imagem }, (err, academiaId) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: academiaId });
  });
};

exports.deleteAcademia = (req, res) => {
  const { id } = req.params;

  AcademiaModel.deleteAcademia(id, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json({ message: 'Academia excluída com sucesso' });
  });
};
