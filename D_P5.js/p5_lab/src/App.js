// import './App.css';
// import Sketch from 'react-p5';

// function App() {
//   let video;
//   let vScale = 16;
//   let particles = [];
//   let slider;

//   function Particle(p5, x, y) {
//     this.x = x;
//     this.y = y;
//     this.r = p5.random(16, 32);

//     this.update = function () {
//       this.x += p5.random(-10, 10);
//       this.y += p5.random(-10, 10);

//       this.x = p5.constrain(this.x, 0, p5.width);
//       this.y = p5.constrain(this.y, 0, p5.height);
//     };

//     this.show = function () {
//       p5.noStroke();
//       var px = p5.floor(this.x / vScale);
//       var py = p5.floor(this.y / vScale);
//       var col = video.get(px, py);
//       p5.fill(col[0], col[1], col[2], slider.value());
//       p5.ellipse(this.x, this.y, this.r, this.r);
//     };
//   }

//   const setup = (p5, parent) => {
//     p5.createCanvas(640, 480).parent(parent);
//     p5.pixelDensity(1);
//     video = p5.createCapture(p5.VIDEO).parent(parent);
//     video.size(p5.width / vScale, p5.height / vScale);
//     for (let i = 0; i < 200; i++) {
//       particles[i] = new Particle(
//         p5,
//         p5.random(p5.width),
//         p5.random(p5.height)
//       );
//     }
//     slider = p5.createSlider(0, 255, 127);
//     p5.background(51);
//   };
//   const draw = p5 => {
//     // p5.background(51);
//     video.loadPixels();
//     for (let i = 0; i < particles.length; i++) {
//       particles[i].update();
//       particles[i].show();
//     }
//   };
//   return (
//     <div className="App">
//       <Sketch setup={setup} draw={draw} />
//     </div>
//   );
// }

// export default App;

// import './App.css';
// import Sketch from 'react-p5';

// function App() {
//   let video;
//   const setup = (p5, parent) => {
//     p5.createCanvas(1000, 1000).parent(parent);
//     video = p5.createCapture(p5.VIDEO).parent(parent);
//     video.size(1000, 1000);
//     p5.noStroke();
//     p5.fill(0);
//     video.hide();
//   };
//   const draw = p5 => {
//     p5.background(255);
//     video.loadPixels();
//     const gridSize = 10;
//     for (let y = 0; y < 1000; y += gridSize) {
//       for (let x = 0; x < 1000; x += gridSize) {
//         const i = y * 1000 + x;
//         const darkness = (255 - video.pixels[i * 4]) / 255;
//         const radius = gridSize * darkness;
//         p5.ellipse(x, y, radius, radius);
//       }
//     }
//   };
//   return (
//     <div className="App">
//       <Sketch setup={setup} draw={draw} />
//     </div>
//   );
// }

// export default App;

// https://www.youtube.com/watch?v=rNqaw8LT2ZU&list=PLRqwX-V7Uu6aKKsDHZdDvN6oCJ2hRY_Ig&index=4 사각형으로 pixel 조작

import './App.css';
import Sketch from 'react-p5';

function App() {
  let video;
  let videoUrl =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4';
  const setup = (p5, parent) => {
    p5.createCanvas(480, 270).parent(parent);
    video = p5.createVideo(videoUrl).parent(parent);
    video.loop();
    video.hide();
    p5.noStroke();
    p5.fill(0);
  };
  const draw = p5 => {
    p5.background(255);
    video.loadPixels();
    const gridSize = 10;
    for (let y = 0; y < 240; y += gridSize) {
      for (let x = 0; x < 320; x += gridSize) {
        const i = y * 320 + x;
        const darkness = (255 - video.pixels[i * 4]) / 255;
        const radius = gridSize * darkness;
        p5.ellipse(x, y, radius, radius);
      }
    }
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
      <video autoPlay={true}>
        <source src="./cut.mp4" type="video/mp4"></source>
      </video>
    </div>
  );
}

export default App;
