// Question 1
function top_and_bottom_row(rune, n) {
    return quarter_turn_right(stackn(n, quarter_turn_left(rune)));
}

function middle_row(rune, n) {
    return beside_frac(
                1 / n,
                stackn(n - 2, rune),
                beside_frac(
                        (n - 2) / (n - 1),
                        center(rune, n),
                        stackn(n - 2, rune)
                    )
        );
}

function center(rune, n) {
    return beside(
                stack(quarter_turn_right(rune), rune),
                stack(turn_upside_down(rune), quarter_turn_left(rune))
        );
}

function persian(rune, n) {
    return stack_frac(
                1 / n,
                top_and_bottom_row(rune, n),
                stack_frac(
                        (n - 2) / (n - 1),
                        middle_row(rune, n),
                        top_and_bottom_row(rune, n)
                    )
        );
}

// Test
show(persian(nova, 9));
