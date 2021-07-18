class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      character1 = createSprite(100,200);
      character1.addAnimation("character1",player1Img);
      character1.scale=0.4;
      character2 = createSprite(300,200);
    //  car2.addImage("car2",car2_img);
      character3 = createSprite(500,200);
     // car3.addImage("car3",car3_img);
      character4 = createSprite(700,200);
      //car4.addImage("car4",car4_img);
      characters= [character1,character2,character3,character4];
    }
    play(){
      form.hide();
      
      Player.getPlayerInfo();
     // player.getCarsAtEnd();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = 200 + (index * 200) + allPlayers[plr].xPos;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          
          characters[index-1].x = x;
          characters[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
       
            camera.position.x = displayWidth/2;
            camera.position.y =  characters[index-1].y;

            if( characters[index - 1].isTouching(obstacles))
              {
                
              //sound123.play();
                yVel -= 0.9;}
              }
                  
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        
        xVel -= 0.2;
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
       
        xVel += 0.2;
        player.update();
      }
  
if(player.distance >= 2000){
 
    //for(i=0;i<5;i++)
    //{
      w=random(600,950);
      h=random(-height*3,height*3);
      f1 = createSprite(w,h);
    //car1.debug="true";
    f1.addAnimation("f1",f2);
    obstacles.add(f1);
   obstacles.setVelocityEach(-3,- 5);
   
  
  
  // }


  }
  
  if(player.distance >= 3000){
 
    //for(i=0;i<5;i++)
    //{
      w=random(600,950);
      h=random(-height*3,height*3);
      f1 = createSprite(w,h);
    //car1.debug="true";
    f1.addAnimation("f1",f2);
    obstacles.add(f1);
   obstacles.setVelocityEach(-3,- 5);
   
  
  
  // }


  }
  







   if(player.distance > 4060){
        gameState = 2;
      
     
      }


      //move the car
      player.distance += yVel;
      yVel *= 0.98;
      player.xPos += xVel;
      xVel *= 0.985;
      player.update();
        
  //slingShot.display();
      drawSprites();
    }
  
    end(){
  
     background("white");
      textSize(24);
      stroke("Yellow");
      text("You Won "+player.name,camera.position.x,camera.position.y-70)
     
  
  
    }
  }
  