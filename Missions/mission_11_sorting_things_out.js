// Question 1
function partition(xs, p) {
    const smaller_list = filter(x => x <= p, xs);
    const larger_list = filter(x => x > p, xs);
    return is_null(xs)
        ? xs
        : pair(smaller_list, larger_list);
}

// Test
const my_list = list(1, 2, 6, 4, 5, 3);
partition(my_list, 4);

// Comments
/*
The type of the base case is incorrect. (-1 mark)
What is the return type of the function, and what is your implementation returning in the base case?
*/

// Question 2
function partition(xs, p) {
    const smaller_list = filter(x => x <= p, xs);
    const larger_list = filter(x => x > p, xs);
    return is_null(xs)
        ? xs
        : pair(smaller_list, larger_list);
}

function quicksort(xs) {
    if (is_null(xs)) {
        return null;
    } else if (length(xs) === 1) {
        return xs;
    } else {
        const head_list = head(partition(tail(xs), head(xs)));
        const tail_list = tail(partition(tail(xs), head(xs)));
        return append(
                quicksort(head_list), 
                append(list(head(xs)), 
                quicksort(tail_list)));
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
quicksort(my_list);

// Question 3
// Theta(n)

// Question 4
// Theta(n^2)

// Question 5
// Theta(nlog(n))
