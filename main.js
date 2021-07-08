var song = "";

var leftWristX = 0;
var leftWristY = 0;

var rightWristX = 0;
var rightWristY = 0;

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
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(2.5);
}