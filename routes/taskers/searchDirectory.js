var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
    }
});

var taskResponser = require("./taskResponser");

var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function searchDirectory(from,action) {

    var q = '%' + action + '%';
    db.many("SELECT * FROM directory where USER_ID like $1", [q])

    .then(function (data) {
        var resp = " Found " + data.length.toString() + " results in Directory \n";
        console.log(resp);
        for (var i = 0; i < data.length; i++) {
            resp = resp + " Result " + (i+1).toString() + " - User Name  "+ data[i].full_name + 
                    " , Email: " + data[i].email +" , mobile: " + data[i].mobile ;
        }
        
        taskResponser.sendMessage(from,resp);
    })

    .catch(function (error) {
        console.log("Search directory failed");
        console.log(error);
        var resp = " Sorry ! Could not find any results in Directory \n";
        taskResponser.sendMessage(from,resp);
    });

};

function act(from, action) {
    console.log(" trying to Search " + action + " for " + from);

    action = action.trim();
    
    searchDirectory(from,action);
};

module.exports = {
    act
};