const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../config/connectionmysql');


passport.serializeUser((user, done) => {
    if (user) return done(null, user.username);
});
passport.deserializeUser(async (username, done) => {
    let sql = `select * from admins where username = '${username}'`
    await db.con.query(sql, (err, result) => {
        if (err) {
            return done(err, false);
        }
        return done(null, result);
    })
});

passport.use('local', new LocalStrategy({},
    async (username, password, done) => {
        try {
            let sql = `select * from admins where username = '${username}'`
            await db.con.query(sql, (err, result) => {
                if (err) {
                    return done(err, false);
                } else {
                    if (result.length === 0) {
                        return done("the user not found", false);
                    } else {
                        if (result[0].password === password) {
                            return done(null, result[0]);
                        } else {
                            return done("the password incorrect", false);
                        }
                    }
                }
            });
        } catch (err) {
            return done(err, false);
        }
    }
))