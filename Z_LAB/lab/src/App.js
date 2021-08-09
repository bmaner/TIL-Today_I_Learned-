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

// 한 장면만 불러오므로 pass
// import './App.css';
// import Sketch from 'react-p5';

// function App() {
//   let img;
//   let smallPoint, largePoint;

//   const setup = (p5, parent) => {
//     p5.createCanvas(480, 480).parent(parent);
//     img = p5.loadImage(
//       'https://media3.giphy.com/media/h4lMaDPaaNzqAcnaPm/giphy.gif?cid=ecf05e47lg7cndes3xfbrycf8halzhfsyqt6zdamwpu2qtdo&rid=giphy.gif&ct=g'
//     );
//     smallPoint = 10;
//     largePoint = 13;
//     p5.imageMode(p5.CENTER);
//     p5.noStroke();
//     p5.background(255);
//     img.loadPixels();
//     // console.log(p5.width, p5.height);
//   };
//   const draw = p5 => {
//     // p5.image(img, 0, 0);
//     let pointillize = p5.map(p5.mouseX, 0, p5.width, smallPoint, largePoint);
//     let x = p5.floor(p5.random(p5.width));
//     let y = p5.floor(p5.random(p5.height));
//     let pix = img.get(x, y);
//     p5.fill(pix, 128);
//     p5.ellipse(x, y, pointillize, pointillize);
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
//   let img;
//   let x = 0;

//   const setup = (p5, parent) => {
//     p5.createCanvas(1000, 1000).parent(parent);
//     img = p5.loadImage(
//       'https://media3.giphy.com/media/h4lMaDPaaNzqAcnaPm/giphy.gif?cid=ecf05e47lg7cndes3xfbrycf8halzhfsyqt6zdamwpu2qtdo&rid=giphy.gif&ct=g'
//     );
//   };
//   const draw = p5 => {
//     p5.image(img, 480, 0, 700, 700);
//     for (let x = 0; x < p5.width; x += 10) {
//       for (let y = 0; y < p5.height; y += 10) {
//         let c = img.get(x, y);
//         // c는 이미지 픽셀의 색상정보를 포함하는 배열이다.
//         // 픽셀의 rgb 각각의 값을 더하여 평균을 구하면 흑백이 된다.
//         let colAverage = c[0] + c[1] + c[2] / 3;
//         // p5.stroke(p5.color(c));
//         p5.stroke(p5.color([colAverage, colAverage, colAverage, 255]));
//         p5.strokeWeight(p5.random(20));
//         // p5.strokeWeight(15);
//         p5.point(x, y);
//         ///위에 세줄 주석 하고 아래 주석 풀면 사각형 효과
//         // p5.fill(p5.color(c));
//         // p5.rect(x, y, 10, 5);
//         // p5.noStroke();
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

import './App.css';
import * as THREE from 'three';
import React, { Suspense, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import data from './data';
import BlinkText from './Components/BlinkText';
import Accordion from './Components/Accordion';

function Image({ url, index, camera }) {
  const [active, setActive] = useState(0);
  const mesh = useRef();
  let speed = 0.2;
  let positionX = 0;
  let plus = 0;

  window.addEventListener('wheel', e => {
    speed += e.deltaY * 0.0005;
  });

  const { spring } = useSpring({
    spring: Number(active),
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const scale = spring.to([0, 1], [1, 1.2]);
  const rotation = spring.to([0, 1], [0, Math.PI * 2]);
  const position = useMemo(() => {
    return [index * 1.2, -0.5, 3.5];
  }, []);

  const texture = useLoader(THREE.TextureLoader, url);
  useFrame(() => {
    positionX += speed - plus;
    speed *= 0.95;
    plus *= 0.95;
    active ? (mesh.current.position.y = -0.5) : (mesh.current.position.y = -1);
    camera.position.x = positionX * 1.2;

    if (camera.position.x > 9.7) {
      plus = camera.position.x - 9.7;
    } else if (camera.position.x < 0) {
      plus = camera.position.x;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      rotation-y={rotation}
      scale-x={scale}
      scale-y={scale}
      onClick={() => setActive(!active)}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1.2]} />
      <meshBasicMaterial
        attach="material"
        map={texture}
        side={THREE.DoubleSide}
      />
    </animated.mesh>
  );
}

function Images() {
  const { camera } = useThree();
  return data.map((el, index) => (
    <Suspense fallback={null}>
      <Image key={el} url={el} index={index} camera={camera} />
    </Suspense>
  ));
}

function App() {
  return (
    <div>
      <div
        className="App"
        style={{
          background: '#191A20',
          width: '100vw',
          height: '700px',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            zIndex: '1000',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '166px',
            position: 'absolute',
            left: '0',
            top: '103px',
            color: '#fff',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100vw',
              height: '26px',
              fontWeight: 'bold',
              fontSize: '24px',
              // lineHeight: '35px',
            }}
          >
            개발하는 당신을 위한 얕고 넓은 지식,
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100vw',
              height: '75px',
              marginTop: '12px',
              fontWeight: 'bold',
              fontSize: '80px',
              // lineHeight: '35px',
            }}
          >
            DEVzine:port
          </div>
        </div>
        <BlinkText />
        <Canvas>
          <Images />
        </Canvas>
      </div>
      <div>안녕하세요</div>
      <Accordion />
    </div>
  );
}

export default App;
