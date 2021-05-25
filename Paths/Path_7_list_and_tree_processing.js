// Question 1
// Produces a list of integers [a, b],
// assuming a, b are integers.

function enum_list(a, b) {
    return a > b
        ? null
        : append(list(a), enum_list(a + 1, b));
}

enum_list(0, 5);

// Question 2
// Produces a list of integers [a, b],
// assuming a, b are integers.

function enum_list(a, b) {
    return build_list(b - a + 1, x => a + x);
    //(b - a) is the length
}

// Question 3
// given a list of integers xs, returns a list that 
//   contains only the odd integers in xs.
function odd_only(xs) {
    return filter(x => math_abs(x) % 2 === 1, xs);
}

// odd_only(enum_list(-3, 6));

// given a list of positive integers xs, returns a list that 
//   contains only the prime numbers in xs.
// Hint: write a helper function.
function prime_only(xs) {
    function is_prime(n) {
        function helper(n, divisor) {
            return n <= 1
                ? false
                : divisor === 1
                    ? true
                    : n % divisor === 0
                        ? false
                        : helper(n, divisor - 1);
        }
        return helper(n, n - 1);
    }
    return filter(is_prime, xs);
}

// Question 4
const display = custom_display; // DO NOT EDIT

// Calls display on every item in the list xs.
function traverse(xs) {
    if (is_null(xs)) {
        return display(null);
    } else {
        display(head(xs));
        return traverse(tail(xs));
    }
}

// Question 5
const display = custom_display; // DO NOT EDIT

// Calls display on every item in the tree xs.
function traverse(xs) {
    // Modify this function to work on trees.
    if (is_null(xs)) {
        return display(null);
    } else {
        is_list(head(xs))
        ? traverse(head(xs))
        : display(head(xs));
        return traverse(tail(xs));
    }
}

// Question 6
// Given a tree xs, produces a list containing items in xs
// in the same order as traverse.

function flatten(xs) {
    return accumulate((curr, rest) =>
        is_list(curr)
            ? append(flatten(curr), rest)
            : pair(curr, rest)
            , null, xs);
}
