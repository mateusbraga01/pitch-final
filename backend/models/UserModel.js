const db = require('../db/database');

class UserModel {
  static registerUser(email, password, tag, callback) {
    const sql = 'INSERT INTO users (email, password, tag) VALUES (?, ?, ?)';
    db.run(sql, [email, password, tag], function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, this.lastID);
    });
  }

  static loginUser(email, password, callback) {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.get(sql, [email, password], (err, row) => {
      if (err) {
        return callback(err);
      }
      callback(null, row);
    });
  }
}

module.exports = UserModel;
