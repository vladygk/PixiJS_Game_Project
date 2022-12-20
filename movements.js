export function playerMovement(playerSprite,renderer,stage) {
    playerSprite.y = renderer.screen.height / 2;
  
    playerSprite.rotation += 0.1;
    renderer.render(stage);
  }
  

  export function enemyMovement(enemySprite,renderer,stage){
    
  
    enemySprite.position.x -= 1;
    renderer.render(stage);
  }
let delta = 0; 

  export function enemyOscilateMovement(enemySprite,renderer,stage){
    
     delta+=0.01;
    
    
    enemySprite.position.y += 10*Math.sin(delta);
    if(enemySprite.position.y>=renderer.screen.height -10 ||enemySprite.position.y )
    
    renderer.render(stage);
  }