// Question 1
// put the first n elements of xs into a list
function take(xs, n) {
    return is_null(xs) || n === 0
        ? null
        : pair(head(xs), take(tail(xs), n - 1));
}

// drop the first n elements from list, return rest
function drop(xs, n) {
    return is_null(xs)
        ? null
        : n === 0
            ? xs
            : drop(tail(xs), n - 1);
}

// Question 2
// given a non-empty list xs, returns the smallest item in xs
function smallest(xs) {
    const compare = (a, b) => a < b ? a : b;
    return is_null(tail(xs))
        ? head(xs)
        : compare(head(xs), smallest(tail(xs)));
}

// Question 3
// Removes the first instance of x from xs
function remove(x, xs) { 
    return is_null(xs)
        ? null
        : head(xs) === x
            ? tail(xs)
            : pair(head(xs), remove(x, tail(xs)));
}

// Question 4
function selection_sort(xs) {
    if(is_null(xs)) {
        return null;
    } else {
        return pair(smallest(xs), selection_sort(remove(smallest(xs), xs)));
    }
}

// Question 5
//----- DO NOT CHANGE -----
const good_enough = 0.0000001;

// Produces a function such that f(x) = x^k - b
// A root for f(x) also satisfies x^k = b.
function make_root_finder(k, b) {
    function f(x) {
        // x^k - b = 0
        return math_pow(x, k) - b;
    }
    return f;
}

//----- END DO NOT CHANGE -----

function midpoint(a, b) {
    return (a+b) / 2; // Subtask 1.
}

function find_root(f, a, b) {
    if(b - a < good_enough) {
        return a;
    } else {
        const c = midpoint(a, b);
        // Subtask 2: Complete this portion.
        // You need to examine the value f(c)
        return f(c) > 0
            ? find_root(f, a, c)  // Midpoint positive
            : find_root(f, c, b);
    }
}

// For example:
// find_root(make_root_finder(2, 3), 0, 100);
//looks for a number such that x^2 = 3 between 0 and 100.
