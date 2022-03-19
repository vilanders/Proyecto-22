var climber;
var door;
var ghostJumping, ghostStanding;
var tower;
var play = 1;
var end = 0;
var gameState = 1;
var gameOver;
var score = 0;

function preload() {
ghostImage = loadImage("ghost-jumping.png");
ghostImage1 = loadImage("ghost-standing.png");
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");
spooky = loadSound("spooky.wav");
towerImage = loadImage("tower.png");
gameOverImage = loadImage("gameover.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);
spooky.loop();


tower = createSprite(width/2,200);
tower.addImage("tower",towerImage);
tower.velocityY = 15;
tower.scale=3.2;

ghost = createSprite(width/2,height-150,40,10);
ghost.addImage("ghost jumping",ghostImage);
ghost.scale = 0.6;

gameOver = createSprite(width/2,height/2);
gameOver.addImage(gameOverImage);
gameOver.scale=4;


doorG=new Group();
climberG=new Group();

ghost.debug=false;

ghost.setCollider("rectangle", 0, 0, 290, 150);
}

function draw() {
background(255);

edges = createEdgeSprites();
ghost.collide(edges);

if(gameState===play){
  gameOver.visible=false;

  if(tower.y > height) {
    tower.y = tower.height/2; 
  }

  doors();
  climbers();

   score = score + Math.round(frameCount/60);

   if(keyDown(LEFT_ARROW)){
       ghost.x = ghost.x - 10;
   
     //escribir el código para mover al fantasma a la izquierda al presionar la flecha izquierda
   }
   if(keyDown(RIGHT_ARROW)){
   
         ghost.x = ghost.x + 10;
   
     //escribir el código para mover el fantasma a la derecha al presionar la flecha derecha 
     
   }
   if(keyDown(UP_ARROW)){
   
        ghost.y = ghost.y - 10;
   
     //escribir el código para mover el fantasma hacia arriba al presionar la flecha arriba 
     
   }
   if(keyDown(DOWN_ARROW)){
     ghost.y = ghost.y + 10;

   }

   if(ghost.isTouching(climberG) || ghost.x < 250 || ghost.x > width-250){
     gameState=end;


   }
}
if(gameState===end){
  gameOver.visible=true;
  doorG.destroyEach();
  climberG.destroyEach();
  tower.velocityY=0;
  ghost.destroy();

}



 

 





drawSprites();
textSize(20);
fill(255);
text("score = "+ score,width-150,30);
}

function doors() {
  if (frameCount%60===0){
    door = createSprite(Math.round(random(250,width-250)),height-980,10,40);
    door.addImage(doorImage);
    door.scale=2;
    door.velocityY=15;




    doorG.add(door);
  }

}

function climbers() {
  if (frameCount%60===0){
    climber = createSprite(door.x,height-870,15,5);
    climber.addImage(climberImage);
    climber.scale=2;
    climber.velocityY=15;
    climberG.add(climber);
  }

}