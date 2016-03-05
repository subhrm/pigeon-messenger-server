/* this module sends the response from teh tasker */

var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
    }
});


var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function sendMessage(to, msg) {
    
    console.log("trying to send response from ASSISTANT , msg : " + msg );
    
    var stmt = 'INSERT INTO messages("from", "to", message, "timestamp") VALUES ($1, $2, $3, current_timestamp)';

    db.none(stmt,['ASSISTANT',to,msg])

    .then(function () {
        console.log("task reply sent sucessfully");
    })

    .catch(function (error) {
        console.log("from taskResponser - reponse send failed "); // display the error;
        console.log(error);
    });

};

module.exports={sendMessage};