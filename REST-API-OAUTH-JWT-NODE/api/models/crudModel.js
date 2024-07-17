const db = require('../../config/db');

const AuthUser={
    findAll: (callback) => {
        return db.query('SELECT * FROM users_info', (err, results) => {
            if (err) {
              console.error('Error while finding users:', err);
              return callback(err, null);
            }
            return callback(null, results);
          });
      },
    findUser:(username,callback)=>{
        return db.query('SELECT * FROM users_info WHERE user_id = ?', [username], (err, results) => {
            if (err) {
              console.error('Error while finding user id:', err);
              return callback(err, null);
            }
            return callback(null, results);
          });
       
    },
    deleteUser: (id,callback) => {
        console.log(id);
        return db.query('DELETE FROM users_info where user_id=?', [id], (err, result) => {
            if (err) {
              console.error('Error during user creation:', err);
              return callback(err, null);
            }
            return callback(null,result);
          })
    },
    AddUser:(user,callback)=>{
        console.log(user[0]);
        return db.query('INSERT INTO users_info(name,email,bloodgroup,gender) VALUES (?,?,?,?)',user, (err, result) => {
            if (err) {
              console.error('Error during user creation:', err);
              return callback(err, null);
            }
            return callback(null, result);
          })
    },
    UpdatePartiall:(id, fields, callback)=>{
        const setClause = Object.keys(fields).map(key => `${key} = ?`).join(', ');
        const values = Object.values(fields);
        values.push(id);
        const sql = `UPDATE users_id SET ${setClause} WHERE user_id = ?`;

        return db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return callback(err, null);
        }
        return callback(null, result);
        });
    }

}

module.exports = AuthUser;