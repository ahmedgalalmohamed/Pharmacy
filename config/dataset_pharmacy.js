const mysql = require('mysql');//to connected mysql

/*connction to database*/
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "",
    database: "website_pharmacy"
});
/*connction to database*/

/*check connction database*/
con.connect((err) => {
    if (err) {
        console.log('Fail The Connection!' + err);
    } else {
        console.log("Sucess The Connection!");
    }
});
/*check connction database*/
var values = [
    ['Brunet', 'Canada'],
    ['China Nepstar', 'China'],
    ['Celesio', 'Germany'],
    ['Mannings', 'Hong Kong'],
    ['Guardian Pharmacy', 'Malaysia'],
];
/*insert Values*/
con.query("INSERT INTO pharmacy (name,location) Values ?", [values], (err, resulte) => {
    if (err) {
        throw err;
    } else {
        console.log(resulte);
    }
});
/*insert Values*/
