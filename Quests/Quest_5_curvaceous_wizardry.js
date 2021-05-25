// Question 1
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

draw_points_on(10000)(test_curve);

function stack(c1, c2) {
    return t => (t <= 0.5)
        ? make_point(x_of(c1(2 * t)), (y_of(c1(2 * t))/2) + 0.5)
        //shift y axis to change amplitude of curve
        : make_point(x_of(c1(2 * t - 1)), (y_of(c1(2 * t - 1))/2));
}

// Test
draw_points_on(10000)(stack(test_curve, test_curve));

// Comments
Your function does not produce the correct drawing for this test case: stack(test_curve, stack(test_curve, test_curve))

// Question 2
const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack_frac(frac, c1, c2) {
    return t => {
        const t_top = t / frac;
        const t_bot = (t-frac) / (1-frac);
        
        return t <= frac
            ? make_point(
                x_of(c1(t_top)), 
                y_of(c1(t_top)) * frac + (1 - frac)
            )
            : make_point(
                x_of(c2(t_bot)), 
                y_of(c2(t_bot)) * (1 - frac)
            );
    };
}

// Test
draw_points_on(10000)
(stack_frac(1 / 5, test_curve, stack_frac(1 / 2, test_curve, test_curve)));
