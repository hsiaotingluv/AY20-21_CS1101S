// Question 1
const motorA = ev3_motorA();
const motorB = ev3_motorB();
const colour = ev3_colorSensor();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");
display(ev3_connected(colour) ? "colour connected" : "colour not connected");

//baby steps forward so robot can check that it is on the right path
function run_forward() {
    const motor_dur = 50;
    const motor_spd = -1000;
    
    ev3_runForTime(motorA, motor_dur, motor_spd);
    ev3_runForTime(motorB, motor_dur, motor_spd);
    ev3_pause(10);
}

//make small turns so robot will not miss out any black lines
function small_turn(dir) {
    const motor_dur_small_turn = 55;
    const motor_spd_forward = 500;
    const motor_spd_reverse = -500; 
    
    //value of motor duration and speed corresponds to the angles that robot
    //should turn. In this case, we want the robot to make small turns.
    
    //speed of motor have the same absolute values so each motor will rotate 
    //the same amount but in opposite directions
    
    if (dir === "left") {
        ev3_runForTime(motorA, motor_dur_small_turn, motor_spd_forward);
        ev3_runForTime(motorB, motor_dur_small_turn, motor_spd_reverse);
        ev3_pause(100);
    } else if (dir === "right") {
        ev3_runForTime(motorA, motor_dur_small_turn, motor_spd_reverse);
        ev3_runForTime(motorB, motor_dur_small_turn, motor_spd_forward);
        ev3_pause(100);
    } else {}
}

//make big turn since robot has already checked the angles using small turn
//this will avoid duplicate checks 
function big_turn(dir) {
    const motor_dur_big_turn = 900;
    const motor_spd_forward = 500;
    const motor_spd_reverse = -500;   
    
    //value of motor duration and speed corresponds to the angles that robot
    //should turn. In this case, we want the robot to make big turns.
    
    //speed of motor have the same absolute values so each motor will rotate 
    //the same amount but in opposite directions
    
    if (dir === "left") {
        ev3_runForTime(motorA, motor_dur_big_turn, motor_spd_forward);
        ev3_runForTime(motorB, motor_dur_big_turn, motor_spd_reverse);
        ev3_pause(1000);
    } else if (dir === "right") {
        ev3_runForTime(motorA, motor_dur_big_turn, motor_spd_reverse);
        ev3_runForTime(motorB, motor_dur_big_turn, motor_spd_forward);
        ev3_pause(1000);
    } else {}
}

function sweep_right(counter) {
    display(ev3_colorSensorGetColor(colour));
    if (counter >= 24) {
    //value of 24 corresponds to the value at which all angles around the robot
    //has been checked. If counter exceeds 23, there is no other path apart 
    //from the path that has been taken. 
    //end of path has been reached and Eldric has been found
        return "End of Maze, Eldric Found!”;
    } else {
        //if black line found, return maze() so robot proceeds along the black
        //line
        if (ev3_colorSensorGetColor(colour) === 0) {
            return maze();
        } else {
        //else, check the angles on the right for any possible paths
            small_turn("right");
            return sweep_right(counter + 1);
        }
    }
}

function sweep_left(counter) {
    display(ev3_colorSensorGetColor(colour));
    if (counter >= 14) {
    //make big turn to the right since robot has already checked the
    //angles by using small left turns
        big_turn("right");
    //then check all possible paths on the right of the original starting pt
        return sweep_right(0);
    } else {
        //if black line is found, call maze() to run forward
        if (ev3_colorSensorGetColor(colour) === 0) {
            return maze();
        //else, turn left by small angles to check for black line
        } else {
            small_turn("left");
            return sweep_left(counter + 1);
        }
    }
}

function maze() {
    display(ev3_colorSensorGetColor(colour));
    if (ev3_colorSensorGetColor(colour) === 0) {
    //if robot is on the black path, go forward
        run_forward();
    //recursively calls maze() so program can check that robot 
    //is on the black path
        return maze();
    } else {
    //if robot is not on the black path, kick of search for black line by first 
    //sweeoing left.
        return sweep_left(0);
    }
}

maze();

// Question 2
const motorA = ev3_motorA();
const motorB = ev3_motorB();
const colour = ev3_colorSensor();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");
display(ev3_connected(colour) ? "colour connected" : "colour not connected");

//baby steps forward so robot can check that it is on the right path
function run_forward() {
    const motor_dur = 50;
    const motor_spd = -1000;
    
    ev3_runForTime(motorA, motor_dur, motor_spd);
    ev3_runForTime(motorB, motor_dur, motor_spd);
    ev3_pause(10);
}

//make small turns so robot will not miss out any black lines
function small_turn(dir) {
    const motor_dur_small_turn = 55;
    const motor_spd_forward = 500;
    const motor_spd_reverse = -500; 
    
    //value of motor duration and speed corresponds to the angles that robot
    //should turn. In this case, we want the robot to make small turns.
    
    //speed of motor have the same absolute values so each motor will rotate 
    //the same amount but in opposite directions
    
    if (dir === "left") {
        ev3_runForTime(motorA, motor_dur_small_turn, motor_spd_forward);
        ev3_runForTime(motorB, motor_dur_small_turn, motor_spd_reverse);
        ev3_pause(100);
    } else if (dir === "right") {
        ev3_runForTime(motorA, motor_dur_small_turn, motor_spd_reverse);
        ev3_runForTime(motorB, motor_dur_small_turn, motor_spd_forward);
        ev3_pause(100);
    } else {}
}

//make big turn since robot has already checked the angles using small turn
//this will avoid duplicate checks 
function big_turn(dir) {
    const motor_dur_big_turn = 900;
    const motor_spd_forward = 500;
    const motor_spd_reverse = -500;   
    
    //value of motor duration and speed corresponds to the angles that robot
    //should turn. In this case, we want the robot to make big turns.
    
    //speed of motor have the same absolute values so each motor will rotate 
    //the same amount but in opposite directions
    
    if (dir === "left") {
        ev3_runForTime(motorA, motor_dur_big_turn, motor_spd_forward);
        ev3_runForTime(motorB, motor_dur_big_turn, motor_spd_reverse);
        ev3_pause(1000);
    } else if (dir === "right") {
        ev3_runForTime(motorA, motor_dur_big_turn, motor_spd_reverse);
        ev3_runForTime(motorB, motor_dur_big_turn, motor_spd_forward);
        ev3_pause(1000);
    } else {}
}

function sweep_right(counter) {
    display(ev3_colorSensorGetColor(colour));
    if (counter >= 24) {
    //value of 24 corresponds to the value at which all angles around the robot
    //has been checked. If counter exceeds 23, there is no other path apart 
    //from the path that has been taken. 
    //end of path has been reached and Eldric has been found
        return "End of Maze, Eldric Found!”;
    } else {
        //if black line found, return maze() so robot proceeds along the black
        //line
        if (ev3_colorSensorGetColor(colour) === 0) {
            return maze();
        } else {
        //else, check the angles on the right for any possible paths
            small_turn("right");
            return sweep_right(counter + 1);
        }
    }
}

function sweep_left(counter) {
    display(ev3_colorSensorGetColor(colour));
    if (counter >= 14) {
    //make big turn to the right since robot has already checked the
    //angles by using small left turns
        big_turn("right");
    //then check all possible paths on the right of the original starting pt
        return sweep_right(0);
    } else {
        //if black line is found, call maze() to run forward
        if (ev3_colorSensorGetColor(colour) === 0) {
            return maze();
        //else, turn left by small angles to check for black line
        } else {
            small_turn("left");
            return sweep_left(counter + 1);
        }
    }
}

function maze() {
    display(ev3_colorSensorGetColor(colour));
    if (ev3_colorSensorGetColor(colour) === 0) {
    //if robot is on the black path, go forward
        run_forward();
    //recursively calls maze() so program can check that robot 
    //is on the black path
        return maze();
    } else {
    //if robot is not on the black path, kick of search for black line by first 
    //sweeoing left.
        return sweep_left(0);
    }
}

maze();
