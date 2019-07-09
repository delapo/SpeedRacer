const express = require('express');
const app = express();
const server = require("./server.js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

exports.getAllGameByUser = function(req, res)
{
    server.mysql_co_read.query("SELECT game.id, game.categorie_id, game.type_pts, game.isPrivate, game.user_id FROM game INNER JOIN users ON users.id = game.user_id WHERE users.access_token = ? ", [server.getAuthorization(req)], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        let games = [];
        rowA.forEach(game => {
            games.push(game);
        });
        res.json({games: games});
    });
}

exports.getGameById = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM game WHERE id = ?", [req.params.id], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        res.json({games: rowA[0]});
    });
}


exports.getPrivateGame = function(req, res)
{
    server.mysql_co_read.query("SELECT id FROM users WHERE access_token = ?", [server.getAuthorization(req)], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        server.mysql_co_read.query("SELECT * FROM game WHERE isPrivate = 1 AND user_id = ?", [rowA[0].id], (errB, rowB, fieldB) => {
            if (errB) throw errB;
            let private_games = [];
            rowB.forEach(private_game => {
                private_games.push(private_game);
            });
            res.json({private_games});
        });
    });
}

exports.getPrivateGameNT = function(req, res)
{
    server.mysql_co_read.query("SELECT id FROM users WHERE access_token = ?", [server.getAuthorization(req)], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        server.mysql_co_read.query("SELECT * FROM game WHERE isPrivate = 1 AND user_id = ?", [rowA[0].id], (errB, rowB, fieldB) => {
            if (errB) throw errB;
            let private_games = [];
            rowB.forEach(private_game => {
                private_games.push(private_game);
            });
            res.json({private_games});
        });
    });
}

exports.getPublicGame = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM game WHERE isPrivate = 0", (errA, rowA, fieldA) => {
        if (errA) throw errA;
        let public_games = [];
        rowA.forEach(public_game => {
            public_games.push(public_game);
        });
        res.json({public_games});
    });
}

exports.getPublicGameNT = function(req, res)
{
    server.mysql_co_read.query("SELECT * FROM game WHERE isPrivate = 0", (errA, rowA, fieldA) => {
        if (errA) throw errA;
        let public_games = [];
        rowA.forEach(public_game => {
            public_games.push(public_game);
        });
        res.json({public_games});
    });
}

exports.createGame = function(req, res)
{
    server.mysql_co_read.query("SELECT id FROM users WHERE access_token = ?", [server.getAuthorization(req)], (errA, rowA, fieldA) => {
        if (errA) throw errA;
        const game = {
            title: req.body.title,
            type_pts: req.body.type_pts,
            isPrivate: req.body.isPrivate,
            user_id: rowA[0].id,
        }

        server.mysql_co_write.query("INSERT INTO game(title, type_pts, isPrivate, user_id) VALUES(?,?,?,?)", [game.title, game.type_pts, game.isPrivate, game.user_id], (errB, rowB, fieldB) => {
            if (errB) throw errB;
            req.body.data.forEach(datas => {
                if (datas.type === 'points')
                    server.sync_mysql_co_write.query("INSERT INTO pointlist(game_id, username, points) VALUES(?, ?, ?)", [rowB.insertId, datas.username, datas.score]);
                else if (datas.type === 'timer') {
                    let time = Math.floor(datas.score/1000);
                    let hours = 0;
                    let minutes = 0;
                    let seconds = 0;
                    let timer;
                    if (time >= 60) {
                        minutes = Math.floor(time/60);
                        seconds = time%60;
                    }
                    if (minutes >= 60) {
                        hours = Math.floor(minutes/60);
                        minutes = minutes%60;
                    }
                    if (time >= 60)
                        timer = hours + ":"+minutes+":"+seconds;
                    else
                        timer = time;
                    server.sync_mysql_co_write.query("INSERT INTO pointlist(game_id, username, timer, ms) VALUES(?, ?, ?, ?)", [rowB.insertId, datas.username, timer, datas.score%1000]);
                }
                if (req.body.data.indexOf(datas)+1 === req.body.data.length)
                    res.json({error: false, message: 'game créée'});
            });
        });
    });
}