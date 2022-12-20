export function animateHelper(playerSprite, renderer, stage, callback) {
  return callback.bind(null, playerSprite, renderer, stage);
}


export function deleteHelper(stage,callback){
    return callback.bind(null,stage);
}