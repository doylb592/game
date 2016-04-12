var foodSprites;
var badSprites;
var player;
var score = 0;
var lives = 5;
var livePrinted;

var timer;
var badTimer;

function preload(){
  playerIcon = loadImage("images/hello_kitty.png");
  foodIcon = loadImage("images/My_Melody.png");
  badIcon = loadImage("images/kuromi.png");
}

function setup() {
  createCanvas(400, 400);
  player = createSprite(width/2, height - 50, 40, 40);
  player.addImage(playerIcon);

  foodSprites = new Group();
  badSprites = new Group();

  timer = setInterval(createFood, 3000);
  badTimer = setInterval(createBad, 3000);
}

function createFood(){

  for(var i = 0;i<5;i++){
    var food = createSprite(random(0,width), random(-height,0), 40, 40);
    food.addImage(foodIcon);
    food.setVelocity(0,2); //<-- make the food fall from the sky by increasing y
    food.life = 300; //<-- this is the lifespan of the food in frames
    foodSprites.add(food);
  }
}

function createBad(){

  for(var i = 0;i<2;i++){
    var bad = createSprite(random(0,width), random(-height,0), 40, 40);
    bad.addImage(badIcon);
    bad.setVelocity(0,3);
    bad.life = 300;
    badSprites.add(bad);
  }
}

function draw() {
  background("pink");
  drawSprites();
  player.overlap(foodSprites, eat);
  player.overlap(badSprites, eatBad);

  //player controls
  if(keyIsPressed){
    if(keyCode == LEFT_ARROW){
      player.setVelocity(-5,0); //<-- move left by subtracting from x
    }
    if(keyCode == RIGHT_ARROW){
      player.setVelocity(5,0); //<-- move right by adding to x
    }
  } else{
    player.setVelocity(0,0); //<-- if no key is pressed stop moving
  }

  if(lives < 0){
    window.clearInterval(timer);
    window.clearInterval(badTimer);

    fill("white");
    noStroke();
    textSize(50);
    text("Game Over",70,210)
  }

  //score
  fill("white");
  noStroke();
  textSize(20);
  text(score,25, 40);

  //lives
  if (lives>=0){
  livesPrinted = lives
  }else {
  livesPrinted = 0
}

  fill("white");
  noStroke();
  textSize(20);
  text("lives: "+livesPrinted,300, 40);
}

function eat(spriteA, spriteB) {
  spriteB.remove();
  if (lives >= 0){
  score++;
  }
}

function eatBad(spriteA, spriteC) {
  spriteC.remove();
  lives--;
}
