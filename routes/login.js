const express = require('express');
const path=require('path');
const rootdir = require("../util/path");
const session = require('express-session');
const Router = express.Router();
const con =require('../connection');


Router.get('/', (req, res) => {
    console.log(req.session);
    if (req.session.email_id != "") {
        if (req.session.role == 'U')
            res.redirect('/user');
        else if (req.session.role == 'C')
            res.redirect('/client');
        else if (req.session.role == 'A')
            res.redirect('/admin');
    }
    res.render(path.join(rootdir, 'views', 'login'), {
        error: ""
    });
});

Router.get('/logOut', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

Router.post('/loginCheck', (req, res) => {
    console.log('fresh session is being established ');
    let form_email_id = req.body.Email;
    let form_password = req.body.Password;
    console.log(form_email_id + form_password)
    let query = "SELECT * FROM password where email='" + form_email_id+ "'";
    con.query(query, function (err, result) {
        if (err) {
            console.log(err);
            console.log('Sorry !! Servers side error ');
            var errorText = 'Sorry !! Servers side errors ,Please try again later ';
            res.render(path.join(rootdir, 'views', 'login'), {
                error : errorText
            });
        }
        else if (result.length != 0 && result[0].password == form_password) {
            req.session.email_id = result[0].email;
            req.session.name = result[0].name;
            req.session.role = result[0].role;
            console.log("User name and password matched from records");
            if (result[0].role == 'U')
                res.redirect('/user');
            else if (result[0].role == 'C')
                res.redirect('/client');
            else if (result[0].role == 'A')
                res.redirect('/admin');
        } else {
            console.log(' Please enter the vaild credentials');
            var errorText = 'Please enter the vaild credentials';
            res.render(path.join(rootdir, 'views', 'login'), {
                error : errorText
            });
        }
    });

});

module.exports = Router;