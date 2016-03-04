var express = require('express');
var router = express.Router();

var msgHelper = require("./helpers/message-helper");

router.post('/', function (req, res, next) {


    var id = req.body.id;
    var payload = req.body.payload;

    console.log("fetchmessage is now called ");

    this.resp = res;

    this.fetchSuccessful = function (data) {
        var messages = [];

        console.log(" callback fetchSuccessful called");

        for (var i = 0; i < data.length; i++) {
            messages.push({
                from: data[i].from,
                message: data[i].message,
                timestamp: data[i].timestamp
            });
        }

        this.resp.json({
            status: "success",
            messages: messages
        })
    };

    this.fetchFailed = function (data) {
        console.log(" callback fetchFailed called");
        this.resp.json({
            status: "failed",
            messages: []
        })
    };

    msgHelper.fetchMessages(id, payload, this.fetchSuccessful.bind(this), this.fetchFailed.bind(this));
});

module.exports = router;