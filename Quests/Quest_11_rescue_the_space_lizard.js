// Question 1
function max_flies_to_eat(tile_flies) {
    const MAX_ROW = array_length(tile_flies) - 1;
    const MAX_COL = array_length(tile_flies[MAX_ROW]) - 1;
    
    function traverse(row, col) {
        if (col < 0 || col > MAX_COL) {
            return 0;
        } else if (row === 0) {
            return tile_flies[0][col];
        } else {
            const left = traverse(row-1, col-1);
            const mid = traverse(row-1, col);
            const right = traverse(row-1, col+1);
            const maximum = math_max(left, mid, right);
            return tile_flies[row][col] + maximum;
        }
    }
    
    let max_flies = 0;
    for (let i = 0; i <= MAX_COL; i = i+1) {
        const value = traverse(MAX_ROW, i);
        if (value > max_flies) { max_flies = value; } else {}
    }
    
    return max_flies;
}

// TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];

max_flies_to_eat(tile_flies); // Expected result: 32

// Question 2
const mem = [];

function read(n, k) {
    return (mem[n] === undefined) ?
        undefined : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    } else {}
    mem[n][k] = value;
}

function memo_max_flies_to_eat(tile_flies) {
    const MAX_ROW = array_length(tile_flies) - 1;
    const MAX_COL = array_length(tile_flies[MAX_ROW]) - 1;
    
    function traverse(row, col) {
        if (row === 0) {
            return tile_flies[row][col];
        } else {
            const left = col-1 < 0 ? 0 
                : is_undefined(read(row-1, col-1))
                    ? traverse(row-1, col-1) 
                    : read(row-1, col-1);
                
            const mid = is_undefined(read(row-1, col)) 
                ? traverse(row-1, col) 
                : read(row-1, col);
                
            const right = col+1 > MAX_COL ? 0
                : is_undefined(read(row-1, col+1)) 
                    ? traverse(row-1, col+1) 
                    : read(row-1, col+1);
                
            const maximum = tile_flies[row][col] + 
                math_max(left, mid, right);
            write(row, col, maximum);
            
            return maximum;
        }
    }
    
    let max_flies = 0;
    for (let i = 0; i <= MAX_COL; i = i+1) {
        const value = traverse(MAX_ROW, i);
        if (value > max_flies) {
            max_flies = value; 
        } else {}
    }

    return max_flies;
}

// TEST:
// const tile_flies = [[3, 1, 7, 4, 2],
//                     [2, 1, 3, 1, 1],
//                     [1, 2, 2, 1, 8],
//                     [2, 2, 1, 5, 3],
//                     [2, 1, 4, 4, 4],
//                     [5, 7, 2, 5, 1]];

// memo_max_flies_to_eat(tile_flies); // Expected result: 32

