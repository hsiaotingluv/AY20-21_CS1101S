// Question 1
function backward(sound) {
    const length = get_duration(sound);
    const wave = t => get_wave(sound)(length - t);
    return make_sound(wave, length);
}

// init_record();                       // step 1
// const my_voice = record_for(5, 0.2); // step 2
// play(backward(my_voice()));          // step 3 in REPL

// Question 2
function repeat(n, sound) {
    return consecutively(build_list(n, x => sound));
    // ALTERNATIVELY:
    // return make_sound(
    //     t => {
    //         const offset = math_trunc(t/get_duration(sound)) * get_duration(sound);
    //         return get_wave(sound)(t - offset);
    //     },
    //     n * get_duration(sound)
    // );
}

const my_sound = consecutively(
     list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(3, my_sound);
play(my_repeated);

// Question 3
function fast_forward(n, sound) {
    return make_sound(
        t => get_wave(sound)(t * n),
        get_duration(sound) / n
    );
}

// init_record(); // step 1

// const my_voice = record_for(2, 0.2); // step 2

// play(fast_forward(2, my_voice()));   // step 3 in REPL

// Question 4
function echo(n, d, sound) {
    const create = x => consecutively(list(
        make_sound(
            t => 1/math_pow(2,x) * get_wave(sound)(t), 
            get_duration(sound)
        ),
        silence_sound(d)
    ));
    return consecutively(build_list(n, create));
}

const test_sound = sine_sound(800, 0.2);
play(echo(3, 0.3, test_sound));

// Comments
You may have misunderstood the problem. The echos are supposed to play at the same time as the original sound, but making sounds later. It's different from starting one after another. The difference is more apparent when the delay is shorter than the sound length (the first echo should still start before the original has finished). Also, for the given test output, it does not match the recording. Yours plays twice not thrice.

// Question 5
function backward(sound) {
    const length = get_duration(sound);
    const wave = t => get_wave(sound)(length - t);
    return make_sound(wave, length);
}

function repeat(n, sound) {
    return consecutively(build_list(n, x => sound));
}

function fast_forward(n, sound) {
    return make_sound(
        t => get_wave(sound)(t * n),
        get_duration(sound) / n
    );
}

function echo(n, d, sound) {
    const create = x => consecutively(list(
        make_sound(
            t => 1/math_pow(2,x) * get_wave(sound)(t), 
            get_duration(sound)
        ),
        silence_sound(d)
    ));
    return consecutively(build_list(n, create));
}

function make_alien_jukebox(sound) {
    return x => x === 1
        ? play(backward(sound))
        : x === 2
            ? play(fast_forward(1/2, sound))
            : x === 3
                ? play(repeat(3, fast_forward(2, sound)))
                : x === 4
                    ? play(echo(4, 0.3, backward(sound)))
                    : play(sound);
}

// Test in REPL:
// init_record();
// const erksh_voice = record_for(1, 0.2);

const j = make_alien_jukebox(erksh_voice());

// j(0);  // plays original recording
// j(1);  // plays it backward
// j(2);  // plays it at half speed
// j(3);  // plays it at double speed, three times in a row
// j(4);  // plays it backward with 4-times echo,
//        //     with 0.3 seconds echo delay

// Comments
Your solution does not satisfy this contraint:
Make sure that the number of applications of make_sound is constant, no matter how many times you apply the jukebox, here j.
