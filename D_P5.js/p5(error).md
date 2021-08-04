# P5.js 동영상 불러오기 실패

## 시도했던 것들

- public 디렉토리에 집어넣고 경로로 불러오기 `실패`
- import해서 createVideo()안에 변수처럼 집어넣기 `실패`
- free mp4 url을 받아와서 createVideo()안에 넣기 `실패` but 가끔씩 실행이 되었음.
- video태그를 useRef로 잡아와서 setup 함수 안에서 인식하게 하기 `실패`
- free mp4 url이 가끔 실행되었던 코드는 아래와 같다.
  > 힌트 url https://youtu.be/QCgGtSHMGIQ 03:30 참고

```jsx
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
```

- 실행되었던 경위 : video태그를 내 임의로 넣었는데 갑자기 관계없던 createVideo()했던 부분이 점묘화로 나타났음(소리가 들렸음).

## 만났던 에러는?

> Uncaught (in promise) TypeError: Cannot read property 'src' of undefined at index.js:1 <br>
> src가 undefined라고해서 F12로 element를 확인해보면 분명히 src는 내가 입력한 문자열로 되어있다. <br>

## 내일 해봐야 할 것

- p5.js 공식 홈페이지에서 동영상을 집어넣는 것을 시도해보자.
- gif로 집어넣는 것을 생각해보자.
- 사진을 차례차례로 넣어서 점묘화형식으로 표시하는 것을 고려해보자.
- 사진에 대한 재밌는 효과가 무엇이 있을지 생각해보자.
- 오늘 했던 수채화 효과를 사진에 적용해보자.
- 수채화 효과의 코드는 아래 참고

```jsx
import './App.css';
import Sketch from 'react-p5';

function App() {
  let video;
  let vScale = 16;
  let particles = [];
  let slider;

  function Particle(p5, x, y) {
    this.x = x;
    this.y = y;
    this.r = p5.random(16, 32);

    this.update = function () {
      this.x += p5.random(-10, 10);
      this.y += p5.random(-10, 10);

      this.x = p5.constrain(this.x, 0, p5.width);
      this.y = p5.constrain(this.y, 0, p5.height);
    };

    this.show = function () {
      p5.noStroke();
      var px = p5.floor(this.x / vScale);
      var py = p5.floor(this.y / vScale);
      var col = video.get(px, py);
      p5.fill(col[0], col[1], col[2], slider.value());
      p5.ellipse(this.x, this.y, this.r, this.r);
    };
  }

  const setup = (p5, parent) => {
    p5.createCanvas(640, 480).parent(parent);
    p5.pixelDensity(1);
    video = p5.createCapture(p5.VIDEO).parent(parent);
    video.size(p5.width / vScale, p5.height / vScale);
    for (let i = 0; i < 200; i++) {
      particles[i] = new Particle(
        p5,
        p5.random(p5.width),
        p5.random(p5.height)
      );
    }
    slider = p5.createSlider(0, 255, 127);
    p5.background(51);
  };
  const draw = p5 => {
    // p5.background(51);
    video.loadPixels();
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();
    }
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default App;
```
