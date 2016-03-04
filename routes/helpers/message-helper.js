var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
    }
});

var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function sendMessage(from,to,msg, suc,fail) {
    
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


function fetchMessage(){
    
}
module.exports = {sendMessage, fetchMessage};