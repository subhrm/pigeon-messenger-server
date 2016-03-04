var express = require('express');
var router = express.Router();

var msgHelper = require("./helpers/message-helper");

router.post('/', function (req, res, next) {


    var from = req.body.from;
    var payload = req.body.payload;

    console.log("sendmessage is now called ");

    this.resp = res;

    this.sendSuccessful = function (data) {
        this.resp.json({
            status: "sucess"
        })
    };
    
    this.sendFailed = function (data) {
        this.resp.json({
            status: "failed"
        })
    };

    msgHelper.sendMessage(from,payload, this.sendSuccessful.bind(this) , this.sendFailed.bind(this) );
});

module.exports = router;