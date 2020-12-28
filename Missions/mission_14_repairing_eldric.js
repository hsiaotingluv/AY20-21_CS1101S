// Question 1
const motorA = ev3_motorA();
const motorB = ev3_motorB();
const colour = ev3_colorSensor();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");
display(ev3_connected(colour) ? "colour connected" : "colour not connected");

let green_count = 0;
let red_count = 0;
let prev_colour = 6;

let flag = true; 

//helper functions
function brake() {
    ev3_motorSetStopAction(motorA, "brake");
    ev3_motorSetStopAction(motorB, "brake");
}

function run_slow() {
    const motor_dur = 50;
    const motor_spd = -200;

    ev3_runForTime(motorA, motor_dur, motor_spd);
    ev3_runForTime(motorB, motor_dur, motor_spd);
    ev3_pause(10);
}

function run_fast() {
    const motor_dur = 50;
    const motor_spd = -1000;

    ev3_runForTime(motorA, motor_dur, -700);
    ev3_runForTime(motorB, motor_dur, -900);
    ev3_pause(10);
}

// Main function that will carry out the mission
function solve() {
    while (flag) {  
        function check_colour() {
            const current_color = ev3_colorSensorGetColor(colour);
            if (current_color === 6) {
                if (prev_colour === 2) {
                    green_count = green_count + 1;
                } else if (prev_colour === 4) {
                    red_count = red_count + 1;
                } else {}
            } else {}
            prev_colour = current_color;
        }
        
         if (red_count === 1) {
             run_slow();
             check_colour();
         } else if (red_count === 2) { 
             flag = false; 
         } else if (green_count < 2) {
             run_slow();
             check_colour();
         } else {
             run_fast();
             check_colour();        
         }
    }
  
    brake();
}

// Function application to carry out the mission
solve();

// Question 2
const motorA = ev3_motorA();
const motorB = ev3_motorD();
const colour = ev3_colorSensor();
const gyro = ev3_gyroSensor();

display(ev3_connected(motorA) ? "A connected" : "A not connected");
display(ev3_connected(motorB) ? "B connected" : "B not connected");
display(ev3_connected(colour) ? "colour connected" : "colour not connected");
display(ev3_connected(gyro) ? "gyro connected" : "gyro not connected");

function turn(angle) {
    function turn(dir) {
        //motor_dur corresponds to the value for which robot will turn 
        //the required value => 90
        const motor_dur = 100;
        const motor_forward = -200;
        const motor_reverse = 200;
            //speed of motor have the same absolute values so robot will rotate 
            // same amount but in different directions
        if (dir === "left") {
            ev3_runForTime(motorA, motor_dur, motor_reverse);
            ev3_runForTime(motorB, motor_dur, motor_forward);
            ev3_pause(100);
        } else if (dir === "right") {
            ev3_runForTime(motorA, motor_dur, motor_forward);
            ev3_runForTime(motorB, motor_dur, motor_reverse);
            ev3_pause(100);
        } else {}
    }
    const direc = angle < 0 ? "left" : "right";
    const magic_360 = 354; // magic_value after calibrating with gyro
    const magic_right = 87; // magic_value after calibrating with gyro
    const magic_left = 88; // magic_value after calibrating with gyro
    
    const value = angle === 360
                    ? magic_360
                    : angle === 90
                        ? magic_right
                        : angle === -90
                            ? magic_left
                            : 0; 
                            
    const pos = ev3_gyroSensorAngle(gyro);
    let current_pos = pos;
    
    function helper() {
        turn(direc);
        current_pos = ev3_gyroSensorAngle(gyro);
        if (math_abs(pos - current_pos) >= value) {
            
        } else {
            ev3_pause(100);
            return helper();
        }
    }
    helper();
}

// Make robot move forward (slow)
function run_forward_for(dist) {
    dist = dist / 10;
        //divided by ten so input can match the cm required to run
        //133 and 1000 corresponds to the value for which our robot travels 10cm
    const motor_dur = 133;
    const motor_spd = -100;
    
    for (let i = 0; i < dist; i = i + 1) {
        ev3_runForTime(motorA, motor_dur, motor_spd);
        ev3_runForTime(motorB, motor_dur, motor_spd);
        ev3_pause(200);   
    }
}

// Make robot move backward (slow)
function run_backward_for(dist) {
    dist = dist / 10;
        //divided by ten so input can match the cm required to run
        //133 and 1000 corresponds to the value for which our robot travels 10cm
    const motor_dur = 137;
    const motor_spd = 100;
    
    for (let i = 0; i < dist; i = i + 1) {
        ev3_runForTime(motorA, motor_dur, motor_spd);
        ev3_runForTime(motorB, motor_dur, motor_spd);
        ev3_pause(200);   
    }
}

// Make robot speed forward fast for dist cm
function run_forward_fast_for(dist) {
    dist = dist / 10;
        //divided by ten so input can match the cm required to run
        //133 and 1000 corresponds to the value for which our robot travels 10cm
    const motor_dur = 128;
    const motor_spd = -820;
    
    for (let i = 0; i < dist; i = i + 1) {
        ev3_runForTime(motorA, motor_dur, motor_spd);
        ev3_runForTime(motorB, motor_dur, motor_spd);
        ev3_pause(200);   
    }
}

// Make robot move forward slow until detects colour change
// and return the colour detected
function run_forward_until_change() {
    while (ev3_colorSensorGetColor(colour) === 6) {
        run_forward_for(10);
    }
   
    return ev3_colorSensorGetColor(colour);
}
// Function to align the robot in the correct direction
function align_dir() {
    turn(90);
    ev3_pause(200);
    const new_colour = run_forward_until_change();
    if (new_colour === 1) {
        run_backward_for(70);
        turn(90);
        ev3_pause(1000);
        turn(90);
        ev3_pause(1000);
    } else {
        run_backward_for(70);
        turn(-90);
    }
}

// Function that will navigate the robot to the correct Quadrant to start
// (Quad A)
function go_to_A() {
    let at_A = false;
    while(!at_A) {
        turn(90);
        const new_colour = run_forward_until_change();
        if (ev3_colorSensorGetColor(colour) === 2) {
            run_backward_for(70);
            turn(-90);
            at_A = true;
        } else {
            run_backward_for(70);
            turn(-90);
            run_forward_fast_for(70);
            turn(90);
        }
    }
}
 
// Function to invoke to carry out the screwing and turning
// after Robot reaches A and faces correct direction
function solve() {
    turn(360);
    ev3_pause(1000); 
    run_forward_fast_for(60);
    ev3_pause(1000);
    turn(360);
    ev3_pause(1000);
    turn(90);
    ev3_pause(1000);
    run_forward_fast_for(60);
    ev3_pause(1000);
    turn(360);
    ev3_pause(1000);
    turn(90);
    ev3_pause(1000);
    run_forward_fast_for(60);
    ev3_pause(1000);
    turn(360);
    ev3_pause(1000);
}

// The following 3 function applications ensures that the mission is completed
// successfully
align_dir();
go_to_A();
solve();
