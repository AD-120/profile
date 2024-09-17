let gif;
let tmuna;
let state = 0;
let gifPlayCount = 0;
let gifStartTime;

function preload() {
  gif = loadImage("profile-gif_2.gif");
  tmuna = loadImage("AM.jpg");
}

function setup() {
  createCanvas(500, 500, WEBGL);
  gifStartTime = millis();
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
    box(200);
  } else if (state === 2) {
    // Grid of rotating cubes
    texture(tmuna);
    translate(-width / 2, -height / 2);
    for (let x = 40; x < 500; x += 100) {
      for (let y = 40; y < 500; y += 100) {
        push();
        translate(x, y);
        rotateY(radians(frameCount));
        rotateX(radians(frameCount));
        noStroke();
        box(50, 50, 50);
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
    for (let x = 40; x < 500; x += 100) {
      for (let y = 40; y < 500; y += 100) {
        push();
        translate(x, y);
        rotateY(radians(frameCount));
        rotateX(radians(frameCount));
        noStroke();
        box(50, 50, 50);
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
