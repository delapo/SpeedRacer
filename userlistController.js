const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const server = require("./server.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));


exports.getDataByGame = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM pointlist WHERE game_id = ?", [req.params.idgame], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        let usernames = [];
        rowA.forEach(username => {
            usernames.push(username);
        });
        res.json({usernames});
    });
}

exports.getDataByGameNT = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM pointlist WHERE game_id = ?", [req.params.idgame], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        let usernames = [];
        rowA.forEach(username => {
            usernames.push(username);
        });
        res.json({usernames});
    });
}