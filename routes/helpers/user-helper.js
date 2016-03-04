var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
        console.log("Connected to database:", cp.database);
    }
});

var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function authenticateUser(id,suc,failed) {

    db.one("SELECT * FROM users where id='" + id.toString() + "'")

    .then(function (data) {
        console.log("from user-helper");
        console.log(data);
        suc(data);
    })

    .catch(function (error) {
        console.log("from user-helper");
        console.log("id not found"); // display the error;
        failed();
    });

};

module.exports = {authenticateUser:authenticateUser};