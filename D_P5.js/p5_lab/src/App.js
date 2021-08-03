import './App.css';
import Sketch from 'react-p5';
// import 'p5/lib/addons/p5.dom';

function App() {
  let video;
  const setup = (p5, parent) => {
    p5.createCanvas(1000, 1000).parent(parent);
    video = p5.createCapture(p5.VIDEO).parent(parent);
    video.size(1000, 1000);
    p5.noStroke();
    p5.fill(0);
    video.hide();
  };
  const draw = p5 => {
    p5.background(255);
    video.loadPixels();
    const gridSize = 10;
    for (let y = 0; y < 1000; y += gridSize) {
      for (let x = 0; x < 1000; x += gridSize) {
        const i = y * 1000 + x;
        const darkness = (255 - video.pixels[i * 4]) / 255;
        const radius = gridSize * darkness;
        p5.ellipse(x, y, radius, radius);
      }
    }
    // p5.image(video, 0, 0);
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default App;
