const verify = require("../config/verify");
const express = require('express');
const router = express.Router();
const db = require('../config/connectionmysql')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
let sql = ""
router.post('/signin', async (req, res) => {
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
                            byCrypt(req.body.password).then(pass => {
                                const user = {name: req.body.username, password: pass};
                                jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3 days'}, (err, token) => {
                                    if (err) return res.status(400).json({msgError: err});
                                    return res.status(200).json({exp: jwt.decode(token).exp, token: token});
                                });
                            });
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

router.post('/signup', (req, res) => {

    sql = `insert into users (username, password) values ('${req.body.username}','${req.body.password}')`

    db.executeQuery(req, res, sql);
});

function byCrypt(password) {
    return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                return resolve(hash);
            });
        });
    });
}

function dyCrypt(passHash, oldPass) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(oldPass, passHash, (err, dyPass) => {
            return resolve(dyPass);
        });
    });
}

router.put('/changepassword', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = JSON.parse(authHeader.split(' ')[1]);
    const user = jwt.decode(token);
    const passHash = user.password;
    const email = user.name;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const userFlag = req.body.user;
    await dyCrypt(passHash, oldPass).then(flag => {
        if (flag) {
            if (userFlag) {
                sql = `UPDATE users SET password = ${newPass} WHERE username='${email}'`;
            } else {
                sql = `UPDATE admins SET password = ${newPass} WHERE username='${email}'`;
            }
            db.executeQuery(req, res, sql);
        } else {
            res.status(400).json({msgError: "Incorrect Password"});
        }
    });
});
router.get('/allusers', verify, (req, res) => {
    sql = 'select * from users'
    db.executeQuery(req, res, sql);
});
router.delete('/deluser/:email', (req, res) => {
    sql = `delete from users where username = '${req.params.email}'`;
    db.executeQuery(req, res, sql);
});

module.exports = router;


