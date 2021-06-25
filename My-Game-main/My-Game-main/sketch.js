var ground1,ground2,groundImg;
var mario,marioImg1;
var marioImg2;
var enemy,enemyImg,enemyGroup;
var invisground,invisleft;
var platform,platformImg,platformGroup;
var edges;
var coin1,coin2,coin3,coinImg,coin1Group,coin2Group,coin3Group;
var score,life;
var gameState="play";
var reset,resetImg;
var coinSound;
var hit;

function preload(){
  groundImg=loadImage("Images/ground.jpg");
  marioImg1=loadImage("Images/mario/sprite4.png");
  marioImg2=loadAnimation("Images/mario/sprite1.png","Images/mario/sprite2.png","Images/mario/sprite3.png",
  "Images/mario/sprite4.png","Images/mario/sprite5.png","Images/mario/sprite6.png","Images/mario/sprite7.png",
  "Images/mario/sprite8.png","Images/mario/sprite9.png","Images/mario/sprite10.png","Images/mario/sprite11.png",
  "Images/mario/sprite12.png",);
  enemyImg=loadImage("Images/enemy.png");
  platformImg=loadImage("Images/platform.png");
  coinImg=loadImage("Images/coin.png");
  resetImg=loadImage("Images/reset.png");
  coinSound=loadSound("Sound/coin.wav");
  hit=loadSound("Sound/hit.mp3");
}

function setup() {
  createCanvas(800,400);
  ground1=createSprite(400,200,800,400);
  ground1.addImage(groundImg);
  ground1.scale=2;

  ground2=createSprite(1200,200,800,400);
  ground2.addImage(groundImg);
  ground2.scale=2;

  invisground=createSprite(400,320,800,10);
  invisground.visible=false;

  invisleft=createSprite(15,200,20,400);
  invisleft.visible=false;

  mario=createSprite(50, 263, 50, 50);
  mario.setCollider("rectangle",0,25,200,450);
  mario.addImage("standing",marioImg1);
  mario.addAnimation("running",marioImg2);
  mario.scale=0.2;

  reset=createSprite(700,265,50,50);
  reset.addImage(resetImg);
  reset.scale=0.2;
  reset.visible=false;

  edges=createEdgeSprites();

  score=0;
  life=3;

  enemyGroup=new Group();
  platformGroup=new Group();
  coin1Group=new Group();
  coin2Group=new Group();
  coin3Group=new Group();
}

function draw() {
  background(groundImg); 
  
  drawSprites();

  if(gameState==="play"){

  if(ground1.x<-400){
    ground1.x=1200;
  }
  if(ground2.x<-400){
    ground2.x=1200;
  }

  if(keyDown("up")&&(mario.collide(invisground)||(mario.collide(platformGroup)))){
    mario.velocityY=-13;
  }
  mario.velocityY=mario.velocityY+0.5;

  if(keyDown("right")){
    mario.changeAnimation("running",marioImg2);
    ground1.velocityX=-6;
    ground2.velocityX=-6;
  }
  else{
    mario.changeImage("standing",marioImg1);
    ground1.velocityX=0;
    ground2.velocityX=0;
  }

  spawnObstacles();
  spawnPlatforms();

  if(coin1Group.isTouching(mario)){
    coinSound.play();
    coin1Group.destroyEach();
    score=score+2;
  }
  if(coin2Group.isTouching(mario)){
    coinSound.play();
    coin2Group.destroyEach();
    score=score+2;
  }
  if(coin3Group.isTouching(mario)){
    coinSound.play();
    coin3Group.destroyEach();
    score=score+2;
  }

  if(enemyGroup.isTouching(mario)){
    hit.play();
    enemyGroup.destroyEach();
    life=life-1;
  }

  if(life===0){
    gameState="end";
  }

  mario.collide(invisground);
  mario.collide(invisleft);
  mario.collide(platformGroup);
  mario.collide(edges[0]);

}

else if(gameState==="end"){

  reset.visible=true;

  mario.destroy();
  ground1.velocityX=0;
  ground2.velocityX=0;
  platformGroup.destroyEach();
  coin1Group.destroyEach();
  coin2Group.destroyEach();
  coin3Group.destroyEach();
  enemyGroup.destroyEach();

  fill("black");
  textSize(65);
  text("GAME OVER",200,200);

  if(mousePressedOver(reset)){
    restart();
  }
}

  fill("black");
  textSize(30);
  text("Score: "+score,635,60);

  fill("black");
  textSize(30);
  text("Life: "+life,35,60);

}

function spawnObstacles() {
     
    if(keyDown("right")){
    //  var rand=Math.round(random(100,150));
      if(frameCount%125===0){
    enemy=createSprite(850,283,50,50);
    enemy.addImage(enemyImg);
    enemy.scale=0.3;
    enemyGroup.add(enemy); 
    enemy.lifetime=800;
      }
      enemyGroup.setVelocityXEach(-6);
    
  }
    else{
      enemyGroup.setVelocityXEach(0);
    }
  
}

function spawnPlatforms() {
     
  if(keyDown("right")){
  //  var rand=Math.round(random(200,400));
    if(frameCount%200===0){
  platform=createSprite(1000,200,50,50);
  platform.addImage(platformImg);

  coin1=createSprite(1000,140,50,50);
  coin1.addImage(coinImg);
  coin2=createSprite(920,140,50,50);
  coin2.addImage(coinImg);
  coin3=createSprite(1080,140,50,50);
  coin3.addImage(coinImg);

  platform.scale=0.8;
  coin1.scale=0.2;
  coin2.scale=0.2;
  coin3.scale=0.2;

  platformGroup.add(platform); 
  coin1Group.add(coin1);
  coin2Group.add(coin2);
  coin3Group.add(coin3);

  platform.lifetime=800;
  coin1.lifetime=800;
  coin2.lifetime=800;
  coin3.lifetime=800;

    }
    platformGroup.setVelocityXEach(-6);
    coin1Group.setVelocityXEach(-6);
    coin2Group.setVelocityXEach(-6);
    coin3Group.setVelocityXEach(-6);
  
}
  else{
    platformGroup.setVelocityXEach(0);
    coin1Group.setVelocityXEach(0);
    coin2Group.setVelocityXEach(0);
    coin3Group.setVelocityXEach(0);
  }

}

function restart(){
  gameState="play";
  reset.visible=false;
  mario=createSprite(50, 263, 50, 50);
  mario.setCollider("rectangle",0,25,200,450);
  mario.addImage("standing",marioImg1);
  mario.addAnimation("running",marioImg2);
  mario.scale=0.2;
  life=3;
  score=0;
}

