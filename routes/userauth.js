const express = require('express');
const router = express.Router();
const db = require('../config/connectionmysql')
const jwt = require('jsonwebtoken');
let sql = ""
router.post('/login', async (req, res) => {
    try {
        let isUser = req.body.user;
        if (!isUser) {
            sql = `select * from admins where username = '${req.body.username}'`
        } else {
            sql = `select * from users where username = '${req.body.username}'`
        }
        if (db.con.state === "authenticated") {
            await db.con.query(sql, (err, result) => {
                if (err) {
                    return res.status(400).send({msgError: err.sqlMessage});
                } else {
                    if (result.length === 0) {
                        return res.status(400).json({msgError: "this User not found"});
                    } else {
                        if (result[0].password === req.body.password) {
                            const user = {name: req.body.username};
                            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                            return res.status(200).json(token);
                        } else {
                            return res.status(400).json({msgError: "the password incorrect"});
                        }
                    }
                }
            });
        } else {
            return res.status(400).json({msgError: "Failed To Connect at DataBase Mysql"});
        }
    } catch (err) {
        return res.status(400).json({msgError: err});
    }
});


// router.post('/post', authorization, (req, res) => {
//     return res.status(200).json(req.user);
// });
//
// function authorization(req, res, next) {
//     const username = JSON.parse(req.body.username);
//     jwt.verify(username, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.status(401).send(err);
//         }
//         req.user = user;
//         next();
//     });
// }


module.exports = router;


