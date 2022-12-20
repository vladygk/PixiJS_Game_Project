import {
  playerMovement,
  enemyMovement,
  enemyOscilateMovement,
} from "./movements.js";
import {
  renderSprite,
  renderPlayer,
  deleteSprites,
} from "./renderSpriteFactory.js";
import { deleteHelper } from "./utils.js";


const canvas = document.getElementById("display");
const ticker = new PIXI.Ticker();
let height = window.innerHeight;
let width = window.innerWidth;

const renderer = new PIXI.Renderer({
  view: canvas,
  height: height,
  width: width,
  autoDensity: true,
  resolution: window.devicePixelRatio,
});

window.addEventListener("resize", resize);

function resize() {
  height = window.innerHeight;
  width = window.innerWidth;
  renderer.resize(width, height);
}

const stage = new PIXI.Container();

const sound = new Howl({
  src:"./Audio/backgroundsong.mp3",
  loop:true
});

sound.play();

let backgroundTexture = await PIXI.Assets.load("/Images/background.jpg");
let backgroundSprite = PIXI.Sprite.from(backgroundTexture);

backgroundSprite.anchor.x = 0;
backgroundSprite.anchor.y = 0;
backgroundSprite.position.x = 0;
backgroundSprite.position.y = 0;
backgroundSprite.scale.set(2.5, 2.5);
stage.addChild(backgroundSprite);

const playerSprite = renderPlayer(stage);

//player controls
let keys = { up: false, down: false, left: false, right: false };

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(event) {
  const keyCode = event.keyCode;
  if (keyCode === 83 || keyCode === 40) {
    keys.down = true;
  } else if (keyCode === 87 || keyCode === 38) {
    keys.up = true;
  } else if (keyCode === 65 || keyCode === 37) {
    keys.left = true;
  } else if (keyCode === 68 || keyCode === 39) {
    keys.right = true;
  }
}

function keyUp(event) {
  const keyCode = event.keyCode;
  if (keyCode === 83 || keyCode === 40) {
    keys.down = false;
  } else if (keyCode === 87 || keyCode === 38) {
    keys.up = false;
  } else if (keyCode === 65 || keyCode === 37) {
    keys.left = false;
  } else if (keyCode === 68 || keyCode === 39) {
    keys.right = false;
  }
}

export function gameLoop() {
  if (keys.down) {
    playerSprite.position.y += 12;
  } else if (keys.up) {
    playerSprite.position.y -= 12;
  } else if (keys.left) {
    playerSprite.position.x -= 12;
  } else if (keys.right) {
    playerSprite.position.x += 12;
  }
}

ticker.add(gameLoop);
ticker.add(deleteHelper(stage,deleteSprites));
setInterval(
  renderSprite,
  2000,
  "/Images/enemy.png",
  2400,
  height / 2,
  renderer,
  stage,
  ticker,
  true,
  enemyMovement,
  enemyOscilateMovement
);

ticker.start();
