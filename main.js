var song = "";

var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

var leftWristY_score = 0;

function preload(){
 song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(560, 600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', getPoses)
}

function modelLoaded(){
    console.log("All set for usage!")
}

function getPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristY_score = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Y Score : " + leftWristY_score);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);

        
    }
}

function draw(){
    image(video, 0, 0, 560, 600);

if(leftWristY_score > 0.2){
    fill('red');
    stroke('red');
    circle(leftWristX, leftWristY, 20);

    floored_number_form_of_LeftWristY = floor(Number(leftWristY));
    volume = floored_number_form_of_LeftWristY/500;
    document.getElementById("volume_display").innerHTML = volume ;
    song.setVolume(volume);
}
    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}