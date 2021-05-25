// Question 1 
function make_image() {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    const img = [];
    for (let i = 0; i < HEIGHT; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < WIDTH; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function within_bounds(x, y, min_x, max_x, min_y, max_y) {
    return x > min_x && x < max_x &&
        y > min_y && y < max_y;
}

function stellar_motion_detector(src, dest) {
    const diff_threshold = 300;
    const red_threshold = 220;
    const pixel_max = 500;
    
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    let min_i = HEIGHT;
    let max_i = 0;
    let min_j = WIDTH;
    let max_j = 0;
    
    for (let i = 0; i < HEIGHT; i = i + 1){
        for (let j = 0; j < WIDTH; j = j + 1){
            const current = src[i][j][0] + src[i][j][1] + src[i][j][2];
            const previous = prev_frame[i][j][0] + prev_frame[i][j][1] + prev_frame[i][j][2];
            const difference = math_abs(current - previous);
            
            if (difference > diff_threshold && src[i][j][0] > red_threshold && 
                current < pixel_max) {
                    if (i < min_i) { min_i = i; }
                    else if (i > max_i) { max_i = i; }
                    else {}
                    
                    if (j < min_j) { min_j = j; }
                    else if (j > max_j) { max_j = j; }
                    else {}
            } else {}
            
            prev_frame[i][j] = src[i][j];
        }
    }
    
    for (let i = 0; i < HEIGHT; i = i + 1){
        for (let j = 0; j < WIDTH; j = j + 1){
            if (within_bounds(i, j, min_i, max_i, min_j, max_j)) {
                dest[i][j][0] = src[i][j][0];
                dest[i][j][1] = src[i][j][1];
                dest[i][j][2] = 255;
                dest[i][j][3] = src[i][j][3];
            } else {
                dest[i][j][0] = src[i][j][0];
                dest[i][j][1] = src[i][j][1];
                dest[i][j][2] = src[i][j][2];
                dest[i][j][3] = src[i][j][3];
            }
        }
    }
}

let prev_frame = make_image();
install_filter(stellar_motion_detector);

// Question 2
function make_image() {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    const img = [];
    for (let i = 0; i < HEIGHT; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < WIDTH; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function play_alarm() {
    for (let i = 0; i < 5; i = i+1) {
        set_timeout(() => play(sine_sound(1234, 0.1)), i * 1100);
    }
}

function noisy_stellar_motion_detector(src, dest) {
    const diff_threshold = 300;
    const moved = false;
    
    for (let i = 0; i < HEIGHT; i = i + 1){
        for (let j = 0; j < WIDTH; j = j + 1){
            const current = src[i][j][0] + src[i][j][1] + src[i][j][2];
            const previous = prev_frame[i][j][0] + prev_frame[i][j][1] + prev_frame[i][j][2];
            const difference = math_abs(current - previous);
            moved = difference > diff_threshold;
        }
    }
    
    if (moved) { play_alarm(); } else {}
}

let prev_frame = make_image();
install_filter(noisy_stellar_motion_detector);
