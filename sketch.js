var backImage,backgr;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var player, player_running, player_collided;
var ground;
 
var BananaGroup, bananaImage;
var StonesGroup, stone,stoneImage;
var score=0; 
var count=0;
//var scene; 
//place gameOver and restart icon on the screen
var gameOver, gameoverImg; 
var restart, restartImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  gameoverImg = loadImage("gameOver.png");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
  player_collided = loadImage("Monkey_08.png");
  restartImg = loadImage("restart.png");
  

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver= createSprite(400, 100);
  gameOver.addImage(gameoverImg);
  gameOver.scale = 1;
  gameOver.visible=false; 

  restart = createSprite(400, 200);
  restart.addImage(restartImg);
  restart.scale = 1;
  restart.visible=false;
 
 BananaGroup = new Group();
 StonesGroup = new Group();
  
  score = 0;
  
  
}

function draw() { 
  background(0);
 // camera.position.x = player.x;  
  textSize(20);
  fill("white");
  text("Score: "+ score, 700, 50);

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
  if(gameState === PLAY)
  {      
   
   

    if(keyDown("space")) 
    {
      player.velocityY = -10;
    }
    //Add gravity
    player.velocityY = player.velocityY + 0.8

    if (ground.x < 200)
    {
      ground.x = ground.width/2;
    }

    player.collide(ground);
    spawnBananas();
    spawnObstacles();
    if(BananaGroup.isTouching(player))
    {
      BananaGroup.destroyEach();
       switch(score) {  
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;       
        
      }
      score=score+1;

    }
    if(StonesGroup.isTouching(player))
    {
      player.scale=0.1;      
      gameState=END;          

    }
  }
  else if(gameState === END) {
    score=0; 
    gameOver.visible = true;
    restart.visible = true;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityX = 0; 
    player.velocityY = 0;    
    player.addImage("collided", player_collided);
    StonesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);        
       
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  drawSprites();
}

function spawnBananas() {
  //write code here to spawn the Bananas
  if (frameCount % 80 === 0) 
  {
    bananas = createSprite(800, 250, 40, 10);
    bananas.y = Math.round(random(100, 250));
    bananas.addImage(bananaImage);
    bananas.scale = 0.05;
    bananas.velocityX = -3;                                                                             
    
     //assign lifetime to the variable
    bananas.lifetime = 200;
  //adjust the depth
    bananas.depth = player.depth;
    player.depth = player.depth + 1; 
    
    //add each Banana to the group
    BananaGroup.add(bananas);
  }
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) 
  {
    //stone = createSprite(player.x+300,165,10,40);
    stone = createSprite(800, 325,50,50);
    stone.velocityX = -4;
    stone.addImage(stoneImage);      
    //assign scale and lifetime to the obstacle           
    stone.scale = 0.15;
    stone.lifetime = 300;
    //add each obstacle to the group
    StonesGroup.add(stone);
  }
}
function reset(){ 
 gameState=PLAY;
 restart.visible=false;
 gameOver.visible=false; 
 StonesGroup.destroyEach();
 BananaGroup.destroyEach(); 
}
