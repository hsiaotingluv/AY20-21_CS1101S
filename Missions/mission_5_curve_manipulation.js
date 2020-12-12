// Question 1
function s_top(pt) {
    return t => make_point(
        x_of(pt) + math_cos(1.5 * math_PI * t * 2),
        y_of(pt) + math_sin(1.5 * math_PI * t * 2) + 1
    );
}

function s_bottom(pt) {
    return t => make_point(
        x_of(pt) + math_sin(1.5 * math_PI * (t * 2 - 1)),
        y_of(pt) + math_cos(1.5 * math_PI * (t * 2 - 1)) - 1
    );
}

function s_generator(pt) {
    return t => t < 0.5 
            ? s_top(pt)(t)
            : s_bottom(pt)(t);
}

function quarter_turn_left(curve) {
    return t => make_point(-y_of(curve(t)), x_of(curve(t)));
}

function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

// Test
const my_s = s_generator(make_point(0,0));
(draw_connected_squeezed_to_window(200))(reflect_through_y_axis(my_s));

// Question 2
function s_top(pt) {
    return t => make_point(
        x_of(pt) + math_cos(1.5 * math_PI * t * 2),
        y_of(pt) + math_sin(1.5 * math_PI * t * 2) + 1
    );
}

function s_bottom(pt) {
    return t => make_point(
        x_of(pt) + math_sin(1.5 * math_PI * (t * 2 - 1)),
        y_of(pt) + math_cos(1.5 * math_PI * (t * 2 - 1)) - 1
    );
}

function s_generator(pt) {
    return t => t < 0.5 
            ? s_top(pt)(t)
            : s_bottom(pt)(t);
}

function connect_rigidly(curve1, curve2) {
    return t => (t < 1/2)
        ? curve1(2 * t)
        : curve2(2 * t - 1);
}

function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

function close(curve) {
    return connect_ends(curve, invert(curve));
}

// function close(curve) {
//     return t => (t <= 0.5)
//         ? curve(2 * t)
//         : curve(1 - (2 * t - 1));
// }

// Test
// reflecting the s-curve
const my_s_curve = s_generator(make_point(0,0));
draw_connected_squeezed_to_window(200) 
(connect_ends(close(my_s_curve), reflect_through_y_axis(my_s_curve)));
