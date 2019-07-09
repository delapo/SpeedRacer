var express = require("express");
var mysql = require('mysql');
var syncmysql = require('sync-mysql');
var app = express();
var morgan = require('morgan')

const server = require("./server.js");

const uc = require("./userController.js");
const gc = require("./gameController.js");
const ulc = require("./userlistController.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

const mysql_user = 'root';
const mysql_password = 'rootroot';
const mysql_host_read = 'clusterdeepracer.cluster-ro-cqui2pgasrte.eu-west-3.rds.amazonaws.com';
const mysql_host_write = 'clusterdeepracer.cluster-cqui2pgasrte.eu-west-3.rds.amazonaws.com';
//const mysql_host_read = 'localhost';
//const mysql_host_write = 'localhost';

exports.sync_mysql_co_read = new syncmysql({
    host: mysql_host_read,
    user : mysql_user,
   	password : mysql_password,
    database: 'sdccloud',
});

exports.mysql_co_read = mysql.createConnection({
	host: mysql_host_read,
	user : mysql_user,
	password : mysql_password,
	database: 'sdccloud',
 });

exports.sync_mysql_co_write = new syncmysql({
    host: mysql_host_write,
	user : mysql_user,
	password : mysql_password,
    database: 'sdccloud',
});

exports.mysql_co_write = mysql.createConnection({
    host: mysql_host_write,
	user : mysql_user,
	password : mysql_password,
    database: 'sdccloud',
});

app.listen(3000, () => {
	console.log("Serveur allumé sur le port 3000");
});

// AUTH //

app.post("/register", (req, res) => {
    uc.register(req, res);
});

app.post("/login", (req, res) => {
	uc.login(req, res);
});

app.post("/verifyUser", (req, res) => {
	uc.verifyUser(req, res);
});

// USER //

app.get("/getUser", verifyToken, (req, res) => {
    uc.getUser(req, res);
});

app.get("/getUserById/:id", verifyToken, (req, res) => {
	uc.getUserById(req, res);
});

app.post("/modifUser", verifyToken, (req, res) => {
	uc.modifUser(req, res);
});

app.post("/deleteUser", verifyToken, (req, res) => {
	uc.DeleteUser(req, res);
});

// GAME //

app.get("/getAllGameByUser", verifyToken, (req, res) => {
    gc.getAllGameByUser(req, res);
});

app.get("/getGameById/:id", verifyToken, (req, res) => {
    gc.getGameById(req, res);
});

app.get("/getPrivateGame", verifyToken, (req, res) => {
	gc.getPrivateGame(req, res);
});

app.get("/getPublicGame", verifyToken, (req, res) => {
	gc.getPublicGame(req, res);
});

app.get("/getPrivateGameNT", (req, res) => {
	gc.getPrivateGameNT(req, res);
});

app.get("/getPublicGameNT", (req, res) => {
	gc.getPublicGameNT(req, res);
});

app.post("/createGame", verifyToken, (req, res) => {
	gc.createGame(req, res);
});

// UserList //

app.get("/getDataByGame/:idgame", verifyToken, (req, res) => {
	ulc.getDataByGame(req, res);
});

app.get("/getDataByGameNT/:idgame", (req, res) => {
	ulc.getDataByGameNT(req, res);
});

app.post("/addUserToGame/", verifyToken, (req, res) => {
	ulc.addUserToGame(req, res);
});

exports.getAuthorization = function(req)
{
	if (typeof req.headers['authorization'] !== 'undefined')
		return req.headers['authorization'].split(' ')[1];
	else
		return 0;
}

function verifyToken(req, res, next) 
{
	let authorization = server.getAuthorization(req);
	if (authorization == 0)
		res.json({error: true, message: "pas d'access_token"});
	else {
		server.mysql_co_read.query("SELECT * FROM users WHERE access_token = ?", [authorization], (err, rows) => {
			if (err) throw err;
			if (rows[0] == null)
				res.json({error: true, message: "access_token non renseigné"});
			else if (rows[0].access_token === authorization)
				next();
			else 
				res.json({error: true, message: "access_token incorrect"});
		});
	}
}




90%60 + 90/60 