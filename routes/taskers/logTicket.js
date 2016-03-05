var pgp = require('pg-promise')({
    connect: function (client) {
        var cp = client.connectionParameters;
    }
});

var taskResponser = require("./taskResponser");

var cn = process.env.DATABASE_URL;
var db = pgp(cn);

function logTicket(from,action) {

    
        var resp = " Sorry to see you in trobule ! We have logged an AHD request for you. You would soon recive an email with your AHD ticket details";
        console.log(resp);
        
        taskResponser.sendMessage(from,resp);
};

function act(from, action) {
    console.log(" trying to Log " + action + " for " + from);

    action = action.trim();
    
    logTicket(from,action);
};

module.exports = {
    act
};