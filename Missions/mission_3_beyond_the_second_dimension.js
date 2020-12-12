// Question 1
function steps(rune1, rune2, rune3, rune4) {
    return overlay_frac(
                3 / 4,
                overlay_frac(
                        2 / 3,
                        overlay_frac(
                            1 / 2,
                            beside(stack(rune4, blank), blank),
                            beside(stack(blank, rune3), blank)
                            ),
                        beside(blank, stack(blank, rune2))
                    ),
                beside(blank, stack(rune1, blank))
            );
}

// Test
show(steps(rcross, sail, corner, nova));

// Question 2
/*
steps(r1, r2, r3, r4) -> {Rune}

function steps takes four runes as arguments and arranges them 
in a 2 x 2 square, starting with the top-right corner, 
going clockwise, with the four runes placed at different depths,
such that they are spaced equally apart along the vertical z-axis,
with rune1 at the lowest level (lightest shade of grey) and 
rune4 at the highest level (black).

parameters:
rune1(name), Rune(type), given Rune(description)
rune2(name), Rune(type), given Rune(description)
rune3(name), Rune(type), given Rune(description)
rune4(name), Rune(type), given Rune(description)

The function returns a Rune with 4 different runes arranged 
in a 2 x 2 square, starting with the top-right corner, going clockwise, 
with the four runes placed at different depths, hence different
shades of grey.

rune type: Rune
*/

function steps(rune1, rune2, rune3, rune4) {
    return overlay_frac(
                3 / 4,
                overlay_frac(
                        2 / 3,
                        overlay_frac(
                            1 / 2,
                            beside(stack(rune4, blank), blank), 
                            //returns rune4 at the top left with darkest shade of grey(black)
                            //rune type: Rune
                            beside(stack(blank, rune3), blank)
                            //return rune3 at the bottom left with second darkest shade of grey
                            //rune type: Rune
                            ),
                        beside(blank, stack(blank, rune2))
                        //returns rune2 at the bottom right with the second lightest shade of grey
                        //rune type: Rune
                    ),
                beside(blank, stack(rune1, blank))
                //returns rune1 at the top right with lightest shade of grey
                //rune type: Rune
            );
}

// Test
show(steps(rcross, sail, corner, nova));

// Comments
/*
One minor mistake: your parameter names (question 1; r1, r2, etc.) don't match your actual parameter names. (-20XP).
One stylistic suggestion: for question 3, consider formatting your parameter details in a kind of table. You can experiment with =, -, | and other characters to create a nice table if you want. At the very least, the table headers name, type, description shouldn't be repeated with every table entry.
*/

// Question 3
function cone(n, rune) {
    const size = n;

    return n === 1
            ? rune
            : overlay_frac(
                    (1 - (1 / n)),
                    cone(n - 1, scale((1 - (1 / n)), rune)), 
                    //scale rune with respect to the previous size 
                    rune
                );
}

// Test
show(cone(4, circle));
