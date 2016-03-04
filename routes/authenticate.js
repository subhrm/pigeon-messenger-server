var express = require('express');
var router = express.Router();
var pg = require('pg');
//var bodyParser = require('body-parser')

//var jsonParser = bodyParser.json()

/* GET users listing. */
router.post('/', function (req, res, next) {

    console.log(req.body);

    var id = req.body.id;
    var payload = req.body.payload; // encrypted

    console.log("authentication is now called , id : ");
    console.log(id);

    //pg connection test
    console.log('printing env variable');
    console.log(process.env.DATABASE_URL);
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query("SELECT * FROM users where id='" + id.toString() + "'", function (err, result) {
            if (err) {
                console.error(err);
                res.send("Error " + err);
            } else {
                console.log("result found");
                if (result.rowCount == 0) {
                    res.json({
                        auth_status: "no",
                        password: " not found"
                    })
                } else {
                    //console.log(result.rows[0].password);
                    res.json({
                        auth_status: "yes",
                        password: result.rows[0].password
                    })
                }
            }
        });
    });



});

module.exports = router;