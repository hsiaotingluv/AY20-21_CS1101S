// Question 1
function bunny_steps(n) {
    if (n < 0) {
        return 0;
    } else if (n === 0 || n === 1) {
        return 1;
    } else {
        return bunny_steps(n-1) + bunny_steps(n-2) + bunny_steps(n-3);
    }
}

// Question 2
function contains(x, ls){
	return member(x, ls) !== null;
}

function wet_steps(n, bad_steps){
    if (n < 0 || contains(n, bad_steps) || contains(0, bad_steps)) {
        return 0;
    } else if (n === 0 || n === 1) {
        return 1;
    } else {
        return wet_steps(n-1, bad_steps) + wet_steps(n-2, bad_steps);
    }
}

// Question 3
function super_bunny(n){
	function helper(n, steps) {
	    if (n === 0 || n === 1) {
	        return 1;
	    } else if (n <= 0 || steps <= 0) {
	        return 0;
	    } else {
	        return helper(n-steps, steps) + helper(n, steps-1);
	    }
	}
	return helper(n, n);
}

// Question 4
function contains(x, ls){
	return member(x, ls) !== null;
}

function bad_fur_day(n, bad_steps, e){
    if (contains(0, bad_steps)) {
        return 0;
    } else if (n === 0 && e >= 0) {
        return 1;
    } else if (e <= 0 || n < 0 || contains(n, bad_steps)) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return bad_fur_day(n-1, bad_steps, e-1) + 
                bad_fur_day(n-2, bad_steps, e-4);
    }
}
