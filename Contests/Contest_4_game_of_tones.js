// Question 1
// My contest entry
function sounds_contest_CHEN_HSIAO_TING() {
    const notes = list(
        list("D5","C#5","B4","F#4"),
        list("F#4","F#4","F#4","F#4","F#4","B4","B4","B4","B4","A4","B4"), 
        list("G4"),
        list("G4","G4","G4","G4","G4","B4","B4","B4","B4","C#5","D5"), 
        list("A4"),
        list("A4","A4","A4","A4","D5","C#5","D5","C#5","D5","E5","E5"),
        list("C#5")
    );
    
    const freqs = map(
        x => x === "0" ? 0 : letter_name_to_midi_note(x),
        accumulate(
            (cur, rest) => append(cur, rest), 
            null, map(x => append(x, list("0")), notes)   
        )
    );
    
    const delay = list(
        1,1,2,4, 4,
        4,4,4,4,4,4,4,4,2,4,4, 2,
        4, 4,
        4,4,4,4,4,4,4,4,2,4,4, 2,
        4, 4,
        4,4,4,4,4,4,4,4,2,4,4, 2,
        1/2, 2
    );
    
    function combine(notes, gaps) {
        return is_null(notes)
            ? null
            : pair(pair(head(notes), head(gaps)), combine(tail(notes), tail(gaps)));
    }
    
    const timing = 0.6;
    const song = combine(freqs, delay);
    
    return consecutively(list(
        consecutively(map(x => cello(head(x), timing/tail(x)), song)),
        consecutively(map(x => cello(head(x), timing/tail(x)), song))
    ));
}

// Test your sound here:
// Delete or comment out the following line before submission
// play(sounds_contest_CHEN_HSIAO_TING());
