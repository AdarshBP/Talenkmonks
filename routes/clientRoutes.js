const express = require('express');
const path = require('path');
const rootdir = require("../util/path");
const Router = express.Router();
const session = require('express-session');
const con = require('../connection');
var auth = function (req, res, next) {
    if (req.session.email_id == undefined && req.session.role == undefined)
        res.redirect('/');
    else
        next();
}


Router.get('/client', auth, (req, res) => {
    console.log("client logged into the account :" + req.session.name)
    res.redirect('/client/ClientData');
});

Router.get('/client/ClientData', auth, (req, res) => {

    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }
    let query = "SELECT * FROM client_data where client_email_id = '" + req.session.email_id + "'";
    con.query(query, function (err, result) {
        if (err) {
            
            console.log(err);
            console.log('Sorry !! database side error ');
            var errorText = 'Sorry !! databse side errors ,Please try again later ';
            res.render(path.join(rootdir, 'views', 'login'), {
                error: errorText
            });
        } else {
            candidateData = [];

            
            console.log(result);
            res.render(path.join(rootdir, 'views', 'clientHomePage'), {
                result,
                sessionData
            });
        }
    });
});

Router.get('/client/AddClientData', auth, (req, res) => {
    console.log( req.session.name + " is in addCandidate details");
    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }
    res.render(path.join(rootdir, 'views', 'addClientDetails'), {
        sessionData
    });
});

Router.post('/admin/EditCandidate',auth, (req, res) => {
    console.log(req.body.name);
    console.log(req.body);
    

    let query = "UPDATE `scandidate_data` " +
    "SET `name`= ?," +
    "`job_title` = ?," +
    "`email_id` = ?," +
    "`mobile` = ?," +
    "`current_location` = ?," +
    "`qualification` = ?," +
    "`Experience` = ?,"+
    "`ctc` = ?,"+
    "`ectc` = ?,"+
    "`notice_period` = ?,"+
    "`date_of_sharing` = ?,"+
    "`notes` = ?,"+
    "WHERE `S_No` = ?";
    let sqldata = req.body;
    let values = [sqldata.client_id,sqldata.name, sqldata.email, sqldata.address, sqldata.gst_no, sqldata.agreement_ref, sqldata.agreement_date, sqldata.commision,sqldata.pay_period_days,sqldata.repl_period_days,"Yes"];
    con.query(query, values, function (err, result) {
       if (err) console.log(err);
        console.log(result);
        res.redirect('/client');
     });
});


module.exports = Router;