var intentFinder =  require("../taskers/findIntent");

function assist(from,msg){
    var i = msg.indexOf(" ");
    var verb = msg.slice(0,i);
    var action = msg.slice(i+1);
    console.log("here to assist you : " + from + "! with your query "+msg);
    
    var intent = intentFinder.findIntent(verb);
    
    if (intent.found){
        console.log(" Intent found");
        intent.helper.act(from,action);
    }
};

module.exports = {assist};