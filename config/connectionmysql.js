//#region connection to database
function connectDatabase() {
    const mysql = require('mysql')
    /*connection to database*/
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: "",
        database: "website_pharmacy"
    });
    /*connection to database*/

    /*check connection database*/
    con.connect((err) => {
        if (err) {
            return err;
        }
    });

    /*check connection database*/

    function executeQuery(req, res, sql) {
        if (con.state === "authenticated") {
            con.query(sql, (err, result) => {
                if (err) {
                    return res.status(404).json({msgError: err.sqlMessage});
                }
                return res.status(200).send(result);
            })
        } else
            return res.status(400).json({msgError: "Failed To Connect at DataBase Mysql"});
    }

    module.exports = {executeQuery, con};
}

connectDatabase();
//#endregion
