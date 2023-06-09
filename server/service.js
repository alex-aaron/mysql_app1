const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('XAMMP database connected');
    }
});

class Service {
    static getServiceInstance() {
        return instance ? instance : new Service();
    }

    async getPosts(){
        try {
            const response = await new Promise( (resolve, reject) => {
                const query = "SELECT * FROM entries";

                connection.query(query, (err, results) => {
                    if (err){
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
            // console.log(response);
            return response;
        } catch (error){
            console.log(error);
        }
    }
    
    async insertPost(title, review, rating){
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = 
                "INSERT INTO entries (title, review, rating, date_added) VALUES (?, ?, ?, ?);"

                connection.query(query, [title, review, rating, dateAdded],
                    (err, results) => {
                        if (err){
                            reject(new Error(err.message));
                        } else {
                            resolve(results);
                        }
                    });
            });
            return insertId;
        } catch (err) {
            console.log(err);
        }

    }

    async getComments(id){
        try {
            const response = await new Promise( (resolve, reject) => {
                const query = 
                "SELECT * FROM comments WHERE entry_id=?";

                connection.query(query, [id], (err, results) => {
                    if (err){
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
            console.log(response);
            return response;
        } catch (error){
            console.log(error);
        }
    }

    async insertComment(text, entryId){
        try {
            const insertId = await new Promise( (resolve, reject) => {
                const query = "INSERT INTO comments (text, entry_id) VALUES (?, ?);";
                
                connection.query(query, [text, entryId], (err, results) => {
                    if (err){
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
            return insertId;
        } catch (error){
            console.log(error);
        }
    }

    async updateComment(commentId, editedText){
        try {
            const response = await new Promise( (resolve, reject) => {
                const query = `UPDATE comments SET text = ? WHERE id = ?`;

                connection.query(query, [editedText, commentId], (err, results) => {
                    if (err){
                        reject(new Error(err.message));
                    } else {
                        resolve(results);
                    }
                });
            });
            return response;
        } catch (error){
            console.log(error);
        }
    }

    async deleteComment(id){
        try {
            const response = await new Promise( (resolve, reject) => {
               const query = "DELETE FROM comments WHERE id = ?";
               connection.query(query, [id], (err, results) => {
                if (err){
                    reject(new Error(err.message));
                } else {
                    resolve(results);
                }
               }); 
            });
            console.log(response);
            return response;
        } catch (error){
            console.log(error);
        }
    }
}

module.exports = Service;