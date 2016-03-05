var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
    }
});

var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function authenticateUser(id,suc,failed) {

    db.one("SELECT * FROM users where id='"+[id.toString().trim()]+"' ")

    .then(function (data) {
        console.log("fetch successfull in authenticateUser for :" + id.toString().trim());
        console.log("SELECT * FROM users where id='"+[id.toString().trim()]+"' ");
        suc(data);
    })

    .catch(function (error) {
        failed();
    });

};

function getUserList(suc,failed) {

    db.many("SELECT id FROM users ")

    .then(function (data) {
        suc(data);
    })

    .catch(function (error) {
        failed();
    });

};

module.exports = {authenticateUser, getUserList};