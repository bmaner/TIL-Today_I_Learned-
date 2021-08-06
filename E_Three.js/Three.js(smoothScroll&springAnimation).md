# **Three.js** smoothScroll 및 spring animation 적용과 미해결 과제

## 시도했던 것들

- mesh의 Material에 TextureLoader를 통하여 프로젝트 주제와 알맞은 이미지를 제작하여 삽입하였음.
- Material에 side 속성을 `THREE.DoubleSide`로 하면 mesh 양면 모두 사진이 삽입됨을 확인할 수 있음.
- mesh를 useRef로 잡아내어 position에 접근, useFrame안에서 조작하여 움직이게하는 것은 성공하였으나 spring animation 적용 시 error 발생
- 위 error를 해결하기 위해 camera의 위치를 변형하는 것을 시도하였고 대부분의 spring animation을 적용하는데에 성공하였으나 transform translate의 적용에 관한 부분이 공식 홈페이지 docs에서는 확인이 불가능 하였다.(있어도 적용이 되지 않음을 확인...많은 시간을 구글링과 실험에 투자하였으나 최종 실패)
- spring에 너무 메였던 탓인지 mesh자체에 접근하여 position을 조작하는 것을 뒤늦게 시도하였고 성공

## 만났던 에러는?

> mesh를 클릭하면 spring animation이 적용되었으나 mesh의 위치가 화면이 render될 때의 초기 위치로 이동되었음 <br>
> spring animation에서 transform translate의 적용 불가 <br>
> 아래 코드로 해결

```jsx
import './App.css';
import * as THREE from 'three';
import React, { Suspense, useEffect, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import data from './data';

function Image({ url, index, camera }) {
  const [active, setActive] = useState(0);
  const mesh = useRef();
  let speed = 0;
  let positionX = 0;
  let plus = 0;

  useEffect(() => {
    //처음에 촤르르 효과 해결이 안된다.
    speed = -0.3;
    // positionX += speed;
    // speed *= 0.95;
    // mesh.current.position.x = index * 1.2 + positionX * 1.2;
  }, []);

  window.addEventListener('wheel', e => {
    speed += e.deltaY * 0.0005;
  });

  const { spring } = useSpring({
    spring: Number(active),
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const scale = spring.to([0, 1], [1, 1.2]);
  const rotation = spring.to([0, 1], [0, Math.PI]);
  const position = useMemo(() => {
    return [index * 1.2, -0.5, 4];
  }, []);

  const texture = useLoader(THREE.TextureLoader, url);
  useFrame(() => {
    positionX += speed - plus;
    speed *= 0.95;
    plus *= 0.95;
    active ? (mesh.current.position.y = 0) : (mesh.current.position.y = -0.5);
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
    <div
      className="App"
      style={{ background: '#191A20', width: '100vw', height: '100vh' }}
    >
      <Canvas>
        <Images />
      </Canvas>
    </div>
  );
}

export default App;
```

## 내일 해봐야 할 것 & 마인드 셋

- 현재 화면이 render되면 camera위치가 0이기 때문에 그리고 사용자들에게 해당 화면에서 스크롤이 된다는 것을 보여주기 위하여 render되는 즉시 카메라가 자연스럽게 이동하는 것을 보여주어야함.
- `mesh.current.position`으로 이동을 시도했을 때에는 useEffect로 speed를 -0.3으로 할당하니 되었던 부분이 camera를 이동시키는 것으로 바꾸고 난뒤에는 적용이 되지 않았음. **HINT**
- 라이브러리에서 답을 찾지말자. 생각이 협소해지지 말자. 많은 시도를 해보자. 간단한 코드로 해결할 수도 있다.

# 오늘 작업 진행에 도움을 준 참고 링크

> https://www.youtube.com/watch?v=j4jieMzPdUc glitch <br> https://www.youtube.com/watch?v=ivg603bYDk8 scroll image<br> https://www.youtube.com/watch?v=U29j5NiSMVQ smooth scroll & Raycasting with Three <br> https://codesandbox.io/s/blissful-pascal-ny7ey?from-embed=&file=/src/index.js<br> https://codesandbox.io/s/r3f-train-l900i<br> https://joooooo308.medium.com/react-three-fiber-use-gesture-to-move-the-camera-f50288cec862<br> https://gracious-keller-98ef35.netlify.app/docs/api/events onWheel 관련 정보<br> https://www.youtube.com/watch?v=ivg603bYDk8 scroll image 47:30 참고<br> https://tympanus.net/codrops/2019/12/16/scroll-refraction-and-shader-effects-in-three-js-and-react/<br>
