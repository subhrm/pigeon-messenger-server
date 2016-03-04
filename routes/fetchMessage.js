var express = require('express');
var router = express.Router();

var msgHelper = require("./helpers/message-helper");

router.post('/', function (req, res, next) {


    var id = req.body.id;
    var timestamp = req.body.timestamp;

    console.log("fetchmessage is now called ");

    this.resp = res;

    this.fetchSuccessful = function (data) {
        var messages =[];
        
        this.resp.json({
            status: "sucess",
            messages: messages
        })
    };
    
    this.fetchFailed = function (data) {
        this.resp.json({
            status: "failed"
        })
    };

    msgHelper.sendMessage(id, timestamp, this.fetchSuccessful.bind(this) , this.fetchFailed.bind(this) );
});

module.exports = router;