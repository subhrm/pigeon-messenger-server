var dict = {
    "search" : "search",
    "serch"  : "search",
    "searhc" : "search",
    "saerch" : "search",
    "log" : "log",
    "ahd" : "log",
    "ticket" : "log"
    
}

var helper = {
    search : require("./searchDirectory"),
    log : require("./logTicket"),
    bookroom : require("./bookRoom")
}

function findIntent(word){
    word = word.toLowerCase();
    console.log("trying to find : "+word);
    if (word  in dict){
        return {
            found:true,
            helper : helper[dict[word]] 
        }
    }else{
        return {
            found:false
        }
    }
}

module.exports = {findIntent}; 