let gif;
let tmuna;
let state = 0;
let gifPlayCount = 0;
let gifStartTime;
let canvasSize = 400;

function preload() {
  gif = loadImage("profile-gif_2.gif");
  tmuna = loadImage("AM.jpg");
}

function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  gifStartTime = millis();
  windowResized(); // Call this to set initial responsive size
}

function draw() {
  background(255);
  
  if (state === 0) {
    // Show animated GIF
    if (gifPlayCount < 3) {
      image(gif, -width/2, -height/2, width, height);
      
      // Check if the GIF has completed one loop
      if (millis() - gifStartTime > gif.duration * 1000) {
        gifPlayCount++;
        gifStartTime = millis();
      }
    } else {
      // Display the first frame of the GIF when it's done playing
      image(gif.get(0, 0, gif.width, gif.height), -width/2, -height/2, width, height);
    }
  } else if (state === 1) {
    // Rotating cube
    noStroke();
    texture(tmuna);
    rotateX(radians(frameCount));
    rotateY(radians(frameCount));
    box(width * 0.4);
  } else if (state === 2) {
    // Grid of rotating cubes
    texture(tmuna);
    translate(-width / 2, -height / 2);
    for (let x = width * 0.08; x < width; x += width * 0.2) {
      for (let y = height * 0.08; y < height; y += height * 0.2) {
        push();
        translate(x, y);
        rotateY(radians(frameCount));
        rotateX(radians(frameCount));
        noStroke();
        box(width * 0.1);
        pop();
      }
    }
  } else if (state === 3) {
    // Rotating grid of cubes
    texture(tmuna);
    rotateX(radians(frameCount));
    rotateY(radians(frameCount));
    rotateZ(radians(frameCount));
    translate(-width / 2, -height / 2);
    for (let x = width * 0.08; x < width; x += width * 0.2) {
      for (let y = height * 0.08; y < height; y += height * 0.2) {
        push();
        translate(x, y);
        rotateY(radians(frameCount));
        rotateX(radians(frameCount));
        noStroke();
        box(width * 0.1);
        pop();
      }
    }
  }
}

function mousePressed() {
  state = (state + 1) % 4;
  if (state === 0) {
    // Reset GIF play count when cycling back to the GIF state
    gifPlayCount = 0;
    gifStartTime = millis();
  }
}

function windowResized() {
  let size = min(windowWidth, windowHeight, canvasSize);
  resizeCanvas(size, size);
}
