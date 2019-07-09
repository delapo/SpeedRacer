const mysql = require('mysql');

const mysql_user = 'root';
const mysql_password = 'rootroot';
const mysql_host = 'clusterdeepracer.cluster-cqui2pgasrte.eu-west-3.rds.amazonaws.com';
//const mysql_host = 'localhost';

const mysql_co_read = mysql.createConnection({
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
});

const mysql_co_write = mysql.createConnection({
    host: mysql_host,
    user: mysql_user,
    password: mysql_password,
});

mysql_co_write.connect(function(err) {
    if (err) throw err;
    mysql_co_write.query("DROP DATABASE IF EXISTS sdccloud");
    mysql_co_write.query("CREATE DATABASE sdccloud", function (err, result) {
        if (err) throw err;
        console.log("Base de données 'sdccloud' créée.");
        mysql_co_write.query("USE sdccloud");
        mysql_co_write.query("CREATE TABLE users(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, lastname VARCHAR(50), firstname VARCHAR(50), username VARCHAR(50), email VARCHAR(100) UNIQUE, password VARCHAR(240), access_token VARCHAR(1300)) ENGINE=INNODB");
        mysql_co_write.query("CREATE TABLE game(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, title VARCHAR(50), type_pts VARCHAR(30), isPrivate TINYINT, user_id INT NOT NULL, FOREIGN KEY (user_id) REFERENCES users(id)) ENGINE=INNODB");
        mysql_co_write.query("CREATE TABLE pointlist(id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, game_id INT NOT NULL, username VARCHAR(50), points FLOAT, timer TIME, ms INT, FOREIGN KEY (game_id) REFERENCES game(id)) ENGINE=INNODB", (err, rows, field) => {
            if (err) throw err;
            console.log('Tables "users", "game" et "pointlist" créées.');
            mysql_co_write.end();
        }); 
    });
});
