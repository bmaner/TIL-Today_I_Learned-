"use strict";
exports.__esModule = true;
var hello = "hello";
var hello2 = "hello2";
var timeoutPromise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve("1 sec");
    }, 1000);
});
timeoutPromise.then(console.log);
var util_1 = require("./util");
var value = util_1["default"](1, 2);
console.log(value);
