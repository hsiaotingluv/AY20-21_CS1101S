// Question 1
This function returns a stream when applied to no arguments.

// Question 2
One window pops up and after a button is pressed, prompt_stream refers to a stream.

// Question 3
The program successively pops up three windows and returns the last entered string.

// Question 4
The program keeps popping up new windows and never returns a value.

// Question 5
No.

// Question 6
// input: number
// output: number

function helper_stream(input) {
    let count = 1;
    let result = 1;
    
    for (let i = 1; i <= input; i = i+1) {
        if (count === 0) {
            count = result;
            result = result + 1;
        } else {
            count = count - 1;
        }
    }
    return result;
}

// output: stream
function n_of_n_stream() {
    return stream_map(x => helper_stream(x), integers_from(1));
}

// Question 7
// input: stream, number
// output: stream

function shorten_stream(s, k) {
    if (is_null(s) || k === 0) {
        return null;
    } else {
        return pair(head(s), 
                    () => shorten_stream(stream_tail(s), k - 1));
    }
}
