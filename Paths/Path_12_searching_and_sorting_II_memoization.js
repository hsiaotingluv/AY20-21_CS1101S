// Question 1
Accessing any array element takes O(1) time.

// Question 2
Linear search works on unsorted arrays.

// Question 3
In each step, binary search halves the remaining portion of the array that needs to be searched.

// Question 4
In each run of the inner loop, insertion sort may swap two neighboring elements.

// Question 5
In each iteration of the for loop in function selection_sort, two elements may be swapped.

// Question 6
Merge sort runs in Θ(n) time if the array is already sorted.

// Question 7
Memoization avoids repeated calculation of the result of a function applied to the same arguments.

// Question 8
function search_cond(A, cond) {
    let i = 0;
    while (i < array_length(A)) {
        if (cond(A[i]) === true) {
            break;
        } else {
            i = i + 1;
        }
    }
    return i < array_length(A) ? i : -1;
}

// Question 9
function insert(A, pos, x) {
    for (let i = array_length(A); i > pos; i = i - 1) {
         A[i] = A[i - 1];
    }
    A[pos] = x;
}

// Question 10
function insertion_sort(A) {
    const B = [];
    B[0] = A[0];
    for (let i = 1; i < array_length(A); i = i + 1) {
        const x = A[i];
        let pos = search_cond(B, y => y > x);
        if (pos === -1) {
            pos = array_length(B);
        } else {}
        insert(B, pos, x);
    }
    return B;
}

