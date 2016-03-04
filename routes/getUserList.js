var express = require('express');
var router = express.Router();

var userHelper = require("./helpers/user-helper");

router.get('/', function (req, res, next) {

    console.log("getUserList is now called ");

    this.resp = res;

    this.fetchSuccessful = function (data) {
        var users =[];
        
        for(var i=0;i< data.length;i++){
            users.push(data[i].id.trim());
        }
        
        this.resp.json({
            status: "sucess",
            users: users
        })
    };
    
    this.fetchFailed = function (data) {
        this.resp.json({
            status: "failed"
        })
    };

    userHelper.getUserList(this.fetchSuccessful.bind(this) , this.fetchFailed.bind(this) );
});

module.exports = router;