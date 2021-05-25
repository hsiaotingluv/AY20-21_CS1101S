// Question 1
function generate_list_of_note(letter_name, list_of_interval) {
    return reverse(accumulate(
        (first, second) => append(list(head(second) + first), second),
        list(letter_name_to_midi_note(letter_name)),
        reverse(list_of_interval)
    ));
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_intervals(n, repeat, intervals) {
    return n === 0 ? intervals : repeat_intervals(n - 1, repeat, repeat(intervals));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    const repeated_list_of_interval = 
        repeat_intervals(n-1, x => append(list_of_interval, x), list_of_interval);
    const list_of_notes = generate_list_of_note(note, repeated_list_of_interval);
    const list_of_sounds = map(note => instrument(note, duration), list_of_notes);
    return list_of_sounds;
}

play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 0.5, cello)));

// Question 2
function play_matrix(distance, list_of_sounds) {
    for_each(col => {
        function play_sound() {
            for_each(
                row => {
                    if (list_ref(list_ref(get_matrix(), row), col)) {
                        play_concurrently(list_ref(list_of_sounds, row));
                    } else {}
                },
                build_list(length(list_of_sounds), x => x)
            );
            if (col === 15) { play_matrix(distance, list_of_sounds); } 
            else {}
        }
        set_timeout(play_sound, distance * col * 1000);
    }, build_list(16, x => x));
}

function stop_matrix() {
    clear_all_timeout();
}

function generate_list_of_note(letter_name, list_of_interval) {
    return reverse(accumulate(
        (first, second) => append(list(head(second) + first), second),
        list(letter_name_to_midi_note(letter_name)),
        reverse(list_of_interval)
    ));
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

function repeat_intervals(n, repeat, intervals) {
    return n === 0 ? intervals : repeat_intervals(n - 1, repeat, repeat(intervals));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    const repeated_list_of_interval = 
        repeat_intervals(n-1, x => append(list_of_interval, x), list_of_interval);
    const list_of_notes = generate_list_of_note(note, repeated_list_of_interval);
    const list_of_sounds = map(note => instrument(note, duration), list_of_notes);
    return list_of_sounds;
}

const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, cello);
play_matrix(0.3, sounds);
stop_matrix();

// Comments
if (col === 15) { play_matrix(distance, list_of_sounds); } 
This is causing the last column and the first column to play at the same time. (-1 mark)
