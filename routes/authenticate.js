var express = require('express');
var router = express.Router();
//var bodyParser = require('body-parser')

//var jsonParser = bodyParser.json()

/* GET users listing. */
router.post('/',  function(req, res, next) {
    
    console.log(req.body);
    
    var id = req.body.id;
    var payload = req.body.payload;   // encrypted
    
    console.log("authentication is now called , id : " );
    console.log(id);
    
    res.json({auth_status:"yes" , yourid : id });
});

module.exports = router;
