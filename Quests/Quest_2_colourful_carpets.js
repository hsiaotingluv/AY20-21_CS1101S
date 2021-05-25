// Question 1
function besiden(n, rune) {
    return n === 1
            ? rune
            : beside_frac(1 / n, rune,
                    besiden(n - 1, rune));
}

// Test
show(besiden(7, heart));

// Question 2
function besiden(n, rune) {
    return n === 1
            ? rune
            : beside_frac(1 / n, rune,
                    besiden(n - 1, rune));
}

function carpet(n, m, rune) {
    return stackn(m, besiden(n, rune));
}

// Test
show(carpet(7, 5, heart));

// Comments
Just one thing to consider: are n and m great names for the parameters in carpet? Which is the number of rows and which is the number of columns? How could you make it clearer to someone reading your function which is which?

// Question 3
function besiden(n, rune) {
    return n === 1
            ? rune
            : beside_frac(1 / n, rune,
                    besiden(n - 1, rune));
}

function carpet(n, m, rune) {
    return stackn(m, besiden(n, rune));
}

show(carpet(10, 10, random_color(heart)));

/*
Q1: What happens when you repeatedly evaluate the previous line?
It returns a 10x10 patchwork carpet where all the hearts are in one random color.

Q2: Is it achieving Alyssa's desired effect?
No. It returns all hearts in uniform color by random,
rather than every heart has a random color.

Q3: Would your answer change if Source would use normal order reduction 
instead of applicative order reduction?
Yes.

Q4: Why?
Applicative order evaluates the sub-expressions first before applying the function, 
while normal order evaluation applies the function first before evaluating the sub-expressions. 
This means that if Source uses normal order reduction, the function random_color(heart)
will be passed into the carpet function first before being evaluated, thus the result
will show a 10x10 patchwork carpet where every heart has a random color.
*/

// Question 4
function besiden(n, rune) {
    return n === 1
        ? rune
        : beside_frac(
            1 / n, 
            random_color(rune),
            besiden(n - 1, random_color(rune))
        );
}

function randomly_colored_carpet(n, m, rune) {
    return m === 0
        ? besiden(n, rune)
        : stack_frac(
            1 / m, 
            besiden(n, rune),
            randomly_colored_carpet(n, m - 1, rune)
        );
}

// Test
show(randomly_colored_carpet(10, 10, heart));

// Comments
When n is 1, your hearts are not randomly coloured (-1 mark). Please remember to check for edge cases of valid input.
