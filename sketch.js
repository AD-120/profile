let img;
const imgSize = 300;
const numEffects = 5;

function preload() {
  img = loadImage('AM.jpg');
}

function setup() {
  createCanvas(imgSize, imgSize);
  imageMode(CENTER);
}

function draw() {
  background(220);
  
  // Display the image
  image(img, width/2, height/2, imgSize, imgSize);
  
  // Check if mouse is over the image
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Apply different effects based on mouse position
    let effect = floor(map(mouseX, 0, width, 0, numEffects));
    
    switch(effect) {
      case 0:
        filter(INVERT);
        break;
      case 1:
        filter(POSTERIZE, 4);
        break;
      case 2:
        filter(BLUR, 3);
        break;
      case 3:
        filter(ERODE);
        break;
      case 4:
        filter(THRESHOLD);
        break;
    }
  }
}