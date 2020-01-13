var Mode = {
    waiting: 0,
    acceleration: 1,
    constant: 2,
    deceleration: 3,
    result: 4,
    beforeSetting: 5
};
var mode = Mode.beforeSetting;
var nameList = [];
var probabilityList = [];
var ratioSum = 0;
var speed = 0.0;
var theta = 0.0;

const ACCEL = 0.01;
const DECEL = 0.01;
const MAX_SPEED = 1.0;

var holding = false;

function getRandomInt(min, max) {
  return min+Math.floor(Math.random() * Math.floor(max-min));
}

function preload(){
    
}

function setup(){
    var canvas = createCanvas(600,300);
    canvas.parent('canvas');
    textSize(20);
    stroke(0,0,0);
    fill(0,0,0);
    background(255,255,255);
}

function mousePressed(){
    holding = true;
    
}

function mouseReleased() {
    holding = false;

}

function touchStarted(){
    mousePressed();
}

function touchEnded(){
    mouseReleased();
}

function dataFetch(){
    list = [];
    $('.item').each(function(){
        var ratio = $(this).find('.ratio').val()-0;
        ratioSum += ratio;
    });
    $('.item').each(function(){
        var name = $(this).find('.name').val();
        var ratio = $(this).find('.ratio').val()-0;
        nameList.push(name);
        probabilityList.push(ratio/ratioSum);
    });
}

function start(){
    if(mode==Mode.beforeSetting||mode==Mode.waiting){
        $('#stop').css('display', 'inline-block');
        $('#start').css('display', 'none');
        dataFetch();
        mode = Mode.acceleration;
    }
}

function stop(){
    if(mode==Mode.acceleration || mode==Mode.constant){
        $('#start').css('display', 'inline-block');
        $('#stop').css('display', 'none');
        mode = Mode.deceleration;
    }
}

function reset(){
    $('#start').css('display', 'inline-block');
    $('#stop').css('display', 'none');
    theta = 0.0;
    speed = 0.0;
    mode = Mode.waiting;
}

function drawAllShapes(){
    fill(100,255,255);
    arc(0,0,100,100,0,1*PI);

}

function draw(){
    fill(255,255,255);
    rect(0,0,width,height);
    translate(width/2, height/2);
    switch(mode){
    case Mode.beforeSetting:

        break;
    case Mode.waiting:
        rotate(theta);
        drawAllShapes();
        break;
    case Mode.acceleration:
        if(speed<MAX_SPEED){
            speed += ACCEL;
        }else{
            mode = Mode.constant;
        }
        theta += speed;
        theta-=(floor(theta/2/PI))*2*PI;
        rotate(theta);
        drawAllShapes();
        break;
    case Mode.constant:
        theta += speed;
        theta-=(floor(theta/2/PI))*2*PI;
        rotate(theta);
        drawAllShapes();
        break;
    case Mode.deceleration:
        if(speed>DECEL){
            speed -= DECEL;
        }else{
            speed = 0.0;
            mode = Mode.result;
        }
        theta += speed;
        theta-=(floor(theta/2/PI))*2*PI;
        rotate(theta);
        drawAllShapes();
        break;
    case Mode.result:
        rotate(theta);
        drawAllShapes();
        break;
    }
}