const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req, correo, contrasena, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    console.log(rows);
    if (rows.lenhgt > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(contrasena, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.correo));
        } else {
            done(null, false, req.flash('message', 'Contraseña incorrecta'));
        } 
    } else {
        return done(null, false, req.flash('message', 'El correo no está registrado'));
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contrasena',
    passReqToCallback: true
}, async (req, correo, contrasena, done) => {
    const {mombreApellidos} = req.body;
    let newUser = {
        correo,
        contrasena,
        mombreApellidos
    };
    newUser.contrasena = await helpers.encryptPassword(contrasena);
    const result = await pool.query('INSERT INTO usuarios SET ?', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE IdUsers = ?', [id]);
    done(null, rows[0]);
}); 