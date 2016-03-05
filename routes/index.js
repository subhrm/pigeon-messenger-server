var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({
        message: ' YO ! welcome to Pigeon Messenger api !',
        supported_apis: ["authenticate", "sendmessage", "fetchmessage", "getuserlist"]
    });
});

module.exports = router;