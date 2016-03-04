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


function fetchMessages(id,payload, suc,fail){
    payload === undefined ? payload = "" : payload = payload.trim();
    var timestamp = ""
    payload.length == 0 ? timestamp = "2016-01-01":timestamp=payload;
    var stmt = 'SELECT * FROM messages WHERE "to"=$1  AND "timestamp" > TIMESTAMP WITH TIME ZONE $2';
    
    db.many(stmt,[id,timestamp])

    .then(function (data) {
        console.log("messages fetched sucessfully");
        suc(data);
    })

    .catch(function (error) {
        console.log("from message-helper - message fetching failed "); // display the error;
        console.log(id + " " + timestamp + " " +stmt);
        console.log(error);
        fail();
    });
    
};

module.exports = {sendMessage, fetchMessages};