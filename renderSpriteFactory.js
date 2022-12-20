import { animateHelper } from "./utils.js";
let enemies = [];
export async function renderSprite(
  imageSrc,
  x,
  y,
  renderer,
  stage,
  ticker,
  randomSpawn,
  ...animateFuncs
) {
    
  const texture = await PIXI.Assets.load(imageSrc);
  const sprite = PIXI.Sprite.from(texture);
  const colors = [
    0xfe0000, 0x002efe, 0x23fe00, 0xf600fe, 0xf2fe00, 0x000000, 0x7c00ff,
    0xff8b00, 0x00ffe0, 0xff0097, 0x8f898c,
  ];
  sprite.x = x;
  sprite.y = y;
  if (randomSpawn) {
    sprite.y = Math.random() * renderer.screen.height;

    sprite.tint = colors[Math.round(Math.random() * 10)];
  }

  sprite.anchor.set(0.5);

  stage.addChild(sprite);
  enemies.push(sprite);
  for (let func of animateFuncs) {
    ticker.add(animateHelper(sprite, renderer, stage, func));
  }
  console.log(enemies.length);
}

let animatedSprite;
export function renderPlayer(stage) {
  const alienImages = [
    "/Images/images/cropped_0.png",
    "/Images/images/cropped_1.png",
    "/Images/images/cropped_2.png",
    "/Images/images/cropped_3.png",
    "/Images/images/cropped_4.png",
    "/Images/images/cropped_5.png",
    "/Images/images/cropped_6.png",
  ];
  const textureArray = [];

  for (let i = 0; i < 7; i++) {
    const texture = PIXI.Texture.from(alienImages[i]);
    textureArray.push(texture);
  }
  animatedSprite = new PIXI.AnimatedSprite(textureArray);
  stage.addChild(animatedSprite);
  animatedSprite.position.set(500, 500);
  animatedSprite.loop = true;
  animatedSprite.animationSpeed = 0.2;
  animatedSprite.play();
  animatedSprite.scale.set(2, 2);
  return animatedSprite;
}


export function deleteSprites(stage){
    
   const toDelete =  enemies.filter(z=>z.position.x<=0);
   if(toDelete.length>0){
    toDelete.forEach(sprite => stage.removeChild(sprite));
   }
   
   console.log(stage.Children)
}
