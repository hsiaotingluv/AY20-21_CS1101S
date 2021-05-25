// Question 1
function runes_contest_CHEN_HSIAO_TING() {
    function pattern(n, m, rune1, rune2) {
        return m === 0
            ? besiden(n, rune1, rune2)
            : stack_frac(
                1 / m,
                besiden(n, rune1, rotate(0.25, rune2)),
                pattern(n, m - 1, rune1, rune2)
            );
    }
    function besiden(n, rune1, rune2) {
        return n === 1
            ? make_cross(stack(rune1, random_color(rune2)))
            : beside_frac(
                1 / n, 
                make_cross(random_color(rune1)),
                besiden(n - 1, rune1, rune2)
            );
    }
    return pattern(5, 10, sail, pentagram);
}
