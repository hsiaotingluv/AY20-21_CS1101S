// Question 1
function d_split_list(xs) {
    // a and b are temporary pointers (references to xs)
    let a = xs;
    let b = xs;
    const midpoint = math_round(length(xs)/2);
    
    // run b (non distructive)
    for (let i = 0; i < midpoint; i = i+1) {
        b = tail(b);
    }
    
    // run a (distructive)
    for (let i = 0; i < midpoint; i = i+1) {
        if (i === midpoint - 1) {
            set_tail(a, null);
        } else {
            a = tail(a);
        }
    }
    a = xs;
    
    return pair(a, b);
}

// Test
const my_list1 = list(1, 2, 3, 4, 5, 6);
const my_list2 = list(5, 4, 3, 2, 1);
d_split_list(my_list1);
d_split_list(my_list2);

// Question2

function d_merge(xs, ys) {
    let L = xs;
    
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        if (head(xs) <= head(ys)) {
            L = xs;
            set_tail(L, d_merge(tail(xs), ys));
        } else {
            L = ys;
            set_tail(L, d_merge(xs, tail(ys)));
        }
    }
    return L;
}

// Test
const my_list1 = list(2, 4, 5, 9);
const my_list2 = list(3, 5, 8);
d_merge(my_list1, my_list2);

// Question 3

function d_split_list(xs) {
    let a = xs;
    let b = xs;
    const midpoint = math_round(length(xs)/2);
    
    for (let i = 0; i < midpoint; i = i+1) {
        b = tail(b);
    }
    
    for (let i = 0; i < midpoint; i = i+1) {
        if (i === midpoint - 1) {
            set_tail(a, null);
        } else {
            a = tail(a);
        }
    }
    a = xs;
    
    return pair(a, b);
}

function d_merge(xs, ys) {
    let L = xs;
    
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        if (head(xs) <= head(ys)) {
            L = xs;
            set_tail(L, d_merge(tail(xs), ys));
        } else {
            L = ys;
            set_tail(L, d_merge(xs, tail(ys)));
        }
    }
    return L;
}

function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const pair_list = d_split_list(xs);
        return d_merge(d_merge_sort(head(pair_list)), 
                d_merge_sort(tail(pair_list)));
    }
}

// Test
const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
d_merge_sort(my_list);
