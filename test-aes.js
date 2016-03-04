var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

var pwd = "my long password";
var message = "My Test Message";

var e = AES.encrypt(message,pwd).toString();
var p = AES.decrypt(e,pwd).toString(CryptoJS.enc.Utf8);

console.log(e);
console.log(p);
