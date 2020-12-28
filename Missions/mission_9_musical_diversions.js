// Question 1
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}

function bass_drum(note, duration) {
    const aharmonic = list(79,83,97,107,113,139,149);
    return drum_envelope(
                simultaneously(
                    map(x => sine_sound(x, duration), 
                        aharmonic)));
}

function mute(note, duration) {
    return sine_sound(note, duration);
}

// Test
play(snare_drum(50, 0.2));
play(bass_drum(50, 0.2));
play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2),
                         mute(0, 0.2), 
                         snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2))));

// Comments
/*
Good job for your snare_drum and base_drum but your mute doesn't make sense. A sine sound is not silence.
*/

// Question 2
function generate_list_of_note(letter_name, list_of_interval) {
    const tonic = letter_name_to_midi_note(letter_name);
    function helper(accumulate, xs) {
        return is_null(xs)
            ? null
            : pair(
                accumulate + head(xs), 
                helper(accumulate + head(xs), tail(xs)));
    }
    return pair(tonic, helper(tonic, list_of_interval));
}

const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);

display(c_major_scale);

function list_to_sound(list_of_midi_note, duration, instrument) {
    // const list_of_frequency = map(midi_note_to_frequency, list_of_midi_note);
    // const list_of_sound = map(x => sine_sound(x, duration), list_of_frequency);
    return consecutively(map(x => instrument(x, duration), list_of_midi_note));
}

const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);

play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);
const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);

const c_harmonic_minor_scale = generate_list_of_note("C4", harmonic_minor_scale_interval);
const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4, cello);
play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note("C4", melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4, cello);
play(c_melodic_minor_scale_sound);

// Question 3
function generate_list_of_note(letter_name, list_of_interval) {
    const tonic = letter_name_to_midi_note(letter_name);
    function helper(accumulate, xs) {
        return is_null(xs)
            ? null
            : pair(
                accumulate + head(xs), 
                helper(accumulate + head(xs), tail(xs)));
    }
    return pair(tonic, helper(tonic, list_of_interval));
}

function list_to_sound(list_of_midi_note, duration, instrument) {
    const list_of_frequency = map(midi_note_to_frequency, list_of_midi_note);
    const list_of_sound = map(x => sine_sound(x, duration), list_of_frequency);
    return consecutively(map(x => instrument(x, duration), list_of_midi_note));
}

const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

play(list_to_sound(generate_arpeggio("C4", major_arpeggio_interval), 0.5, piano));

function arpeggiator_up(arpeggio, duration_each, instrument) {
    return length(arpeggio) < 4
        ? silence_sound(0)
        : consecutively(build_list(16,
            x => {
                const index = (x % 4) + math_trunc(x/4);
                return instrument(
                    index >= 4 
                        ? list_ref(arpeggio, index % 4 + 1) + 12 
                        : list_ref(arpeggio, index),
                    duration_each
                );
            }
        ));
}

// Test
play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1, cello));

// Comments
/*
Your arpeggiator_up is hardcoded to produce 16 sounds even when the input list arpeggio contains fewer or greater than 7 notes.
*/

// Question 4
function simplify_rhythm(rhythm) {
    const combine = (a,b) => append(a, b);
    return is_list(rhythm)
        ? accumulate(combine, list(),
            build_list(
                length(rhythm), 
                index => simplify_rhythm(list_ref(rhythm, index))
            )
        )
        
        : is_pair(rhythm)
            ? accumulate(combine, list(),
                build_list(
                    tail(rhythm), // n times
                    x => simplify_rhythm(head(rhythm))
                )
            )
            
            : list(rhythm); // Number
}

// Test
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
simplify_rhythm(my_rhythm);

// Question 5
const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(noise_sound(duration));
}

function mute(note, duration) {
    return silence_sound(duration);
}

function simplify_rhythm(rhythm) {
    const combine = (a,b) => append(a, b);
    return is_list(rhythm)
        ? accumulate(combine, list(),
            build_list(
                length(rhythm), 
                index => simplify_rhythm(list_ref(rhythm, index))
            )
        )
        
        : is_pair(rhythm)
            ? accumulate(combine, list(),
                build_list(
                    tail(rhythm), // n times
                    x => simplify_rhythm(head(rhythm))
                )
            )
            : list(rhythm); // Number
}

function percussions(distance, list_of_sounds, rhythm) {
    const tune = simplify_rhythm(rhythm);
    return simultaneously(build_list(
        length(tune),
        index => consecutively(list(
            silence_sound(distance * index),
            list_ref(list_of_sounds, list_ref(tune, index))
        ))
    ));
}

// Test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_cello = cello(50, 0.7);
const my_bell = bell(72, 1);

play(percussions(0.5,
    list(my_mute_sound,
         my_snare_drum, 
         my_cello, 
         my_bell), 
    list(1,2,1,0,3,1,0)
));
