//displaying game over and restart
//obstacle is touching the monkey twice
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running, monkeyImage;
var banana, bananaImage, obstacle, obstacleImage;
var ground, invisibleGround, jungle, jungleImage;
var bananaGroup, obstacleGroup;
var score = 0;

function preload(){
  
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage = loadImage("animated-jungle-background-clipart-6.jpg");
 
}



function setup() {
  
  createCanvas(600,400);
  
  jungle = createSprite(200,100,1200,400);
  jungle.addImage(jungleImage);
  jungle.velocityX = -3;
  jungle.scale = 1.5;
  
  ground = createSprite(300,350,1800,10);
  
  invisibleGround = createSprite(300,360,1800,10);
  invisibleGround.visible = false;
  
  
  monkey = createSprite(300,300,100,200);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("colliding", monkey_collided);
  monkey.scale = 0.1;
  //monkey.velocityX = 3;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("yellow");
  
  if(jungle.x < 0){
      jungle.x = jungle.width/2;
  }
  
  if(gameState == PLAY){
    camera.x = monkey.x;
    ground.visible = true;
    monkey.visible = true;
    jungle.visible = true;
    monkey.addAnimation("colliding",monkey_collided);
    
  if(keyDown("space")&&monkey.y >= 250){
      monkey.velocityY = -12;
    }
    
  monkey.velocityY = monkey.velocityY + 0.8;
    
  spawnBananas();
  spawnObstacles();
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
    //console.log(monkey.scale);
    
        
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1;
    monkey.addAnimation("running", monkey_running);
    gameState = END;
  }
}
    
   switch(score){
        
        case 10: 
         monkey.scale = 0.12;
         break;
        case 20:
         monkey.scale = 0.14;
         break;
        case 30:
         monkey.scale = 0.16;
         break;
        case 40:
         monkey.scale = 0.18;
         break;
        default : break;
    }
  
  if(gameState == END){
    stroke("green");
    fill("black");
    textSize(30);
    text("GAME OVER!",200,200);
    textSize(12);
    stroke("black");
    text("Press R to RESTART",80,50);
    ground.visible = false;
    jungle.velocityX = 0;
    jungle.visible = false;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.visible = false;
    if(keyDown("r")){
      gameState = PLAY;
      restart();
    }

  }

  monkey.collide(invisibleGround);

  drawSprites();
  stroke("green");
  textSize(15); 
  fill("black");
  text("Score: "+ score ,450,50);
  
}

function spawnBananas(){
  if(World.frameCount%80 == 0){
    banana = createSprite(600,Math.round(random(120,200)),20,40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -8;
    banana.lifetime = 80;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(World.frameCount%300 == 0){
    obstacle = createSprite(600,310,50,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 90;
    //obstacle.debug = true;
    obstacle.setCollider("circle",0,0,obstacle.height/3);
    obstacleGroup.add(obstacle);
  }
}

function restart(){
  jungle.velocityX = -3;
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
  score = 0;
}






