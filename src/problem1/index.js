const validateInput = (n) => {
    if (typeof n !== 'number' || n < 0 || n > Number.MAX_SAFE_INTEGER) {
        throw new Error('Input must be a number and greater than 0 and less than Number.MAX_SAFE_INTEGER');
    }
};

// solution 1
const sum_to_n_solution1 = (n) => {
    try {
        validateInput(n);
        // using math formula
        return n * (n + 1) / 2;
    } catch (error) {
        return error.message;
    }
};

// solution 2
const sum_to_n_solution2 = (n) => {
    try {
        validateInput(n);
        // using loop
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    } catch (error) {
        return error.message;
    }
};

// solution 3
const sum_to_n_solution3 = (n) => {
    try {
        validateInput(n);
        // using recursion
        if (n === 0) {
            return 0;
        }
        return n + sum_to_n_solution3(n - 1);
    } catch (error) {
        return error.message;
    }
};

console.log(sum_to_n_solution1(15));
console.log(sum_to_n_solution2(15));
console.log(sum_to_n_solution3(15));
