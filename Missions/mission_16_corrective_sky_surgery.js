// Question 1
function my_first_filter(ignore, dest) {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    for (let i = 0; i < HEIGHT; i = i + 1) {
        for (let j = 0; j < WIDTH; j = j + 1) {
            const red = i/HEIGHT * 255;
            const green = j/WIDTH * 255;
            const blue = (255 - i/HEIGHT * 255) * (1 - j/WIDTH);
            
            dest[i][j][0] = red;
            dest[i][j][1] = green;
            dest[i][j][2] = blue;
            dest[i][j][3] = 255;
        }
    }
}

install_filter(my_first_filter);

// Question 2
let offset = 0; // For live video challenge

function copy(src, dest) {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    for (let i = 0; i < HEIGHT; i = i + 1) {
        for (let j = 0; j < WIDTH; j = j + 1) {
           dest[i][j][0] = src[i][j][0];
           dest[i][j][1] = src[i][j][1];
           dest[i][j][2] = src[i][j][2];
           dest[i][j][3] = src[i][j][3];
        }
    }
}

function is_circle(x, y, num, thickness) {
    const r = math_sqrt(x*x + y*y);
    return math_floor(r / thickness) % 2 === 1;
}

function crosshair(src, dest) {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    const num = 4; // number of rings
    const thickness = WIDTH/4 / num + offset; // thickness of rings
    
    for (let i = 0; i < HEIGHT; i = i + 1) {
        for (let j = 0; j < WIDTH; j = j + 1) {
            // centralise coordinate, center to be (0,0)
            const x = j - math_floor(WIDTH/2);
            const y = math_floor(HEIGHT/2) - i;
            
            if (x === 0 || y === 0) {
                dest[i][j][0] = 255;
                dest[i][j][1] = src[i][j][1];
                dest[i][j][2] = src[i][j][2];
                dest[i][j][3] = 255;
            } else if (is_circle(x, y, num, thickness)) {
                dest[i][j][0] = src[i][j][1];
                dest[i][j][1] = src[i][j][2];
                dest[i][j][2] = 255;
                dest[i][j][3] = 255;
            } else {
                dest[i][j][0] = src[i][j][0];
                dest[i][j][1] = src[i][j][1];
                dest[i][j][2] = src[i][j][2];
                dest[i][j][3] = src[i][j][3];
            }
        }
    }
    offset = offset + 1;
}

install_filter(crosshair);

// Question 3
let offset = 0.0;

function zoom(factor) {
    return (src, dest) => {
        const WIDTH = video_width();
        const HEIGHT = video_height();
        const temp_factor = 1 + offset > factor ? factor : 1 + offset;
        
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                // centralise coordinate, center to be (0,0)
                const x = j - math_floor(WIDTH/2);
                const y = math_floor(HEIGHT/2) - i;
                
                // zoom in by factor
                const temp_x = math_floor(x/temp_factor);
                const temp_y = math_floor(y/temp_factor);
                
                // revert coordinate back to top left being (0, 0)
                const new_x = math_floor(WIDTH/2) + temp_x;
                const new_y = math_floor(HEIGHT/2) - temp_y;
                
                // x is column, y is row
                dest[i][j] = src[new_y][new_x];
            } 
        }
        offset = offset + 0.05;
    };
}

install_filter(zoom(2));

// Question 4
function flip_vertically(src, dest) {
    const HEIGHT = video_height();
    const WIDTH = video_width();
    
    for (let i = 0; i < HEIGHT; i = i + 1) {
        for (let j = 0; j < WIDTH; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[HEIGHT - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    for (let i = 0; i < HEIGHT; i = i + 1){
        for (let j = 0; j < WIDTH; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }          
        }
    }
}

function zoom(factor) {
    return (src, dest) => {
        const WIDTH = video_width();
        const HEIGHT = video_height();
        
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                // centralise coordinate, center to be (0,0)
                const x = j - math_floor(WIDTH/2);
                const y = math_floor(HEIGHT/2) - i;
                
                // zoom in by factor
                const temp_x = math_floor(x/factor);
                const temp_y = math_floor(y/factor);
                
                // revert coordinate back to top left being (0, 0)
                const new_x = math_floor(WIDTH/2) + temp_x;
                const new_y = math_floor(HEIGHT/2) - temp_y;
                
                // x is column, y is row
                dest[i][j] = src[new_y][new_x];
            } 
        }
    };
}   

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

function stack(filter1, filter2) {
    const temp1 = make_image();
    const temp2 = make_image();

    const HEIGHT = video_height();
    const half_height = math_floor(HEIGHT / 2);

    return (src, dest) => {
        filter1(src, temp1);
        filter2(src, temp2);
        for (let i = 0; i < half_height; i = i + 1) {
            dest[i] = temp1[i * 2]; // upper half
            dest[i + half_height] = temp2[i * 2]; // lower half
        }
        // take last row from temp2, if HEIGHT is odd
        for (let i = half_height * 2; i < HEIGHT; i = i + 1) {
            dest[i] = temp2[i];
        }
    };
}

function beside(filter1, filter2) {    
    const temp1 = make_image();
    const temp2 = make_image();

    const WIDTH = video_width();
    const half_width = math_floor(WIDTH / 2);
    const HEIGHT = video_height();

    return (src, dest) => {
        filter1(src, temp1);
        filter2(src, temp2);
        
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < half_width; j = j + 1) {
                dest[i][j] = temp1[i][j * 2];
                dest[i][j + half_width] = temp2[i][j * 2];
            }
            
            // take last column from temp2, if WIDTH is odd
            for (let j = half_width * 2; j < WIDTH; j = j + 1) {
                dest[i][j] = temp2[i][j];
            }
        }
    };
}

install_filter(stack(beside(flip_vertically, color_invert),
                     beside(copy_image, zoom(2))));

// Question 5
function flip_vertically(src, dest) {
    const HEIGHT = video_height();
    const WIDTH = video_width();
    
    for (let i = 0; i < HEIGHT; i = i + 1) {
        for (let j = 0; j < WIDTH; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[HEIGHT - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const WIDTH = video_width();
    const HEIGHT = video_height();
    
    for (let i = 0; i < HEIGHT; i = i + 1){
        for (let j = 0; j < WIDTH; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }          
        }
    }
}

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

function compose(filter1, filter2) {
    const temp1 = make_image();
    const final = make_image();

    const HEIGHT = video_height();
    const WIDTH = video_width();

    return (src, dest) => {
        filter1(src, temp1);
        filter2(temp1, final);
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                dest[i][j] = final[i][j];
            }
        }
    };
}

install_filter(compose( flip_vertically, color_invert));

// Comments
/*
Good job but there's a simpler way to make compose. (-50XP)
*/
