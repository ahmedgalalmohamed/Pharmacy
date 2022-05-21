const express = require('express');
const router = express.Router();
const con = require('../config/connectionmysql');
const verify  = require('../config/verify');

let sql;

//#region get as users
router.get('/', verify,(req, res) => {
    sql = "SELECT * FROM pharmacy";
    con.executeQuery(req, res, sql);
});
//#endregion


//#region post add pharmacy as admin
router.post('/', verify,(req, res) => {
    let Name = req.body.Name;
    let Location = req.body.Location;
    sql = `INSERT INTO pharmacy (name,location) Values ('${Name}','${Location}')`;
    return con.executeQuery(req, res, sql);
});
//#endregion

//#region post delete pharmacy as admin
router.delete('/:id', verify,(req, res) => {
    let id = req.params.id;
    sql = `delete from pharmacy where Id='${id}'`;
    con.executeQuery(req, res, sql);
});
//#endregion


module.exports = router;

