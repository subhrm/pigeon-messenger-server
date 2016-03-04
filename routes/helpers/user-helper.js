var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
    }
});

var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function authenticateUser(id,suc,failed) {

    db.one("SELECT password FROM users where id=$1",[id.toString()])

    .then(function (data) {
        suc(data);
    })

    .catch(function (error) {
        failed();
    });

};

module.exports = {authenticateUser:authenticateUser};