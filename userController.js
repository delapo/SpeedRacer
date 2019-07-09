const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const server = require("./server.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

exports.register = function(req, res)
{
    if (typeof req.body.email !== 'undefined' && req.body.email !== '' && typeof req.body.password !== 'undefined' && req.body.password !== '') {
        server.mysql_co_read.query("SELECT * FROM users WHERE email = ?", [req.body.email], (errA, rowsA, fieldsA) => {
            if (errA) throw errA;

            if (rowsA[0] != null)
                return res.json({error: true, message: "Email déjà utilisé"});
            
            bcrypt.genSalt(10, function(errB, salt) {
                if (errB) throw errB;
                bcrypt.hash(req.body.password, salt, function(errC, hash) {
                    if (errC) throw errC;
                    const user = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                    };
                    server.mysql_co_write.query("INSERT INTO users SET ?", [user], (errD, rowsD, fieldsD) => {
                        if (errD) throw errD;
                        res.json({error: false});
                    });
                });
            });
        });
    } else
        return res.json({error: true, message: "tous les champs ne sont pas renseignés"});
}

exports.login = function(req, res)
{
    if (typeof req.body.password !== 'undefined' && req.body.password !== '' && typeof req.body.email !== 'undefined' && req.body.email !== '') {
        server.mysql_co_read.query("SELECT * FROM users WHERE email = ?", [req.body.email], (errA, rowsA, fieldsA) => {
            if (errA) throw errA;
            let user = rowsA[0];

            if (rowsA.length == 0)
                return res.json({error: true, message: "Email inexistante"});

            bcrypt.compare(req.body.password, user.password, function(errB, resB) {
                if (errB) throw erB;
                if (resB) {
                    jwt.sign({id: user.id}, 'privatekey', (errC, token) => {
                        if (errC) throw errC;
                        user.access_token = token;

                        server.mysql_co_write.query("UPDATE users SET access_token = ? WHERE id = ?;", [token, user.id], (errD, rowsD, fieldD) => {
                            if (errD) throw errD;
                            return res.json({token: token, error: false, message: "Connecté", user_id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname});
                        })
                    });
                } else if (!resB)
                    return res.json({error: true, message: "Mot de passe incorrect"});
            });
        });
    }
}

exports.getUser = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM users WHERE access_token = ?", [server.getAuthorization(req)], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        const user = {
            firstname: rowA[0].firstname,
            lastname: rowA[0].lastname,
            email: rowA[0].email,
        }
        res.json({user: user});
    });
}

exports.verifyUser = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM users WHERE access_token = ?", [server.getAuthorization(req)], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        if (rowA[0] == undefined)
            res.json({error: true, message: "l'access_token ne correspond pas à l'user"});
        else if (rowA[0].id !== req.body.id)
            res.json({error: true, message: "l'access_token ne correspond pas à l'user"});
        else
            res.json({error: false});
    });
}

exports.getUserById = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM users WHERE id = ?", [req.params.id], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        return res.json(rowA[0]);
    });
}

exports.modifUser = function(req, res)
{
    if (typeof req.body.lastname !== 'undefined' && req.body.lastname !== '')
        server.mysql_co_write.query("UPDATE users SET lastname = ? WHERE access_token = ?", [req.body.lastname, server.getAuthorization(req)], (errA, rowA, fieldsA) => {
            if (errA) throw errA;
        });
    if (typeof req.body.firstname !== 'undefined' && req.body.firstname !== '')
        server.mysql_co_write.query("UPDATE users SET firstname = ? WHERE access_token = ?", [req.body.firstname, server.getAuthorization(req)], (errB, rowB, fieldsB) => {
            if (errB) throw errB;
        });
    return res.json({error: false, message: "Utilisateur modifié"});
}

exports.deleteUser = function(req, res, errA)
{   
    if (typeof req.body.id !== 'undefined' && req.body.id !== '') {
        server.mysql_co_write.query("DELETE FROM users where id = ?", [req.body.id], function(errA, rowA, fieldA) {
            if (errA) throw errA;
            return res.json({error: false});
        });
    } else
        return res.json({error: true, message : "id non renseigné"});
}