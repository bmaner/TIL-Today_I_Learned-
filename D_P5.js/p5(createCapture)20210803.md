# P5.js Introduction

## P5.js Summary

- 웹브라우저 위에서 동작하는 모션그래픽 도구 <br>
- 자바스크립트의 부품으로 사용되는 도구 <br>
- p5.js로 할 수 있는 것<br>
  - 정적인 그림을 그리는 것 <br>
  - 애니메이션 <br>
  - 사용자와 상호작용 <br>

> 개인적으로는 canvas api를 조금 더 쉽게 사용할 수 있게 만든 라이브러리라고 느껴졌음.<br>
> 코드스테이츠에서의 final project를 위해 공부를 시작한다.

## P5.js를 React에서 적용하려면

- 우선 `npm i react-p5`로 설치해주고 이를 바탕으로 실행해야함.

## P5.js를 React에서 적용하기 어려운 점

- P5 공식 홈페이지는 자바스크립트에서 사용하는 것을 전제로 하기에 React에 대한 설명이 적다. <br>
- 하지만 밀어부치다보니 알게된점은 문법이 조금 다를 뿐. 모든 p5 method앞에 `p5.`을 붙이면 작동한다는 것. <br>

## 2021.8.3. 목표

- 노트북의 카메라를 이용하여 카메라 속의 내모습을 canvas상에 나타내고 이를 pixel 조작하여 점묘화처럼 만드는 것.
- 코드는 아래를 참고

```jsx
import './App.css';
import Sketch from 'react-p5';

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
```

## 2021.8.3. 결과 : 성공

> 의문점? `loadPixels()`가 없다고 뜨다가 갑자기 잘되기 시작했다. 이러면 무섭다.
