let x = 10;

{
  let x = 20;

  console.log("Trong block:", x);
}

console.log("Ngoài block:", x);

const y = 30;
y = 40;

console.log("y =", y);
