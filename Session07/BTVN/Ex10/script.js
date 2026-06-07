"use strict";
function identity(arg) {
    return arg;
}
let textResult = identity("Hôm nay học bài !");
console.log(textResult);
let numberResult = identity(2026);
console.log(numberResult);
let stringBox = {
    content: "Xin chào",
};
console.log(stringBox);
let numberBox = {
    content: 10000,
};
console.log(numberBox);
