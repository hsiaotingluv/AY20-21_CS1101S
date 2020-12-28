// Question 1
function fractal(level, transformation, curve){
    return level === 0
        ? curve
        : fractal(level - 1, transformation, transformation(curve));
        
}

function levycize(curve){
    const scaled_curve = (scale(math_sqrt(2) / 2))(curve);
    return connect_rigidly(
        (rotate_around_origin(math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5))
            ((rotate_around_origin(-math_PI / 4))(scaled_curve)));
}

// Test
draw_connected_full_view_proportional(10000)
(fractal(5, levycize, unit_line));

draw_connected_full_view_proportional(10000)
(fractal(11, levycize, unit_line));

// Question 2
function fractal(level, transformation, curve){
    return level === 0
        ? curve
        : fractal(level - 1, transformation, transformation(curve));
        
}

function dragonize(curve) {
    return put_in_standard_position(connect_ends
                   ((rotate_around_origin(-math_PI / 2))(invert(curve)), curve));
}

// Test
draw_connected_full_view_proportional(10000)
(dragonize(unit_line));

draw_connected_full_view_proportional(10000)
(dragonize(dragonize(unit_line)));

draw_connected_full_view_proportional(10000)
(fractal(11, dragonize, unit_line));

// Question 3
function kochize(curve){
    const up_60 = rotate_around_origin(math_PI / 3);
    const down_60 = rotate_around_origin(- math_PI / 3);
    return put_in_standard_position(
               connect_ends(curve,
                            connect_ends(up_60(curve),
                                         connect_ends(down_60(curve),
                                                      curve))));
}

function fractal(level, transformation, curve){
    return level === 0
        ? curve
        : fractal(level - 1, transformation, transformation(curve));
        
}
		  
function snowflake(n) {
    const up_60 = rotate_around_origin(math_PI / 3);
    const down_60 = rotate_around_origin(- math_PI / 3);
    const up_side_down = rotate_around_origin(math_PI);
    const curve = fractal(n, kochize, unit_line);
    
    return connect_ends(
        // bottom curve
        up_side_down(curve), 
        // left curve and right curve
        connect_ends(up_60(curve),
                    down_60(curve))
    );
}

// Test
draw_connected_full_view_proportional(10000)
(snowflake(5));

// draw_connected_full_view_proportional(10000)
// (snowflake(5));

// draw_connected_full_view_proportional(10000)
// (fractal(0, kochize, unit_line));

// draw_connected_full_view_proportional(10000)
// (fractal(1, kochize, unit_line));
