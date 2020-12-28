// Question 1
function array_to_stream(a) {
    function helper(a, i) {
        return is_undefined(a[i]) 
            ? null 
            : pair(a[i], () => helper(a, i+1));
    }
    return helper(a, 0);
}

// Alternatively	
function array_to_stream(a) {
    return build_stream(array_length(a), x => a[x]);
}

// Test
display(array_length(anomaly_data) ===
        stream_length(array_to_stream(anomaly_data)));
display(anomaly_data[7] === 
        stream_ref(array_to_stream(anomaly_data), 7));

// Question 2
function array_to_stream(a) {
    function helper(a, i) {
        return is_undefined(a[i]) 
            ? null 
            : pair(a[i], () => helper(a, i+1));
    }
    return helper(a, 0);
}

function stream_to_filter(s) {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    return (src, dest) => {
        const image = head(s);
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                dest[i][j] = image[i][j];
            }
        }
        s = is_null(stream_tail(s)) ? s : stream_tail(s);
    };
}

install_filter(stream_to_filter(array_to_stream(anomaly_data)));
// Comments
/*
Breaks when given the empty stream. Please check edge cases and assumptions in your code.
Also, you don't need to copy each pixel over one at a time since you're just copying the entire image. With a single loop you can copy row by row.
*/

// Question 3

function array_to_stream(a) {
    function helper(a, i) {
        return is_undefined(a[i]) 
            ? null 
            : pair(a[i], () => helper(a, i+1));
    }
    return helper(a, 0);
}

function stream_to_filter(s) {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    return (src, dest) => {
        const image = head(s);
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                dest[i][j] = image[i][j];
            }
        }
        s = is_null(stream_tail(s)) ? s : stream_tail(s);
    };
}

function loop(s) {
    function helper(stream) {
        return is_null(stream_tail(stream))
            ? pair(head(stream), 
                    () => helper(s))
            : pair(head(stream),
                    () => helper(stream_tail(stream)));
    }
    return helper(s);
}

// Alternatively
function loop(s) {
    function helper(stream) {
        return pair(head(stream),
                    () => is_null(stream_tail(stream)) 
                        ? helper(s)
                        : helper(stream_tail(stream)));
    }
    return helper(s);
}

install_filter(
    stream_to_filter(
        loop(array_to_stream(anomaly_data))));

// Comments
/*
Breaks when given the empty stream.
*/

// Question 4
function array_to_stream(a) {
    function helper(index) {
        return is_undefined(a[index]) ? null
            : pair(a[index], () => helper(index+1));
    }
    return helper(0);
}

function stream_to_filter(s) {
    const HEIGHT = video_height();
    const WIDTH = video_width();
    
    return (src, dest) => {
        const image = head(s);
        for (let i = 0; i < HEIGHT; i = i+1) {
            for (let j = 0; j < WIDTH; j = j+1) {
                dest[i][j] = image[i][j];
            }
        }
        s = is_null(stream_tail(s)) ? s : stream_tail(s);
    };
}

function loop(s) {
    function helper(stream) {
        return is_null(stream_tail(stream))
            ? pair(head(stream), 
                    () => helper(s))
            : pair(head(stream),
                    () => helper(stream_tail(stream)));
    }
    return helper(s);
}

function time_lapse(s, n) {
    function helper(stream, num) {
        return num % n === 0 
            ? pair(head(stream), 
                    () => helper(stream_tail(stream), num+1))
            : helper(stream_tail(stream), num+1);
    }
    return helper(s, n);
}

install_filter(
    stream_to_filter(
        time_lapse(loop(array_to_stream(anomaly_data)),
                   3)));

// Comments
/*
Breaks when given the empty stream. Please check edge cases and the assumptions in your code in future.
For example, head(s) and stream_tail(s) assume that s is non-empty. Only if you can be sure that s is non-empty is calling it always valid. Same goes for lists and programming in general. Remember this. A lot of bugs in code (not just yours) are due to programmers not being clear about the assumptions they are implicitly making.
*/
