var background2, background2Img
var robot, robotImg, robot2Img, robot3Img
var spaceShip, spaceShipImg

var mars, marsImg
var invisibleGround2
var stand, stand1
var line
var level2Score = 0


var END2 = 0
var PLAY2 = 1
var WIN2 = 2

var mode = "LEVEL2";
var gameState = PLAY2;
level2Score = 0;


function preload(){
    background2Img = loadImage("LEVEL2Img/space2.jpg")
    
    marsImg = loadImage("LEVEL2Img/mars.png")
    spaceShipImg = loadImage("LEVEL2Img/spaceShip.png")
    robotImg = loadAnimation("LEVEL2Img/robot1.png","LEVEL2Img/robot2.png","LEVEL2Img/robot3.png",
    "LEVEL2Img/robot4.png","LEVEL2Img/robot5.png","LEVEL2Img/robot6.png","LEVEL2Img/robot7.png",
    "LEVEL2Img/robot8.png",)
    robot2Img=loadImage("LEVEL2Img/robot6.png")
    robot3Img=loadImage("LEVEL2Img/robot1.png")
    
    

}
function setup(){
   createCanvas(1200,540)

background2=createSprite(650,270,20,20)
background2.addImage(background2Img)
background2.scale=1.5


robot=createSprite(200,100,20,20)
robot.addAnimation("stand",robot2Img )
robot.addAnimation("walk",robotImg)
robot.addAnimation("jump",robot3Img )

robot.scale=0.4
 
invisibleGround2=createSprite(200,250,100,20)
invisibleGround2.shapeColor="orange"

line=createSprite(650,530,1300,20)
line.shapeColor="red"

standGroup=new Group()
stand1Group=new Group()
spaceShipGroup=new Group()

marsGroup=new Group()
}

function draw(){
background(0)

edges= createEdgeSprites();
  robot.collide(edges);

if (gameState === PLAY2 && mode === "LEVEL2") {
    spawnspaceShip()
    sapwnStand()
    background2.velocityX=-7
if (background2.x < 350) {
    background2.x = width / 2;
  }

  robot.changeAnimation("walk",robotImg)
robot.velocityX=0
if(keyDown(RIGHT_ARROW)){
    robot.changeAnimation("walk",robotImg)
    invisibleGround2.destroy()
    robot.velocityX=5
    
}
if(keyDown(LEFT_ARROW)){
  robot.changeAnimation("walk",robotImg)
  invisibleGround2.destroy()
  robot.velocityX=-5
  
}
if(keyDown(UP_ARROW)){
    robot.velocityY = -10;
    robot.changeAnimation("jump",robot3Img)
}


robot.velocityY = robot.velocityY + 1.0
      robot.collide(invisibleGround2)
      robot.collide(standGroup)
      robot.collide(stand1Group)
      
  if(frameCount%1000===0){
    mars=createSprite(1200,250,20,20)
    mars.addImage(marsImg)
    mars.scale=0.05
    mars.velocityX=-5
    marsGroup.add(mars)
  }
  if(robot.isTouching(marsGroup)){
    gameState=WIN2
    mode="LEVEL2"
  }
      
      if(level2Score===20){
        gameState=WIN2
        mode="LEVEL2"
    }
     if(robot.isTouching(line)){
       gameState=END2
       mode="LEVEL2"
     }
  drawSprites()
}if (gameState === END2 && mode === "LEVEL2") {
    background2.velocityX=0
    robot.visible = false
    textSize(40);
    fill("RED");
    text("YOU LOST ", 450, 200);
    textSize(20);
    fill("TURUOISE");
    text("Press 'R' to restart", 450, 240)
    if(keyDown("R")){
        restart2();
    }
}if (gameState === WIN2 && mode === "LEVEL2") {
    robot.destroy()
    background2.velocityX = 0
    background(132,132,99)
 
    textSize(40);
    fill("white");
    text("YOU WIN ", 450, 100);
    textSize(20);
    fill("turquoise");
    text("press 'N' for next level ", 450, 200);
}

  
  textSize(20);
  fill("GREEN");
  text("SCORE: " + level2Score, 100, 30);

}