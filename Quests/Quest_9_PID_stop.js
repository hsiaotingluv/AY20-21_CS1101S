// Question 1

const motorA = ev3_motorA();
const motorB = ev3_motorD();
const colour = ev3_colorSensor();

const set_point = ev3_reflectedLightIntensity(colour);

let current_point = set_point;
let difference = current_point - set_point; 
let previous_diff = current_point - set_point;
let previous_dir = "right";
let motor_dur = 100;

//For when the difference is large
function wide_turn(dir) {
    const motor_dur = 10;
    const decrement = 900;
    const base_speed = - 300;
    if (dir === "left") {
        ev3_runForTime(motorA, motor_dur, base_speed - decrement);
        ev3_runForTime(motorB, motor_dur, base_speed);
    } else if(dir === "right") {
        ev3_runForTime(motorA, motor_dur, base_speed);
        ev3_runForTime(motorB, motor_dur, base_speed - decrement);
    } else{}
}

//For when the difference is small
//decrement reduces speed of one motor to make robot turn in the 
//desired direction
function narrow_turn(dir) {
     const motor_dur = 100;
     const decrement = 700;
     const base_speed = - 200;
     if (dir === "left") {
         ev3_runForTime(motorA, motor_dur, base_speed - decrement);
         ev3_runForTime(motorB, motor_dur, base_speed);
     } else if(dir === "right") {
         ev3_runForTime(motorA, motor_dur, base_speed);
         ev3_runForTime(motorB, motor_dur, base_speed - decrement);
     } else {}
 }

function integral() {
    const significant_difference = 15;
    current_point = ev3_reflectedLightIntensity(colour); 
    difference = current_point - set_point; 
    if (difference <= previous_diff) {
        if (difference >= significant_difference) {
            wide_turn("right");
            previous_dir = "right";
            previous_diff = difference;
        } else if (difference < significant_difference) {
            narrow_turn("right");
            previous_dir = "right";
            previous_diff = difference;
        } else {}
    } else {
        if (difference >= significant_difference) {
            wide_turn("left");
            previous_dir = "left";
            previous_diff = difference;
        } else if (difference < significant_difference) {
            narrow_turn("left");
            previous_dir = "left";
            previous_diff = difference;
        } else {}
    }
}

function spiral() {
    const motor_dur = 100;
    const base_speed = -10;
    
    ev3_runForTime(motorA, motor_dur, base_speed);
    ev3_runForTime(motorB, motor_dur, base_speed);
    
    
    while (ev3_reflectedLightIntensity(colour) < 20) {
        integral(); 
    } 
}

// Function application to execute PID mission
spiral();
