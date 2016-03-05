var express = require('express');
var router = express.Router();

var userHelper = require("./helpers/user-helper")

router.post('/', function (req, res, next) {

    console.log(req.body);

    var id = req.body.id;
    this.password = req.body.payload; // encrypted

    console.log("authentication is now called , id : ");
    console.log(id);

    this.resp = res;

    this.authSuccessful = function (data) {
        console.log("authnticted !!!");
        console.log("Password from DB : " + data.password.trim());
        console.log("Password from User : " + this.password.trim());
        if (data.password.trim() == this.password.trim()) {
            this.resp.json({
                auth_status: "yes",
            });
        } else {
            this.resp.json({
                auth_status: "no",
            });
        }
        
    };

    this.authFailed = function (data) {
        this.resp.json({
            auth_status: "no",
        })
    };

    userHelper.authenticateUser(id,this.authSuccessful.bind(this), this.authFailed.bind(this));
});

module.exports = router;