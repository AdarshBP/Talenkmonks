const express = require('express');
const path = require('path');
const rootdir = require("../util/path");
const session = require('express-session');
const Router = express.Router();
const con = require('../connection');

var error_message = "";
var auth = function (req, res, next) {
    if (req.session.email_id == undefined && req.session.role == undefined)
        res.redirect('/');
    else
        next();
}

Router.get('/admin', auth, (req, res) => {
    console.log("client logged into the account :" + req.session.name)
    res.redirect('/admin/CandidateData');
});

Router.get('/admin/CandidateData', auth, (req, res) => {

    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }
    let query = "SELECT * FROM candidate_data order by SNO";
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
            message = error_message;
            error_message = "";
            // console.log(result);
            res.render(path.join(rootdir, 'views', 'adminCandidateData'), {
                message,
                result,
                sessionData
            });
        }
    });

});

Router.get('/admin/ClientData', auth, (req, res) => {

    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }
    let query = "SELECT * FROM client_data order by SNO";
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
            message = error_message;
            error_message = "";
            console.log(result);
            res.render(path.join(rootdir, 'views', 'adminClientPage'), {
                message,
                result,
                sessionData
            });
        }
    });
});

Router.get('/admin/JobData', auth, (req, res) => {

    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }

    var Allclientname ="";
    let query = "SELECT `client_name`,`client_id` FROM client_data order by SNO desc";
    con.query(query, function (err, result) {
        if (err) {
            console.log(err);
            console.log('Sorry !! database side error ');
            var errorText = 'Sorry !! databse side errors ,Please try again later ';
            res.render(path.join(rootdir, 'views', 'login'), {
                error: errorText
            });
        } else {
            Allclientname= result;
            console.log("CLIENT NAME : ");
            console.log(Allclientname);
        }
    });
    query = "SELECT * FROM job_data order by SNO";
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
            message = error_message;
            error_message = "";
            console.log(result);
            res.render(path.join(rootdir, 'views', 'adminjobData'), {
                Allclientname,
                message,
                result,
                sessionData
            });
        }
    });
});

Router.get('/admin/JoineeData', auth, (req, res) => {

    let sessionData = {
        Session_name: req.session.name,
        Session_email_id: req.session.email_id,
        Session_role: req.session.role
    }
    let query = "SELECT * FROM joinee_data order by SNO";
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
            res.render(path.join(rootdir, 'views', 'adminjoineePage'), {
                result,
                sessionData
            });
        }
    });
});

// ================  candidiate routes =====================
Router.post('/admin/addCandidateDetails', auth, (req, res) => {
    console.log(req.body.name);
    console.log(req.body);
    let query = " INSERT INTO candidate_data" +
        "(name,job_title,email_id,mobile,current_location,qualification,Experience,ctc,ectc,notice_period,date_of_sharing,notes)" +
        " VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    let sqldata = req.body;
    let values = [sqldata.name, sqldata.job_title, sqldata.email, sqldata.mobile, sqldata.current_location, sqldata.qualification, sqldata.Experience, sqldata.ctc, sqldata.ectc, sqldata.notice_period, sqldata.date_of_sharing, sqldata.notes];
    con.query(query, values, function (err, result) {
        error_message = "success"
        if (err) {
            console.log(err);
            error_message = "failed"
        }
        console.log(result);
        res.redirect('/admin');
    });
});

Router.post('/admin/EditCandidate', auth, (req, res) => {
    console.log(req.body.name);
    console.log(req.body);

    let query = "UPDATE `candidate_data` " +
        "SET `name`= ?," +
        "`job_title` = ?," +
        "`email_id` = ?," +
        "`mobile` = ?," +
        "`current_location` = ?," +
        "`qualification` = ?," +
        "`Experience` = ?," +
        "`ctc` = ?," +
        "`ectc` = ?," +
        "`notice_period` = ?," +
        "`date_of_sharing` = ?," +
        "`notes` = ? " +
        " WHERE `SNO` = ?";
    let sqldata = req.body;
    let values = [sqldata.name, sqldata.job_title, sqldata.email, sqldata.mobile, sqldata.current_location, sqldata.qualification, sqldata.Experience, sqldata.ctc, sqldata.ectc, sqldata.notice_period, sqldata.date_of_sharing, sqldata.notes, sqldata.SNO];
    con.query(query, values, function (err, result) {
        error_message = "success"
        if (err) {
            console.log(err);
            error_message = "failed"
        }
        console.log(result);
        res.redirect('/admin');
    });
});

Router.post('/admin/DeleteCandidate', auth, (req, res) => {

    console.log(req.body);

    let query = "DELETE FROM candidate_data where SNO = ?";
    let sqldata = req.body;
    let values = [sqldata.SNO];
    con.query(query, values, function (err, result) {
        error_message = "success"
        if (err) {
            console.log(err);
            error_message = "failed"
        }
        console.log(result);
        res.redirect('/admin');
    });
});

// ================  client routes =====================
Router.post('/admin/addClientDetails', auth, (req, res) => {
    console.log(req.body.name);
    console.log(req.body);
    let query = " INSERT INTO client_data" +
        "(client_id,client_name,client_email_id,address,gst_no,agreement_ref,agreement_date,commision,pay_period_days,repl_period_days,live_status)" +
        " VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        let sqldata = req.body;
        let values = [sqldata.client_id, sqldata.name, sqldata.email, sqldata.address, sqldata.gst_no, sqldata.agreement_ref, sqldata.agreement_date, sqldata.commision, sqldata.pay_period_days, sqldata.repl_period_days,"Yes"];
        con.query(query, values, function (err, result) {
            error_message = "success";
            if (err) {
                console.log(err);
                error_message = "failed"
            }
            console.log(result);
            res.redirect('/admin/ClientData');
        });
});

Router.post('/admin/EditClient', auth, (req, res) => {
    //console.log(req.body.name);
    //console.log(req.body);
    let query = "UPDATE `client_data` " +
        "SET `client_id`= ?," +
        "`client_name` = ?," +
        "`client_email_id` = ?," +
        "`address` = ?," +
        "`gst_no` = ?," +
        "`agreement_ref` = ?," +
        "`agreement_date` = ?," +
        "`commision` = ?," +
        "`pay_period_days` = ?," +
        "`repl_period_days` = ?," +
        "`live_status` = ?" +
        " WHERE `SNO` = ?";
    let sqldata = req.body;
    let values = [sqldata.client_id, sqldata.name, sqldata.email, sqldata.address, sqldata.gst_no, sqldata.agreement_ref, sqldata.agreement_date, sqldata.commision, sqldata.pay_period_days, sqldata.repl_period_days, sqldata.live_status, sqldata.SNO];
    con.query(query, values, function (err, result) {
        error_message = "success";
        if (err) {
            error_message = "failed"
            console.log(err);          
        }
        //console.log("Client data "+result);
        res.redirect('/admin/ClientData');
    });
});

Router.post('/admin/DeleteClient', auth, (req, res) => {

    console.log(req.body);

    let query = "DELETE FROM client_data where SNO = ?";
    let sqldata = req.body;
    let values = [sqldata.SNO];
    con.query(query, values, function (err, result) {
        error_message = "success"
        if (err) {
            console.log(err);
            error_message = "failed"
        }
        console.log(result);
        res.redirect('/admin/ClientData');
    });
});

//==================  job updates  ===========================
Router.post('/admin/addJobDetails', auth, (req, res) => {
    console.log(req.body);
    let query = "INSERT INTO job_data"+
    "(client_id,client_name,job_title,job_id_key,job_desc,date_of_posting,no_of_position,no_of_cadidates_offered,live_status)"+
    "VALUES(?,?,?,?,?,?,?,?,?);"
        let sqldata = req.body;
        let values = [sqldata.client_id, sqldata.client_name, sqldata.job_title, sqldata.job_id_key, sqldata.job_desc, sqldata.date_of_posting, sqldata.no_of_position, sqldata.no_of_cadidates_offered,"Yes"];
        con.query(query, values, function (err, result) {
            error_message = "success";
            if (err) {
                console.log(err);
                error_message = "failed"
            }
            console.log(result);
            res.redirect('/admin/JobData');
        });
});

Router.post('/admin/EditJob', auth, (req, res) => {
    console.log(req.body.name);
    console.log(req.body);
    let query = "UPDATE `job_data` " +
        "SET `client_id`= ?," +
        "`client_name` = ?," +
        "`job_title` = ?," +
        "`job_id_key` = ?," +
        "`job_desc` = ?," +
        "`date_of_posting` = ?," +
        "`no_of_position` = ?," +
        "`no_of_cadidates_offered` = ?," +
        "`live_status` = ?" +
        " WHERE `SNO` = ?";
    let sqldata = req.body;
    console.log("check data"+sqldata.no_of_cadidates_offered);
    let values = [sqldata.client_id, sqldata.client_name, sqldata.job_title, sqldata.job_id_key, sqldata.job_desc, sqldata.date_of_posting, sqldata.no_of_position, sqldata.no_of_cadidates_offered,sqldata.live_status, sqldata.SNO];
    con.query(query, values, function (err, result) {
        error_message = "success";
        if (err) {
            error_message = "failed"
            console.log(err);  
                   
        }
        console.log(result);
        res.redirect('/admin/JobData');
    });
});

Router.post('/admin/DeleteJob', auth, (req, res) => {

    console.log(req.body);

    let query = "DELETE FROM job_data where SNO = ?";
    let sqldata = req.body;
    let values = [sqldata.SNO];
    con.query(query, values, function (err, result) {
        error_message = "success"
        if (err) {
            console.log(err);
            error_message = "failed"
        }
        console.log(result);
        res.redirect('/admin/JobData');
    });
});



module.exports = Router;