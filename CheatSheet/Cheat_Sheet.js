Cheat_sheet.js

// Array functions
//---------------------------------------------------------------
function swap(A, i, j) {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
}

function copy_array(A) {
    const len = array_length(A);
    const B = [];
    for (let i = 0; i < len; i = i + 1) {
        B[i] = A[i];
    }
    return B;
}

function reverse_array(A) {
    const len = array_length(A);
    const half_len = math_floor(len / 2);
    for (let i = 0; i < half_len; i = i + 1) {
        swap(A, i, len - 1 - i);
    }
    return A;
}

function array_to_list(A) {
    const len = array_length(A);
    let L = null;
    for (let i = len - 1; i >= 0; i = i - 1) {
        L = pair(A[i], L);
    }
    return L;
}

function list_to_array(L) {
    const A = [];
    let i = 0;
    for (let p = L; !is_null(p); p = tail(p)) {
        A[i] = head(p);
        i = i + 1;
    }
    return A;
}

function sort_ascending(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        const x = A[i];
        let j = i - 1;
        while (j >= 0 && A[j] > x) {
            A[j + 1] = A[j];
            j = j - 1;
        }
        A[j + 1] = x;
    }
    return A;
}

function array_to_string(array) {
    const len = array_length(array);
    let str = "";
    for (let i = 0; i < len; i = i + 1) {
        str = str + stringify(array[i]);
    }
    return str;
}

function enum_array(start, end) {
    const a = [];
    function iter(i) {
        if (start <= end) {
            a[i] = start;
            start = start + 1;
            iter(i + 1);
        } else {}
    }
    iter(0);
    return a;
}
enum_array(4, 8); // return [4, 5, 6, 7, 8]

function append_array(a1,a2) {
    let A = [];
    const l1 = array_length(a1);
    const l2 = array_length(a2);
    for (let i=0; i<l1; i=i+1) {
        A[i] = a1[i];
    }
    for (let j=0; j<l2; j=j+1) {
        A[l1+j] = a2[j];
    }
    return A;
}
const A = [1, 2, 3];
const B = [4, 5, 6];
append_array(A,B); // return [1, 2, 3, 4, 5, 6]

function map_array(f, a) {
    const A = [];
    const len = array_length(a);
    for (let i=0; i<len; i=i+1) {
        A[i] = f(a[i]);
    }
    return A;
}
const A = [3,1,5]
map_array(x => 2*x, A); // return [6,2,10]

function filter_array(f, a) {
    const f_array = [];
    let index = 0;
    const len = array_length(a);
    for (let i=0; i<len; i=i+1) {
        if (f(a[i])) {
            f_array[index] = a[i];
            index = index + 1;
        } else {}
    }
    return f_array;
}

const A = [1, 2, 3, 4];
filter_array(x => x % 2 === 0, A); // return [2,4]

function sum_array(array) {
    let sum = 0;
    const len = array_length(array);
    for (let i=0; i<len; i=i+1) {
        sum = sum + array[i];
    }
    return sum;
}
const A = [1, 2, 3, 4, 5];
sum_array(A); // return 15

function remove_all_array(value, array) {
    const new_array = [];
    const len = array_length(array);
    let index = 0;
    for (let i=0; i<len; i=i+1) {
        if (value !== array[i]) {
            new_array[index] = array[i];
            index = index + 1;
        } else {}
    }
    return new_array;
}
const A = [1, 2, 3, 3, 4, 5];
remove_all_array(3, A); // [1, 2, 4, 5]

function remove_from_arr(v, xs) {
    const result = [];
    const len = array_length(xs);
    let is_done = false;
    for (let i = 0; i < len; i = i + 1) {
        if (xs[i] === v && !is_done) {
            is_done = true;
            continue;
        } else {
            result[array_length(result)] = xs[i];
        }
    }
    return result;
}
remove_from_arr(3, [1,2,3,3,4,5]); // returns [1,2,3,4,5]





// Tree functions
//---------------------------------------------------------------
function count_data_items(xs) {
    return is_null(xs)
        ? 0
        : (is_list(head(xs))
            ? count_data_items(head(xs))
            : 1)
        + count_data_items(tail(xs));
}

function tree_sum(xs) { 
    return is_null(xs)
        ? 0
        : is_list(head(xs))
            ? tree_sum(head(xs)) + tree_sum(tail(xs))
            : head(xs) + tree_sum(tail(xs));
}

function flatten_tree(xs) { 
    return accumulate((curr,rest) =>
            is_list(curr) 
                ? append(flatten_tree(curr),rest)
                : pair(curr, rest)
            , null, xs);
}

function scale_tree(factor, xs) { 
    return map(sub_tree =>  
        is_list(sub_tree) 
            ? scale_tree(factor, sub_tree) 
            : factor * sub_tree 
        , xs); 
}

const xs = list(1, list(2, list(3, 4), 5), list(6, 7)); 

count_data_items(xs); // return 7
tree_sum(xs); // return 28
flatten_tree(xs); // return list
scale_tree(10, xs); // return tree

function accumulate_tree(f, op, init, xs) {
    return accumulate((curr, rest) =>
        is_list(curr)
            ? accumulate_tree(f, op, rest, curr)
            : op(f(curr), rest)
        , init, xs);
}

const xs = list(1, list(2, list(3, 4), 5), list(6, 7)); 
accumulate_tree(x => list(x), append, null, xs);

function map_tree(f, tree) {
    if (is_null(xs)) {
        return null;
    } else {
        return accumulate((curr, rest) =>
            is_list(curr)
            ? pair(map_tree(f, curr),rest)
            : pair(f(curr), rest)
        , null, tree);
    }
}
const xs = list(1, list(2, list(3, 4), 5), list(6, 7)); 
map_tree(x => x+1, xs); 
// return list(2, list(3, list(4, 5), 6), list(7, 8))

function filter_tree(f, tree) {
    if (is_null(xs)) {
        return null;
    } else {
        return accumulate((curr, rest) =>
            is_list(curr)
            ? pair(filter_tree(f, curr), rest)
            : f(curr)
                ? pair(curr, rest)
                : rest
        , null, tree);
    }
}
const xs = list(1, list(2, list(3, 4), 5), list(6, 7)); 
filter_tree(x => x%2 === 0, xs); 
// return list(list(2, list(4)), list(6)); 





// Matrix
//---------------------------------------------------------------
function zero_matrix(rows, cols) {
    const M = [];
    for (let r = 0; r < rows; r = r + 1) {
        M[r] = [];
        for (let c = 0; c < cols; c = c + 1) {
            M[r][c] = 0;
            }
    }
    return M;
}
const mat3x4 = zero_matrix(3,4);
mat3x4;  // return [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]

function matrix_multiply(A, B) {
    const r1 = array_length(A);
    const c1 = array_length(A[0]);
    const r2 = array_length(B);
    const c2 = array_length(B[0]);
    
    if (c1 === r2) {
        const M = [];
        for (let r = 0; r < r1; r = r + 1) {
            M[r] = [];
            for (let c = 0; c < c2; c = c + 1) {
                M[r][c] = 0;
                for (let k = 0; k < c1; k = k + 1) {
                    M[r][c] = M[r][c] + A[r][k] * B[k][c];
                }
            }
        }
        return M;
    } else {}
}

const A = [[1,2,3,1], [4,5,6,1], [7,8,9,1]];
const B = [[9,8,7], [6,5,4], [3,2,1], [1,1,1]];
const C = matrix_multiply(A, B);
C; // [[31,25,19], [85,70,55], [139,115,91]]

function swap_matrix(M) {
    const len = array_length(M);
    for (let i=0; i<len; i=i+1) {
        for (let j=i+1; j<len; j=j+1) {
            const temp = M[i][j];
            M[i][j] = M[j][i];
            M[j][i] = temp;
        }
    }
}

function reverse_matrix(M) {
    const len = array_length(M);
    const mid_point = math_floor(len/2);
    for (let i=0; i<len; i=i+1) {
        for (let j=0; j<mid_point; j=j+1) {
            const temp = M[i][j];
            M[i][j] = M[i][len-1-j];
            M[i][len-1-j] = temp;
        }
    }
}

function rotate_matrix(M) {
    swap_matrix(M);
    reverse_matrix(M);
    return M;
}

const matrix = [[1,2,3,4], 
                [5,6,7,8], 
                [9,10,11,12], 
                [13,14,15,16]];
rotate_matrix(matrix);
// return [[13, 9, 5, 1], 
//         [14, 10, 6, 2], 
//         [15, 11, 7, 3], 
//         [16, 12, 8, 4]]

function remove_row_matrix(M, remove_n_entry) {
    let i = 0;
    let n = 0; 
    let new_M = [];
    let len = array_length(M);
    while (i < len) {
        if (i === remove_n_entry) {
            i = i + 1;
        } else {
            new_M[n] = M[i];
            i = i + 1;
            n = n + 1;
        }
    }
    return new_M;
}
const matrix = [[1,2,3,4], 
                [5,6,7,8], 
                [9,10,11,12], 
                [13,14,15,16]];
                
remove_row_matrix(matrix, 1);
// return [[1, 2, 3, 4], 
//         [9, 10, 11, 12], 
//         [13, 14, 15, 16]]

function remove_row_col_matrix(i, j, A) {
    let less_i_row = remove_row_matrix(A, i);
    let new_len = array_length(less_i_row);
    let less_i_and_j = [];
    let n = 0;
    for (let i = 0; i < new_len; i = i + 1) {
        less_i_and_j[n] = remove_row_matrix(less_i_row[i], j);
        n = n + 1;
    } return less_i_and_j;
}
remove_row_col_matrix(3,2,matrix);
const matrix = [[1,2,3,4], 
                [5,6,7,8], 
                [9,10,11,12], 
                [13,14,15,16]];
// return [[1, 2, 4], 
//         [5, 6, 8], 
//         [9, 10, 12]]





// Sorting functions for list
//---------------------------------------------------------------
// Method 1: Insertion sort (m = n - 1)
// Order of growth(time): O(n^2)
function insertion_sort(xs) {
    return is_null(xs)
        ? null
        : insert(head(xs), insertion_sort(tail(xs)));
}
function insert(x, xs) {
    return is_null(xs)
        ? list(x)
        : x <= head(xs)
            ? pair(x, xs)
            : pair(head(xs), insert(x, tail(xs)));
}

// Method 2: Selection sort (m = n / 2)
// Order of growth(time): O(n^2)
// Find the smallest element x and remove it from the list.
// Sort the remaining list, and put x in front.
function selection_sort(xs) {
    if (is_null(xs)) {
        return xs;
    } else {
        const x = smallest(xs);
        return pair(x, selection_sort(remove(x, xs)));
    }
}
function smallest(xs) {
    const compare = (a, b) => a < b ? a : b;
    return is_null(tail(xs))
        ? head(xs)
        : compare(head(xs), smallest(tail(xs)));
}

// Method 3: Merge sort
// Order of growth(time): O(nLogn)
// Order of growth(space): O(n)
// Split the list in half, sort each half using
// wishful thinking, merge the sorted lists together
function middle(n) {
    return math_floor(n / 2);
}
function take(xs, n) {
    return is_null(xs) || n === 0
        ? null
        : pair(head(xs), take(tail(xs), n - 1));
}
function drop(xs, n) {
    return is_null(xs)
        ? null
        : n === 0
            ? xs
            : drop(tail(xs), n - 1);
}
function merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        const mid = middle(length(xs));
        return merge(merge_sort(take(xs, mid)),
        merge_sort(drop(xs, mid)));
    }
}
function merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else {
        const x = head(xs);
        const y = head(ys);
        return (x < y)
            ? pair(x, merge(tail(xs), ys))
            : pair(y, merge(xs, tail(ys)));
    }
}
const list1 = merge_sort(list(1, 9, 7, 1));
const list2 = merge_sort(list(92, 23, 4, 46));
merge(list1, list2);





// Sorting functions for array
//---------------------------------------------------------------
// Method 1: selection_sort
function selection_sort(A) {
    const len = array_length(A);
    for (let i = 0; i < len - 1; i = i + 1) {
        let min_pos = find_min_pos(A, i, len - 1);
        swap(A, i, min_pos);
    }
}
function find_min_pos(A, low, high) {
    let min_pos = low;
    for (let j = low + 1; j <= high; j = j + 1) {
        if (A[j] < A[min_pos]) {
        min_pos = j;
    } else {}
    }
    return min_pos;
}
function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

// Method 2: insertion_sort
function insertion_sort(A) {
    const len = array_length(A);
    for (let i = 1; i < len; i = i + 1) {
        let j = i - 1;
        while (j >= 0 && A[j] > A[j + 1]) {
            swap(A, j, j + 1);
            j = j - 1;
        }
    }
}
function swap(A, x, y) {
    const temp = A[x];
    A[x] = A[y];
    A[y] = temp;
}

// Method 3: merge sort
function merge_sort(A) {
    merge_sort_helper(A, 0, array_length(A) - 1);
}
function merge_sort_helper(A, low, high) {
    if (low < high) { // if we have at least 2 elements
        const mid = math_floor((low + high) / 2);
        merge_sort_helper(A, low, mid);
        merge_sort_helper(A, mid + 1, high);
        merge(A, low, mid, high);
    } else {}
}
function merge(A, low, mid, high) {
    const B = []; // temporary array
    let left = low;
    let right = mid + 1;
    let Bidx = 0;
    while (left <= mid && right <= high) {
        if (A[left] <= A[right]) {
            B[Bidx] = A[left];
            left = left + 1;
        } else {
            B[Bidx] = A[right];
            right = right + 1;
        }
        Bidx = Bidx + 1;
    }
    while (left <= mid) {
        B[Bidx] = A[left];
        Bidx = Bidx + 1;
        left = left + 1;
    }
    while (right <= high) {
        B[Bidx] = A[right];
        Bidx = Bidx + 1;
        right = right + 1;
    }
    for (let k = 0; k < high - low + 1; k = k + 1) {
        A[low + k] = B[k];
    }
}

const A = [3, 9, 2, 1, 6, 5, 3, 8];
insertion_sort(A);
A; // return [1, 2, 3, 3, 5, 6, 8, 9]





// Searching functions for array
//---------------------------------------------------------------
// Method 1: linear search
// can take in unsorted array
function linear_search(A, v) {
    const len = array_length(A);
    let i = 0;
    while (i < len && A[i] !== v) {
        i = i + 1;
    }
    return (i < len);
}
linear_search([1,4,5,2,9], 5); // return true

// Method 2: binary search (recursion)
// array must be sorted
function binary_search(A, v) {
    function search(low, high) {
        if (low > high) {
            return false;
        } else {
            const mid = math_floor((low + high) / 2);
            return (v === A[mid]) || 
                (v < A[mid]
                    ? search(low, mid - 1)
                    : search(mid + 1, high));
        }
    }
    return search(0, array_length(A) - 1);
}
binary_search([1,2,3,4,5,6,7,8,9], 0); // return false






// random examples
//---------------------------------------------------------------
function remove_duplicates(xs) {
    return accumulate((curr, rest) =>
        pair(
            curr,
            remove_duplicates(
                filter(x => x !== curr, rest)
            )
        ),
        null, xs);
}
remove_duplicates(list(1, 2, 3, 4, 2, 3, 2));
// return [1, [2, [3, [4, null]]]]

function subsets(xs) {
    if (is_null(xs)) {
        return list(xs);
    } else {
        const with_head = map(x => pair(head(xs), x), 
                            subsets(tail(xs)));
        const without_head = subsets(tail(xs));
        return append(with_head, without_head);
    }
}
subsets(list(1, 2, 3));
// return list(list(1,2,3), list(1,2), list(1,3), list(1), 
//              list(2,3), list(2), list(3), list())

function permutations(ls) {
    return is_null(ls)
        ? list(null)
        : accumulate(append, null,
            map(x => map(p => pair(x,p),
                    permutations(remove(x,ls))),
            ls));
}
const xs = list(1,2,3);
permutations(xs);
// return list(list(1,2,3), list(1,3,2),
//             list(2,1,3), list(2,3,1),
//             list(3,1,2), list(3,2,1))

// coin change
function first_denomination(kinds_of_coins) {
    return kinds_of_coins === 1 ? 5 :
        kinds_of_coins === 2 ? 10 :
        kinds_of_coins === 3 ? 20 :
        kinds_of_coins === 4 ? 50 :
        kinds_of_coins === 5 ? 100 : 0;
}
function cc(amount , kinds_of_coins) {
    return amount === 0
        ? 1
        : amount < 0 || kinds_of_coins === 0
        ? 0
        : cc(
            amount - first_denomination(kinds_of_coins), //with largest coin
            kinds_of_coins
            )
            +
            cc(amount, kinds_of_coins - 1); //without largest coin
}
cc(45, 5); // return 9

// n-Choose-k
function choose(n, k) {
    return (k > n) ?
        0 : (k === 0 || k === n) ?
            1 : choose(n - 1, k) + // not chosen
                choose(n - 1, k - 1); // chosen
}
choose(10, 2); // return 45





// Memoization
//---------------------------------------------------------------
// Memoize 1: fibonacci
function mfib(n) {
    const mem = [];
    function fib(k) {
        if (mem[k] !== undefined) {
            return mem[k];
        } else { 
            const result = (k <= 1) ? k : fib(k - 1) + fib(k - 2);
            mem[k] = result;
            return result;
        }
    }
    return fib(n);
}

mfib(15); // return 610

// Memoize 2: n-Choose-k
const mem = [];
function read(n, k) {
    return (mem[n] === undefined)
        ? undefined
        : mem[n][k];
}
function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    } else {}
        mem[n][k] = value;
}

function mchoose(n, k) {
    if (read(n, k) !== undefined) {
        return read(n, k);
    } else {
        const result = (k > n) ?
            0 : (k === 0 || k === n) ?
                1 : mchoose(n - 1, k) +
                    mchoose(n - 1, k - 1);
        write(n, k, result);
        return result;
    }
}
mchoose(10, 2); // return 45





// Stream
//---------------------------------------------------------------
const integers = integers_from(1);
const ones = pair(1, () => ones);

function list_to_inf_stream(xs) {
    function helper(ys) {
        if (is_null(ys)) {
            return helper(xs);
        } else {
            return pair(head(ys),
                () => helper(tail(ys)));
        }
    }
    return is_null(xs) ? null : helper(xs);
}
eval_stream(list_to_inf_stream(list(1,2,3)), 11);
// return [1, [2, [3, [1, [2, [3, [1, [2, [3, [1, [2, null]]]]]]]]]]]

function add_streams(s1, s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    } else {
        return pair(head(s1) + head(s2),
        () => add_streams(stream_tail(s1), stream_tail(s2)));
    }
}

function mul_streams(s1,s2) {
    if (is_null(s1)) {
        return s2;
    } else if (is_null(s2)) {
        return s1;
    } else {
        return pair(head(s1) * head(s2),
            () => mul_streams(stream_tail(s1),
                                stream_tail(s2)));
    }
}
eval_stream(mul_streams(integers, integers), 4);
// return [1, [4, [9, [16, null]]]]

function scale_stream(s, f) {
    return stream_map(x => x*f, s);
}
eval_stream(scale_stream(integers, 3), 4);
// return [3, [6, [9, [12, null]]]]

function partial_sums(s) {
    return pair(head(s),
        () => add_streams(partial_sums(s)
            , stream_tail(s)));
}

eval_stream(partial_sums(integers), 5);
// return [1,3,6,10,15]

function n_of_n_stream() {
    function helper_stream(input) {
        let count = 1;
        let result = 1;
        for (let i = 1; i <= input; i = i+1) {
            if (count === 0) {
                count = result;
                result = result + 1;
            } else {
                count = count - 1;
            }
        }
        return result;
    }  
    return stream_map(x => helper_stream(x), integers_from(1));
}
eval_stream(n_of_n_stream(), 5);
// return [1, [2, [2, [3, [3, null]]]]]



