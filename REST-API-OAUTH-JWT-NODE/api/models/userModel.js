const db = require('../../config/db');

const User = {
  findByEmail: async (email) => {
    try {
      const [rows] = await db.promise().execute('SELECT * FROM user WHERE email = ?', [email]);
      console.log(rows[0]);
      return rows[0]; // Assuming email is unique, returning the first row
    } catch (error) {
      throw error; // Propagate the error to be handled where this function is called
    }
  },

  Jcreate: async (user) => {
    try {
      const { email, password } = user;
      const [result] = await db.promise().execute('INSERT INTO user (email, password) VALUES (?, ?)', [email, password]);
      return { id: result.insertId, email }; // Return the inserted user details
    } catch (error) {
      throw error; // Propagate the error to be handled where this function is called
    }
  },

  findById: (id, callback) => {
    db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
      if (err) return callback(err, null);
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null);
      }
    });
  },

  findByGoogleId: (googleId, callback) => {
    db.query('SELECT * FROM user WHERE google_id = ?', [googleId], (err, results) => {
      if (err) return callback(err, null);
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null);
      }
    });
  },

  findByGitHubId: (githubId, callback) => {
    db.query('SELECT * FROM user WHERE github_id = ?', [githubId], (err, results) => {
      if (err) return callback(err, null);
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null);
      }
    });
  },

  create: (oauthId, email, isGoogle, callback) => {
    const column = isGoogle ? 'google_id' : 'github_id';
    const query = `INSERT INTO user (${column}, email) VALUES (?, ?)`;
    db.query(query, [oauthId, email], (err, results) => {
      if (typeof callback === 'function') {
        if (err) return callback(err, null);
        return callback(null, { id: results.insertId, email });
      } else {
        console.error('Callback is not a function');
      }
    });
  },
};

module.exports = User;
