// Question 1
// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive
function get_dtmf_frequencies(number) {
    const freqs = list(
        pair(941, 1336), // (0)
        
        pair(697, 1209), pair(697, 1336), pair(697, 1477), // (1) - (3)
        pair(770, 1209), pair(770, 1336), pair(770, 1477), // (4) - (6)
        pair(852, 1209), pair(852, 1336), pair(852, 1477), // (7) - (9)
        
        pair(941, 1209), pair(941, 1477), // (*) and (#)
        
        pair(697, 1633), pair(770, 1633), // (A) and (B)
        pair(852, 1633), pair(941, 1633)  // (C) and (D)
    );
    return list_ref(freqs, number);
}

// Question 2
function get_dtmf_frequencies(number) {
    const freqs = list(
        pair(941, 1336), // (0)
        
        pair(697, 1209), pair(697, 1336), pair(697, 1477), // (1) - (3)
        pair(770, 1209), pair(770, 1336), pair(770, 1477), // (4) - (6)
        pair(852, 1209), pair(852, 1336), pair(852, 1477), // (7) - (9)
        
        pair(941, 1209), pair(941, 1477), // (*) and (#)
        
        pair(697, 1633), pair(770, 1633), // (A) and (B)
        pair(852, 1633), pair(941, 1633)  // (C) and (D)
    );
    return list_ref(freqs, number);
}
	  
function make_dtmf_tone(frequency_pair) {
    const sine1 = sine_sound(head(frequency_pair), 0.5);
    const sine2 = sine_sound(tail(frequency_pair), 0.5);
    return simultaneously(list(sine1, sine2));
}

// Test
play(make_dtmf_tone(get_dtmf_frequencies(1)));

// Question 3
function get_dtmf_frequencies(number) {
    const freqs = list(
        pair(941, 1336), // (0)
        
        pair(697, 1209), pair(697, 1336), pair(697, 1477), // (1) - (3)
        pair(770, 1209), pair(770, 1336), pair(770, 1477), // (4) - (6)
        pair(852, 1209), pair(852, 1336), pair(852, 1477), // (7) - (9)
        
        pair(941, 1209), pair(941, 1477), // (*) and (#)
        
        pair(697, 1633), pair(770, 1633), // (A) and (B)
        pair(852, 1633), pair(941, 1633)  // (C) and (D)
    );
    return list_ref(freqs, number);
}
	  
function make_dtmf_tone(frequency_pair) {
    const sine1 = sine_sound(head(frequency_pair), 0.5);
    const sine2 = sine_sound(tail(frequency_pair), 0.5);
    return simultaneously(list(sine1, sine2));
}

// Method 1: direct approach
function dial(list_of_digits) {
    function helper(list_of_digits) {
        return is_null(list_of_digits)
            ? null
            : pair(
                make_dtmf_tone(get_dtmf_frequencies(head(list_of_digits))), 
                pair(
                    silence_sound(0.1), 
                    helper(tail(list_of_digits))
                )
            );
    }
    return consecutively(helper(list_of_digits));
}

// Method 2a: higher order function
function dial(list_of_digits) {
    const silence = silence_sound(0.1);
    const list_of_sound = map(x => 
                            make_dtmf_tone(get_dtmf_frequencies(x)),
                            list_of_digits);
    const list_of_sound_with_silence = map(x => 
                                        list(x, silence), 
                                        list_of_sound);
    return consecutively(accumulate((x, y) => 
                                        append(x, y), 
                                        null, 
                                        list_of_sound_with_silence));
}

// Method 2b: higher order function (shorten)
function dial(list_of_digits) {
    const convert = x => make_dtmf_tone(get_dtmf_frequencies(x));
    const add_silence = x => consecutively(list(convert(x), silence_sound(0.1)));
    return consecutively(map(add_silence, list_of_digits));
}

// Test
play(dial(list(1,2,3,4,5,6,7)));

// Comments
/* method 1 could be shortened to 
list(
                make_dtmf_tone(get_dtmf_frequencies(head(list_of_digits))), 
                silence_sound(0.1), 
                helper(tail(list_of_digits))
            )
*/

// Question 4
function get_dtmf_frequencies(number) {
    const freqs = list(
        pair(941, 1336), // (0)
        
        pair(697, 1209), pair(697, 1336), pair(697, 1477), // (1) - (3)
        pair(770, 1209), pair(770, 1336), pair(770, 1477), // (4) - (6)
        pair(852, 1209), pair(852, 1336), pair(852, 1477), // (7) - (9)
        
        pair(941, 1209), pair(941, 1477), // (*) and (#)
        
        pair(697, 1633), pair(770, 1633), // (A) and (B)
        pair(852, 1633), pair(941, 1633)  // (C) and (D)
    );
    return list_ref(freqs, number);
}
	  
function make_dtmf_tone(frequency_pair) {
    const sine1 = sine_sound(head(frequency_pair), 0.5);
    const sine2 = sine_sound(tail(frequency_pair), 0.5);
    return simultaneously(list(sine1, sine2));
}

function dial(list_of_digits) {
    const convert = x => make_dtmf_tone(get_dtmf_frequencies(x));
    const add_silence = x => consecutively(list(convert(x), silence_sound(0.1)));
    return consecutively(map(add_silence, list_of_digits));
}

function dial_all(list_of_numbers) {
    const filtered_list = filter(x => 
                                !equal(x, list(1,8,0,0,5,2,1,1,9,8,0)), 
                                list_of_numbers);
    const filtered_list_with_delimiters = map(x => 
                                                append(x, list(11)), 
                                                filtered_list);
    const flatten_list = accumulate((curr, rest) => 
                                                append(curr, rest),
                                                null, 
                                                filtered_list_with_delimiters);
    return dial(flatten_list);
}

// Test
play(dial_all(
    list(
        list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
        list(6,2,3,5,8,5,7,7),
        list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1)
    )
));

// Comments
/*
Look at the lambda you pass to accumulate. Can you simplify it to one word?
*/
