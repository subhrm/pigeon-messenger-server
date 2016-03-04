var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
    }
});

var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function sendMessage(from,payload, suc,fail) {
    
    var i = payload.indexOf("|");
    var msg = payload.slice(i+1);
    var to = payload.slice(0,i);
    var stmt = 'INSERT INTO messages("from", "to", message, "timestamp") VALUES ($1, $2, $3, current_timestamp)';

    db.none(stmt,[from,to,msg])

    .then(function () {
        console.log("message sent sucessfully");
        suc();
    })

    .catch(function (error) {
        console.log("from message-helper - message send failed "); // display the error;
        console.log(error);
        fail();
    });

};


function fetchMessage(id,payload, suc,fail){
    var timestamp = payload.trim();
    timestamp.length == 0 ? timestamp = "2016-01-01":timestamp=timestamp;
    var stmt = 'select from messages where ( "to"=$1 or "to" = "GLOBAL" ) and "timestamp" > timestamp $2';
    
}
module.exports = {sendMessage, fetchMessage};