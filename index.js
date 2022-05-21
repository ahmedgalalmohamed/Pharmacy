const catchError = require('http-errors');
require('dotenv').config();
const cors = require('cors');//to allow all clients to connected it
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookie = require('cookie-parser');


const medicineRouter = require('./routes/medicine');
const pharmacyRouter = require('./routes/pharmacy');
const med_phaRouter = require('./routes/med_phar');
const userRouter = require('./routes/userauth');


const app = express();//to handel router CRUD
app.use(cookie());
app.use(express.json()); // to handel req.body
app.use(express.urlencoded({extended: true}));//to handel requests url
app.use(
    cors({
        origin: ["http://localhost:4200", "http://localhost:3000"], // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    })
);

app.use(logger('dev'));//GET /favicon.ico 404 1.535 ms - 150 to display Get or Post or (short,dev,tiny,combined,common)
// ahmed@2020 1234

const oneDay = 1000 * 60 * 60 * 24 * 30;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    resave: false,
    cookie: {sameSite: 'strict', maxAge: oneDay}, //use to set expire for session => advantage if close your browser you login
}));

//#region difference between session and cookies
// sessions are saved on the server-side, whereas cookies are saved on the user's browser or client-side
// cookie => cookie-parser => app.use(cookie()) => res.cookie(name,value)
// session => session-express => app.use(session({})) => req.session.name_value =value
//#endregion
//#region code number for http requests
//200	OK
//202	Accepted
//304	Not Modified
//302	Found
//400	Bad Request
//401	Unauthorized
//404	Not Found
//406	Not Acceptable
//408	Request Timeout
//500	Internal Server Error
//#endregion


app.use('/pharmacy', pharmacyRouter);
app.use('/medicine', medicineRouter);
app.use('/med_phar', med_phaRouter);
app.use('/userauth', userRouter);


app.use((req, res, next) => {
    res.status(404).json({msgError: catchError(404).message});
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

