const express = require('express');
const router = express.Router();
const con = require('../config/connectionmysql');

//#region post get medicine as user
router.get('/', (req, res) => {
    let sql = `select * from medicine`;
    con.executeQuery(req, res, sql);
});
//#endregion

//#region post add medicine as admin
router.post('/', (req, res) => {
    let Name = req.body.Name;
    let Description = req.body.Description;
    let sql = `INSERT INTO medicine (name,description) Values ('${Name}','${Description}')`;
    con.executeQuery(req, res, sql);
});

//#endregion


router.put('/', (req, res) => {
    let Name = req.body.name;
    let Description = req.body.description;
    let Id = req.body.id;
    let sql = `UPDATE medicine SET name = '${Name}', description = '${Description}' WHERE id='${Id}'`;
    con.executeQuery(req, res, sql);
});


module.exports = router;