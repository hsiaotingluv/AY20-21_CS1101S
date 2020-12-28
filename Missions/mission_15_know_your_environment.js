// Question 1
function d_reverse(xs) {
    if (is_null(xs)) {
        return xs;
    } else if (is_null(tail(xs))) {
        return xs;
    } else {
        const temp = d_reverse(tail(xs));
        set_tail(tail(xs), xs);
        set_tail(xs, null);
        return temp;
    }
}
const L = list(2, 3);
const M = d_reverse(L);
M;

// return [3, [2, null]]

// Question 2
const twice = f => (x => f(f(x)));
const yy = (twice(x => 2 * x + 1))(3);
yy;

// return 15

// Question 3
function d_map(fun, xs) {
    if (!is_null(xs)) {
        const h = head(xs);
        set_head(xs, fun(h));
        d_map(fun, tail(xs));
    } else { }
}
const L = list(5);
d_map(x => y => x + y, L);

// return undefined
