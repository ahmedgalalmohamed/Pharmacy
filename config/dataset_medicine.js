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
    }
    else {
        console.log("Sucess The Connection!");
    }
});
/*check connction database*/
var values = [
    ['25% Dextrose','Dextrose 25% Infusion is used for short term fluid replacement. It works by replenishing fluid loss. Thus, it treats hypovolemia that can result due to dehydration, injury, or burns.'],
    ['Mesalazine','Mesalazine, also known as mesalamine or 5-aminosalicylic acid (5-ASA), is a medication used to treat inflammatory bowel disease, including ulcerative colitis and Crohns disease.It is generally used for mildly to moderately severe disease.It is taken by mouth or rectally.The formulations which are taken by mouth appear to be similarly effective.'],
    ['Allopurinol','Allopurinol is used to treat gout and certain types of kidney stones. It is also used to prevent increased uric acid levels in patients receiving cancer chemotherapy. These patients can have increased uric acid levels due to release of uric acid from the dying cancer cells. Allopurinol works by reducing the amount of uric acid made by the body. Increased uric acid levels can cause gout and kidney problems.'],
    ['Amoxicillin+Clavulinic acid','The combination of amoxicillin and clavulanic acid is used to treat certain infections caused by bacteria, including infections of the ears, lungs, sinus, skin, and urinary tract. Amoxicillin is in a class of medications called penicillin-like antibiotics. It works by stopping the growth of bacteria. Clavulanic acid is in a class of medications called beta-lactamase inhibitors. It works by preventing bacteria from destroying amoxicillin.'],
    ['Cefixime','Cefixime is a third-generation cephalosporin antibiotic that is highly effective against many types of bacteria. It fights diseases by stopping the growth of bacteria that cause them.']

  ];
/*insert Values*/
con.query("INSERT INTO medicine (name,description) Values ?",[values],(err,resulte)=>{
    if(err){
        throw err;
    }
    else{
        console.log(resulte);
    }
});
/*insert Values*/
