// Question 1
Normal order reduction

// Question 2
Applicative order reduction

// Question 3
Applicative order reduction

// Question 4
Iterative process

// Question 5
Recursive process

// Question 6
Steps 2

// Question 7
Steps 1

// Question 8
function sum(n) {
    return n <= 0 ? 0 : call_sum(n, 0, 0);
}

function call_sum(n, count, sum) {
    return count > n ? sum : call_sum(n, count + 1, sum + count);
}

// Question 9
// recursive process
function sum(n) {
    return n === 0 ? 0 : n + sum(n - 1);
}

//recursive process
function sum_odd(n) {
    return n <= 0 ? 0 : 2 * (n - 1) + 1 + sum_odd(n - 1);
}

//iteractive process
function sum_odd_calculate(n, count, sum) {
    return count >= n 
            ? sum 
            : sum_odd_calculate(n, count + 1, sum + (2 * count) + 1);
}

function sum_odd(n) {
    return n === 0 
            ? 0 
            : sum_odd_calculate(n, 0, 0);
}

function sum_odd_lte(n) {
    return n % 2 === 0 
            ? sum_odd_lte_calculate(n - 1, 0)
            : sum_odd_lte_calculate(n, 0);
}

function sum_odd_lte_calculate(n, sum) {
    return n <= 0
            ? sum
            : sum_odd_lte_calculate(n - 2, sum + n);
}
