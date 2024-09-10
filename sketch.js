let img;
const numEffects = 5;
let imgAspectRatio;

function preload() {
  img = loadImage('AM.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  imgAspectRatio = img.width / img.height;
}

function draw() {
  background(220);
  
  // Calculate responsive image size
  let imgWidth, imgHeight;
  if (width / height > imgAspectRatio) {
    imgHeight = height;
    imgWidth = imgHeight * imgAspectRatio;
  } else {
    imgWidth = width;
    imgHeight = imgWidth / imgAspectRatio;
  }
  
  // Display the image
  image(img, width/2, height/2, imgWidth, imgHeight);
  
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
