const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite para criação de tabelas.');
  }
});

// Criação da tabela users
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  tag TEXT NOT NULL
);`;

db.run(createUsersTable, (err) => {
  if (err) {
    console.error('Erro ao criar tabela users:', err.message);
  } else {
    console.log('Tabela users criada ou já existe.');
  }
});

// Criação da tabela academias
const createAcademiasTable = `
CREATE TABLE IF NOT EXISTS academias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  endereco TEXT NOT NULL,
  tipo TEXT NOT NULL,
  preco TEXT NOT NULL,
  horario TEXT NOT NULL,
  imagem TEXT NOT NULL
);`;

db.run(createAcademiasTable, (err) => {
  if (err) {
    console.error('Erro ao criar tabela academias:', err.message);
  } else {
    console.log('Tabela academias criada ou já existe.');
  }
});

// Fechar a conexão após a criação das tabelas
db.close((err) => {
  if (err) {
    console.error('Erro ao fechar conexão com o banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados encerrada.');
  }
});
