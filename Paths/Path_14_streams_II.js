// Question 1
const alternating_ones = pair(1, 
                            () => pair(-1, 
                                    () => alternating_ones));

// Question 2
function make_alternating_stream(s) {
    return pair(head(s), 
                () => pair(-1 * head(stream_tail(s)),
                    () => make_alternating_stream(
                        stream_tail(stream_tail(s))))
                );
}

// Question 3
function merge_streams(s1, s2) {
    return pair(head(s1), 
                () => pair(head(s2),
                            () => merge_streams(stream_tail(s1),
                                                stream_tail(s2))));
}

// Question 4
function every_other(s) {
    return pair(head(s), 
                () => every_other(stream_tail(stream_tail(s))));
}

// Question 5
function partial_sums(s) {
    function helper(acc, s) {
        return pair(acc + head(s),
                    () => helper(acc + head(s), stream_tail(s)));
    }
    return helper(0, s);
}
