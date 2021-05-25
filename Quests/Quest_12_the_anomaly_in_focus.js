// Question 1
function find_red_rectangles(s) {
    const cur_image = head(s);
    const HEIGHT = array_length(cur_image);
    const WIDTH = array_length(cur_image[0]);
    
    let min_x = WIDTH;
    let min_y = HEIGHT;
    let max_x = 0;
    let max_y = 0;
    
    function search(img) {
        for (let i = 0; i < HEIGHT; i = i+1) {
            for (let j = 0; j < WIDTH; j = j+1) {
                const total = img[i][j][0] + img[i][j][1] + img[i][j][2];
                if (img[i][j][0] === 255 && total === 255) {
                    if (i < min_y) { min_y = i; }
                    else if (i > max_y) { max_y = i; }
                    else {}
                    
                    if (j < min_x) { min_x = j; }
                    else if (j > max_x) { max_x = j; }
                    else {}
                } else {}
            }
        }
        return pair(pair(min_y, min_x), pair(max_y, max_x));
    }
    
    return stream_map(x => search(x), s);
}

head(find_red_rectangles(anomaly_stream)); 
// should evaluate to: [[141, 191], [159, 209]]

// Comments
Interesting way of checking for a pure red pixel. It could be made even better by abstracting it out into a function.
By the way, since you're searching for minimums and maximums, you could simply use math_min and math_max which will do the comparison and updating of values for you. It would give more readable code. That said, you wrote the updating in an easy to understand way.
Also, x => search(x) can just be search.

// Question 2
function find_red_rectangles(s) {
    const cur_image = head(s);
    const HEIGHT = array_length(cur_image);
    const WIDTH = array_length(cur_image[0]);
    
    let min_x = WIDTH;
    let min_y = HEIGHT;
    let max_x = 0;
    let max_y = 0;
    
    function search(img) {
        for (let i = 0; i < HEIGHT; i = i+1) {
            for (let j = 0; j < WIDTH; j = j+1) {
                const total = img[i][j][0] + img[i][j][1] + img[i][j][2];
                if (img[i][j][0] === 255 && total === 255) {
                    if (i < min_y) { min_y = i; }
                    else if (i > max_y) { max_y = i; }
                    else {}
                    
                    if (j < min_x) { min_x = j; }
                    else if (j > max_x) { max_x = j; }
                    else {}
                } else {}
            }
        }
        return pair(pair(min_y, min_x), pair(max_y, max_x));
    }
    
    return stream_map(x => search(x), s);
}

function zip_stream(f, s1, s2) {
    return pair(f(head(s1), head(s2)), 
        () => zip_stream(f, stream_tail(s1), stream_tail(s2)));
}

// trim the given image using the given rectangle
// returns an image that includes all purely red
// pixels of the given image

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));
    
    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

// Example:
const focused_stream = zip_stream(
                           trim,
                           anomaly_stream,
                           find_red_rectangles(anomaly_stream));
                           
head(focused_stream);
			   
// should return a close-up of the anomaly, a 19x19 image of black,
// red and white pixels

// Question 3
// Use your solutions of the previous questions and
// write other functions HERE that might be helpful		  
// to answer the question on the right.

/*
Color:       Cyan (0, 255, 255, 255) 
Target:      Outer rim of anomaly

Process:    From zip stream function, the outer rim is seen to be red,
            which means that it reflects red light and absorbs 
            blue and green light. Hence, to deal maximal damage,
            light of both colors (cyan) should be used to target the
            outer rim.
*/

// Comments
Honestly, I like your answer. The question didn't really make it clear that you must target its shield, but they wanted you to write a function to search for pixels on the shield that were not fully white and get their location and color values then fire the inverted color at that spot.
