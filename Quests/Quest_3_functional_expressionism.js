// Question 1
const increment_repeater =
    repeater => f => x => f(repeater(f)(x)); // complete the function definition

const twice = f => x => f(f(x));
const thrice = increment_repeater(twice);
const fourtimes = increment_repeater(thrice);
const warn = thrice(display);
warn("ALERT");          // should display "ALERT" 3 times
const bigwarn = fourtimes(display);
bigwarn("A L E R T");   // should display "A L E R T" 4 times.
                        // (the REPL will display a fifth
                        // "A L E R T" as the value returned
                        // by bigwarn)

// Question 2
const pair = (x, y) => f => f(x, y);
		
const head = p => p((x,y) => x);  // complete the function definition
const tail = p => p((x,y) => y);  // complete the function definition

head(pair(1, 2)) === 1; // should return true
tail(pair(1, 2)) === 2; // should return true

// Question 3
/*
enter your answer here; no explanation required 
O(n)
*/

// Comments 
The question was asking for Omega, not Big Oh, but I'll give you the benefit of the doubt. (-10XP instead of -100XP)

// Question 4
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const increment_repeater = repeater => f => x => f(repeater, () => repeater(f)(x));

const add_repeaters = (repeater1, repeater2) => repeater1((iter_count, x) => increment_repeater(x()))(repeater2);

to_int(add_repeaters(two_repeater,
                     three_repeater));  // should return 5

// Question 5
const zero_repeater = f => x => x;
const one_repeater = f => x => f(zero_repeater, () => zero_repeater(f)(x));
const two_repeater = f => x => f(one_repeater, () => one_repeater(f)(x));
const three_repeater = f => x => f(two_repeater, () => two_repeater(f)(x));

const to_int = repeater => repeater((iter_count, x) => x() + 1)(0);

const decrement_repeater = 
    repeater => repeater((iter_count, x) => iter_count)(zero_repeater);

to_int(decrement_repeater(three_repeater));  // should return 2

// Testing
// const warn = decrement_repeater(three_repeater)((iter_count, x) => display(x()));
// warn("ALERT"); // displays "ALERT" 3 times
