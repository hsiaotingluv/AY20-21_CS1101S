// Question 1
function add(x,y) {
    function add_helper(x, y, carry) {
        if (is_null(x) && is_null(y)) {
            return (carry === 0) ? null : pair(carry, null);
        } else if (is_null(x)) {
            const num = head(y) + carry;
            const remainder = (num % 10);
            carry = math_floor(num / 10);
            return pair(remainder, add_helper(x, tail(y), carry));
        } else if (is_null(y)) {
            const num = head(x) + carry;
            const remainder = (num % 10);
            carry = math_floor(num / 10);
            return pair(remainder, add_helper(tail(x), y, carry));
        } else {
            const num = head(x) + head(y) + carry;
            const remainder = (num % 10);
            carry = math_floor(num / 10);
            return pair(remainder, add_helper(tail(x), tail(y), carry));
        }
    }
    return reverse(add_helper(reverse(x), reverse(y), 0));
}

// DO NOT EDIT:
const pi = list(3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7, 1, 6, 9, 3, 9, 9, 3, 7, 5, 1, 0, 5, 8, 2, 0, 9, 7, 4, 9, 4, 4, 5, 9, 2, 3, 0, 7, 8, 1, 6, 4, 0, 6, 2, 8, 6, 2, 0);
const e = list(2, 7, 1, 8, 2, 8, 1, 8, 2, 8, 4, 5, 9, 0, 4, 5, 2, 3, 5, 3, 6, 0, 2, 8, 7, 4, 7, 1, 3, 5, 2, 6, 6, 2, 4, 9, 7, 7, 5, 7, 2, 4, 7, 0, 9, 3, 6, 9, 9, 9, 5, 9, 5, 7, 4, 9, 6, 6, 9, 6, 7, 6, 2, 7, 7, 2, 4, 0, 7, 6, 6, 3, 0, 3, 5, 3, 5, 4);

// Question 2
function array_to_list(array) {
    let xs = null;
    for (let i=0; i<array_length(array); i=i+1) {
        xs = pair(array[i], xs);
    }
    return reverse(xs);
}

function list_to_array(xs) {
    let array = [];
    const len = length(xs);
    for (let i=0; i<len; i=i+1) {
        array[i] = head(xs);
        xs = tail(xs);
    }
    return array;
}

function add(x,y) {
    x = reverse(array_to_list(x));
    y = reverse(array_to_list(y));
    
    function add_helper(x, y, carry) {
        if (is_null(x) && is_null(y)) {
            return (carry === 0) ? null : pair(carry, null);
        } else if (is_null(x)) {
            const num = head(y) + carry;
            const remainder = (num % 10);
            carry = math_floor(num / 10);
            return pair(remainder, add_helper(x, tail(y), carry));
        } else if (is_null(y)) {
            const num = head(x) + carry;
            const remainder = (num % 10);
            carry = math_floor(num / 10);
            return pair(remainder, add_helper(tail(x), y, carry));
        } else {
            const num = head(x) + head(y) + carry;
            const remainder = (num % 10);
            carry = math_floor(num / 10);
            return pair(remainder, add_helper(tail(x), tail(y), carry));
        }
    }
    const result = reverse(add_helper(x, y, 0));
    return list_to_array(result);
}

// DO NOT EDIT:
const pi = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9, 5, 0, 2, 8, 8, 4, 1, 9, 7, 1, 6, 9, 3, 9, 9, 3, 7, 5, 1, 0, 5, 8, 2, 0, 9, 7, 4, 9, 4, 4, 5, 9, 2, 3, 0, 7, 8, 1, 6, 4, 0, 6, 2, 8, 6, 2, 0];
const e = [2, 7, 1, 8, 2, 8, 1, 8, 2, 8, 4, 5, 9, 0, 4, 5, 2, 3, 5, 3, 6, 0, 2, 8, 7, 4, 7, 1, 3, 5, 2, 6, 6, 2, 4, 9, 7, 7, 5, 7, 2, 4, 7, 0, 9, 3, 6, 9, 9, 9, 5, 9, 5, 7, 4, 9, 6, 6, 9, 6, 7, 6, 2, 7, 7, 2, 4, 0, 7, 6, 6, 3, 0, 3, 5, 3, 5, 4];
