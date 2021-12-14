let name = "meeran";

let add = (a, b) => a + b;

let sum = (...numbers) => {
    return numbers.reduce((prev, curr) => {
        return prev + curr;
    });
};

console.log(sum);
