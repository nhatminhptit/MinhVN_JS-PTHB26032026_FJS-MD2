function identity<T>(arg: T): T {
  return arg;
}

interface Box<T> {
  content: T;
}

let textResult = identity<string>("Hôm nay học bài !");
console.log(textResult);

let numberResult = identity<number>(2026);
console.log(numberResult);

let stringBox: Box<string> = {
  content: "Xin chào",
};
console.log(stringBox);

let numberBox: Box<number> = {
  content: 10000,
};
console.log(numberBox);
