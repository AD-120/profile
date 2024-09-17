let gif;
let tmuna;
let state = 0;
let gifPlayCount = 0;
let gifStartTime;
let canvasSize = 400;
let gifFrames = [];
let currentFrame = 0;
let gifDuration = 600; // Assume 2 seconds duration, adjust if known

function preload() {
  gif = loadImage("profile-gif_2.gif", imageLoaded);
  tmuna = loadImage("AM.jpg");
}

function imageLoaded() {
  // Extract all frames from the GIF
  let totalFrames = gif.numFrames();
  for (let i = 0; i < totalFrames; i++) {
    gif.setFrame(i);
    gifFrames.push(gif.get());
  }
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
    if (gifPlayCount < 3 && gifFrames.length > 0) {
      let elapsedTime = (millis() - gifStartTime) % gifDuration;
      currentFrame = floor(map(elapsedTime, 0, gifDuration, 0, gifFrames.length - 1));
      image(gifFrames[currentFrame], -width/2, -height/2, width, height);
      
      // Check if the GIF has completed one loop
      if (millis() - gifStartTime > gifDuration) {
        gifPlayCount++;
        gifStartTime = millis();
      }
    } else if (gifFrames.length > 0) {
      // Display the last frame of the GIF when it's done playing
      image(gifFrames[gifFrames.length - 1], -width/2, -height/2, width, height);
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
    gifPlayCount = 3;
    gifStartTime = millis();
  }
}

function windowResized() {
  let size = min(windowWidth, windowHeight, canvasSize);
  resizeCanvas(size, size);
}
