// Question 1
//hello
/* hello */  

// Question 2
// method 1
function mosaic(rune1, rune2, rune3, rune4) {
    return beside(stack(rune4, rune3), stack(rune1, rune2));
}

// method 2
function mosaic(rune1, rune2, rune3, rune4) {
     return stack(beside(rune4, rune1), beside(rune3, rune2));
}

// Test
show(mosaic(rcross, sail, corner, nova));

// Question 3
function mosaic(rune1, rune2, rune3, rune4) {
    return beside(stack(rune4, rune3), stack(rune1, rune2));
}

//method 1
function upside_down_mosaic(rune1, rune2, rune3, rune4) {
    return turn_upside_down(mosaic(rune1, rune2, rune3, rune4));
}

//method 2
function upside_down_mosaic(rune1, rune2, rune3, rune4) {
    return quarter_turn_left(
        quarter_turn_left(mosaic(rune1, rune2, rune3, rune4)));
}

// Test
show(upside_down_mosaic(rcross, sail, corner, nova));

// Question 4
function mosaic(rune1, rune2, rune3, rune4) {
    return beside(stack(rune4, rune3), stack(rune1, rune2));
}

function transform_mosaic(rune1, rune2, rune3, rune4, transform) {
    return transform(mosaic(rune1, rune2, rune3, rune4));
}

// Test
show(transform_mosaic(rcross, sail, corner, nova, make_cross));
