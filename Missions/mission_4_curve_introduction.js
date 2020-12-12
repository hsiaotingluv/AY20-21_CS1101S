// Question 1
// Part 1
// unit_line_at: Number -> (Number -> Point) or Curve

// Part 2
function vertical_line(pt, length) {
    return t => make_point(x_of(pt), y_of(pt) + t*length);
}

// Part 3
// Type: Curve

// Part 4
draw_connected(10)(vertical_line(make_point(0.5, 0.25), 0.5));

// Test
function unit_circle(t) {
    return make_point(math_cos(2 * math_PI * t),
                      math_sin(2 * math_PI * t));
}
draw_connected(200)(unit_circle);
draw_points_on(20)(unit_circle);
draw_connected_squeezed_to_window(200)(unit_circle);
draw_points_squeezed_to_window(200)(unit_circle);

// Comments
/*
Part 3: vertical_line itself is not a Curve. (-1 mark)
*/

// Question 2
function three_quarters(pt) {
    return t => make_point(
        x_of(pt) + math_cos(1.5 * math_PI * t),
        y_of(pt) + math_sin(1.5 * math_PI * t)
    );
}

// Test
draw_connected_squeezed_to_window(200)(three_quarters(make_point(0, 1)));

// Question 3
// method 1

function s_top(pt) {
    return t => make_point(
        x_of(pt) + math_cos(1.5 * math_PI * t * 2),
        y_of(pt) + math_sin(1.5 * math_PI * t * 2) + 1
        //t is from 0 to 0.5, in order to draw the full 3/4 top circle, t must be 0 to 1
        //(t * 2) aka (0.5 * 2 = 1) 
    );
}

function s_bottom(pt) {
    return t => make_point(
        x_of(pt) + math_sin(1.5 * math_PI * (t * 2 - 1)),
        y_of(pt) + math_cos(1.5 * math_PI * (t * 2 - 1)) - 1
        //t is from 0.5 to 1, in order to draw the full 3/4 top circle, t must be 0 to 1
        //(t * 2 - 1) aka (0.5 * 2 - 1 = 0) 
    );
}

function s_generator(pt) {
    return t => t < 0.5 
            ? s_top(pt)(t)
            //when t = 0 to 0.5, draw s_top
            : s_bottom(pt)(t);
            //when t = 0.5 to 1, draw s_bottom
}
 
// method 2: nested functions
function s_generator(pt) {
    
    const top = t => make_point(
                            x_of(pt) + math_cos(1.5 * math_PI * t * 2),
                            y_of(pt) + math_sin(1.5 * math_PI * t * 2) + 1
                        );
                        
    const bottom = t => make_point(
                            x_of(pt) + math_sin(1.5 * math_PI * (t * 2 - 1)),
                            y_of(pt) + math_cos(1.5 * math_PI * (t * 2 - 1)) - 1
                        );
                        
    return t => t < 0.5 ? top(t) : bottom(t);
}

// Test
draw_connected_squeezed_to_window(200)(s_generator(make_point(0,0)));

// Comments
/*
Thanks for the alternative method, but it's not too different from your first method. They're both doing more or less the same thing except that method 1 uses two functions which produce Curves while method 2 embeds those Curves in s_generator. Anyway, they both work so great.
However, two stylistic issues:
Your comments are longer than 80 characters (-10XP). Come on, we've talked about this before.
Your comments are below the lines they are commenting, but they should be above (-10XP).
*/
