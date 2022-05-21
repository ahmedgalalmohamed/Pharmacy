const express = require('express');
const router = express.Router();
const db = require("../config/connectionmysql");
const verify = require('../config/verify');
let sql;

router.get('/:id', (req, res) => {
    let ID = req.params.id;
    sql = `SELECT m.ID,m.Name,m.Description from pharmacy as p,med_phar as pm ,medicine as m where p.ID = pm.ID_phar and m.ID = pm.ID_med and p.ID = ${ID}`;
    db.executeQuery(req, res, sql);
});

router.get('/mfp/:id',verify ,async (req, res) => {
    let ID = req.params.id;
    sql = `SELECT m.ID,m.Name,m.Description from pharmacy as p,med_phar as pm ,medicine as m where p.Id = pm.ID_phar and m.id = pm.ID_med and p.Id = ${ID}`;
    let sql_ = `select * from medicine`;
    if (db.con.state === "authenticated") {
        await db.con.query(sql, (err, resultQ2) => {
            if (err) {
                return res.status(404).json({msgError: err.sqlMessage});
            }
            db.con.query(sql_, (err, resultQ1) => {
                if (err) {
                    return res.status(404).json({msgError: err.sqlMessage});
                }
                for (let row = 0; row < resultQ1.length; row++) {
                    for (let col = 0; col < resultQ2.length; col++) {
                        if (resultQ1[row].id === resultQ2[col].ID) {
                            resultQ1.splice(row, 1);
                        }
                    }
                }
                return res.status(200).send(resultQ1);
            });
        });

    } else
        return res.status(400).json({msgError: "Failed To Connect at DataBase Mysql"});
});

router.post('/', verify,(req, res) => {
    let {phaId, medId} = req.body;
    console.log(phaId,medId);
    sql = `insert into med_phar (ID_phar, ID_med) values ('${phaId}','${medId}')`;
    db.executeQuery(req, res, sql);
});

router.delete('/:idp/:idm', verify,(req, res) => {
    let idp = req.params.idp;
    let idm = req.params.idm;
    sql = `delete from med_phar where ID_phar='${idp}' and ID_med='${idm}'`;
    db.executeQuery(req, res, sql);
});

module.exports = router;