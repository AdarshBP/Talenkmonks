const express = require('express');
const path=require('path');
const rootdir = require("../util/path");
const session = require('express-session');
const Router = express.Router();
const con =require('../connection');


var auth = function (req, res, next) {
    if (req.session.email_id == undefined && req.session.role != 'U')
        res.redirect('/');
    else
        next();
}
 
Router.get('/user', auth, (req, res) => {
    console.log("User logged into the account :" + req.session.name)
    res.redirect('/user/CandidateData');
});

Router.get('/user/CandidateData', auth, (req, res) => {
    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }
    let query = "SELECT * FROM candidate_data where email_id = '" + req.session.email_id + "'";
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
            result.forEach((rowData) => {
                rowData.date_of_sharing = rowData.date_of_sharing.toISOString().slice(0, 10);
            });
            //console.log(result);
            res.render(path.join(rootdir, 'views', 'candidateHomePage'), {
                result,
                sessionData
            });
        }
    });
});

Router.get('/user/AddCandidateData', auth, (req, res) => {
    console.log( req.session.name + "is in addCandidate details");
    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }
    res.render(path.join(rootdir, 'views', 'addCandidateDetails'), {
        sessionData
    });
});


Router.post('/user/addCandidateDetails',auth, (req, res) => {
    console.log(req.body.name);
    console.log(req.body);
    let query = " INSERT INTO candidate_data"+
    "(name,job_title,email_id,mobile,current_location,qualification,Experience,ctc,ectc,notice_period,date_of_sharing,notes)"+
    " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    let sqldata = req.body;
    let values = [sqldata.name, sqldata.job_title, sqldata.email, sqldata.mobile, sqldata.current_location, sqldata.qualification, sqldata.Experience,sqldata.ctc,sqldata.ectc,sqldata.notice_period,sqldata.date_of_sharing,sqldata.notes];
    con.query(query, values, function (err, result) {
       if (err) console.log(err);
        console.log(result);
        res.redirect('/user');
     });
});



module.exports = Router;