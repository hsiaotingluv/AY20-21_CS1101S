// Question 1
function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1;
    return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
    return make_sound(get_wave(sound), duration);
}

// Test
play(cut_sound(noise_sound(2), 0.1));
play(noise_sound(0.5));

// Question 2
function sine_sound(freq, duration) {
    const sinewave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(sinewave, duration);
}

// Test
play(sine_sound(500, 1));

// Question 3
function sine_sound(freq, duration) {
    const sinewave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(sinewave, duration);
}

function consecutively(list_of_sounds) {
    // combine returns sound
    const combine = (s1, s2) => make_sound(t =>
        t <= get_duration(s1)
            ? get_wave(s1)(t)
            : get_wave(s2)(t - get_duration(s1))
        , get_duration(s1) + get_duration(s2)); 
    
    return is_null(tail(list_of_sounds))
        ? head(list_of_sounds)
        : combine(
            head(list_of_sounds),
            consecutively(tail(list_of_sounds))
        );
}

// Alternatively
function consecutively(list_of_sounds) {
    const combine = (s2, s1) => make_sound(
        t => t < get_duration(s1)
            ? get_wave(s1)(t)
            : get_wave(s2)(t - get_duration(s1)),
        get_duration(s1) + get_duration(s2)
    );
    
    return accumulate(
        combine,
        head(list_of_sounds),
        reverse(tail(list_of_sounds))
    );
}

// Test
const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(700, 1);
play(consecutively(list(my_sine_1, my_sine_2)));

// Comments
/*
You're not handling the case where consecutively is given an empty list. (-1 mark)
*/

// Question 4
function sine_sound(freq, duration) {
    const sinewave = t => math_sin(2 * math_PI * freq * t);
    return make_sound(sinewave, duration);
}

function consecutively(list_of_sounds) {
    // combine returns sound
    const combine = (s1, s2) => make_sound(t =>
        t <= get_duration(s1)
            ? get_wave(s1)(t)
            : get_wave(s2)(t - get_duration(s1))
        , get_duration(s1) + get_duration(s2)); 
    
    return is_null(tail(list_of_sounds))
        ? head(list_of_sounds)
        : combine(
            head(list_of_sounds),
            consecutively(tail(list_of_sounds))
        );
}

// Create dot, dash and pause sounds first
const dot_sound = sine_sound(800, 0.125);
const dash_sound = sine_sound(800, 0.375);
const dot_pause = sine_sound(0, 0.125);
const dash_pause = sine_sound(0, 0.375);

// Create sounds for each letter
const S_sound = consecutively(list(dot_sound, dot_pause, dot_sound, dot_pause, dot_sound));
const O_sound = consecutively(list(dash_sound, dot_pause, dash_sound, dot_pause, dash_sound));

// Build the signal out of letter sounds and pauses
const distress_signal = consecutively(list(S_sound, dash_pause, O_sound, dash_pause, S_sound));

// Play distress signal
play(distress_signal);

// Comments
/* 
Your pauses shouldn't use sine_sound even if passing 0 as the frequency technically gives the same output. It's bad communication of meaning. Also there's a more appropriate library function you could use.
Also please keep to the 80 character limit. (-10XP)
*/
