// Question 1
const motorA = ev3_motorA();
const motorB = ev3_motorB();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");

// Takes in a numerical value of distance in cm and move robot that distance
function run_forward_for(dist) {
    dist = dist / 10;
    //divided by ten so input can match the cm required to run
    //133 and 1000 corresponds to the value for which our robot travels 10cm
    const motor_dur = 133;
    const motor_spd = -1000;
    
    for (let i = 0; i < dist; i = i + 1) {
        ev3_runForTime(motorA, motor_dur, motor_spd);
        ev3_runForTime(motorB, motor_dur, motor_spd);
        ev3_pause(200);   
    }
}

run_forward_for(10);

// Question 2
const motorA = ev3_motorA();
const motorB = ev3_motorB();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");

// Takes in "left" or "right" as argument and turn in that direction accordingly
function turn(dir) {
    //motor_dur corresponds to the value for which robot will turn 
    //the required value => 90
    const motor_dur = 575;
    
    const motor_forward = -1000;
    const motor_reverse = 1000;
    
    //speed of motor have the same absolute values so robot will rotate the same
    //amount but in different directions
    if (dir === "left") {
        ev3_runForTime(motorA, motor_dur, motor_reverse);
        ev3_runForTime(motorB, motor_dur, motor_forward);
        ev3_pause(1000);
    } else if (dir === "right") {
        ev3_runForTime(motorA, motor_dur, motor_forward);
        ev3_runForTime(motorB, motor_dur, motor_reverse);
        ev3_pause(1000);
    } else {}
}

turn("left");

// Question 3
const motorA = ev3_motorA();
const motorB = ev3_motorB();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");

// Takes in a numerical value of distance in cm and move robot that distance
function run_forward_for(dist) {
    dist = dist / 10;
    //divided by ten so input can match the cm required to run
    //133 and 1000 corresponds to the value for which our robot travels 10cm
    const motor_dur = 133;
    const motor_spd = -1000;
    
    for (let i = 0; i < dist; i = i + 1) {
        ev3_runForTime(motorA, motor_dur, motor_spd);
        ev3_runForTime(motorB, motor_dur, motor_spd);
        ev3_pause(200);   
    }
}

// Takes in "left" or "right" as argument and turn in that direction accordingly
function turn(dir) {
    //motor_dur corresponds to the value for which robot will turn 
    //the required value => 90
    const motor_dur = 575;
    
    const motor_forward = -1000;
    const motor_reverse = 1000;
    
    //speed of motor have the same absolute values so robot will rotate the same
    //amount but in different directions
    if (dir === "left") {
        ev3_runForTime(motorA, motor_dur, motor_reverse);
        ev3_runForTime(motorB, motor_dur, motor_forward);
        ev3_pause(1000);
    } else if (dir === "right") {
        ev3_runForTime(motorA, motor_dur, motor_forward);
        ev3_runForTime(motorB, motor_dur, motor_reverse);
        ev3_pause(1000);
    } else {}
}

function solve_quadrants() {
    run_forward_for(60);
    turn("right");
    run_forward_for(60);
    turn("right");
    run_forward_for(50);
}

// Test:
solve_quadrants();

