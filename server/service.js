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
            console.log(response);
            return response;
        } catch (error){
            console.log(error);
        }
    } 
}

module.exports = Service;