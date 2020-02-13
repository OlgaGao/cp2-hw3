// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
var x, y;
var vx ,vy;
var leftPaddle;
var rightPaddle;
var leftscore = 0;
var rightscore = 0;
var startgame = 0;
var player1;
  var player2;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
  x = width / 2;
  y = height / 2;
  vx = 3;
  vy = 1.2;

  leftPaddle = height / 2;
  rightPaddle = height / 2;

  rectMode(CENTER);
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();

  // 


  if (!startgame) {
    return;
  }


  rect(20, leftPaddle, 10, 50);
  rect(width - 20, rightPaddle, 10, 50);
  fill(205);

  ellipse(x, y, 20);
  fill(223, 245, 60);

  x = x + vx;
  y = y + vy;

  if (y < 10) {
    vy = -vy;
  }
  if (y > height - 10) {
    vy = -vy;
  }
  
    for (var i = 0; i < poses.length; i++) {
    if (poses.length < 2) {

      vx = 0;
      vy = 0;
      print('length<2');

    }

    if (poses.length >= 2) {
    
      // leftPaddle  = poses[0];
      //     // rightPaddle  = poses[1];
      //     leftPaddle  = poses[0].pose.nose.y;

      //     rightPaddle  = poses[1].pose.nose.y;
      //      print ('length==2');

      var firstX = poses[0].pose.nose.x;
      print(firstX);
      var secondX = poses[1].pose.nose.x;
    
      if (firstX > secondX) {
        rightPaddle = poses[0].pose.nose.y;
        leftPaddle = poses[1].pose.nose.y;

      }
      if (firstX < secondX) {
        rightPaddle = poses[1].pose.nose.y;
        leftPaddle = poses[0].pose.nose.y;
      }


    }
  }
  
  if (x < 35) {
    if (y < leftPaddle + 25 && y > leftPaddle - 25) {
      vx = -vx;
    } else {

      text('lose', width / 2, height / 2);
      rightscore = rightscore + 1;
      x=width/2,y=height/2;

    }
  }

  if (x > width - 35) {
    if (y < rightPaddle + 25 && y > rightPaddle - 25) {
      vx = -vx;
    } else {
      text('lose', width / 2, height / 2);
      leftscore++;
       x=width/2,y=height/2;
    }
  }

   
 





  text('player1', 0, 20);

  textSize(20);
  text('player2', 570, 20);

  textSize(20);
  text(leftscore, 20, 40);
  text(rightscore, 590, 40);

  fill(25, 30, 200);


  //   if(x<=0){
  //   text('lose',width/2,height/2);
  //     leftscore=leftscore+1;

  // }







  //   rightPaddle=pose
  // leftPaddle = rightPaddle = mouseY;
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }

    }
  }

}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function mousePressed() {
  startgame = 1;
    vx = 3;
      vy = 1.2;
}
