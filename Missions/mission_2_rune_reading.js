// Question 1 
//For subsequent function calls
function sub_fractal(pic, n) {
    return n === 1
        ? pic
        : beside_frac(
            1-1/(math_pow(2, n)-1), //This is different
            sub_fractal(pic, n-1),
            stackn(math_pow(2, n-1), pic)
        );
}

//For initial function call
function fractal(pic, n) {
    return beside_frac(
        1-1/math_pow(2, n-1), //This is different
        sub_fractal(pic, n-1),
        stackn(math_pow(2, n-1), pic)
    );
}

// Test
show(fractal(make_cross(rcross), 5));

// Comments
/* 
Your solution breaks down when n = 1, which is a valid input. (-100XP)
Also, you're missing the recursive nature of the problem. It looks like you're viewing each column as just a column of 2^n copies of the rune. That idea can work, but the recursive idea that this question intended to show is that each picture creates two stacked pictures next to itself (but stopping at some point).
The key idea is to see a fractal as one rune with two smaller fractals beside it.
*/

// Question 2
function hook(frac) {
    return stack_frac(
                1/2,
                square,
                beside_frac(1 - frac, blank, square)
            );
}

// Test
show(hook(1/5));

// Question 3
function spiral(thickness, depth) {
    return depth === 0
    ? blank
    : stack_frac(
            thickness, 
            hook(thickness / 2),
            quarter_turn_right(
                spiral(thickness, depth - 1)
            )
    );
}

function hook(frac) {
    return stack_frac(
                1/2,
                square,
                beside_frac(1 - frac, blank, square)
            );
}

// Test
show(spiral(1/5, 20));
