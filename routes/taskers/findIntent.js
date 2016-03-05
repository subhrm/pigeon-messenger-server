var dict = {
    "search" : "search",
    "serch"  : "search",
    "searhc" : "search",
    "saerch" : "search"
}

var helper = {
    search : require("./searchDirectory")
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