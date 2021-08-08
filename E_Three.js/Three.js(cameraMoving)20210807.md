# **Three.js** componentDidMount 시 camere moving

## 시도했던 것들

- useEffect안에서 dependency가 []일 때 speed를 조작하는 것 `실패`
- useEffect안에서 dependency가 []일 때 positionX를 조작하는 것 `실패`
- useFrame안에서 speed에 일정한 값을 주었을 때 `실패` => 계속하여 카메라가 이동하였고, smooth한 효과조차 기대할 수 없었다.
- speed의 선언 시 0이 아닌 작은 수를 대입하기 `성공` => 카메라의 position을 결정하는 positionX는 speed를 기반으로 만들어지고, speed는 useFrame안에서 0.9가 곱해지면서 작아지게 되므로 이렇게 시도해보고자 했다.

> 기대했던 효과를 만든 코드

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
    <div
      className="App"
      style={{ background: '#191A20', width: '100vw', height: '700px' }}
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

- canvas 가운데 소개글 및 로고를 배치하고 시작하기 버튼에 spring or framer motion으로 효과를 줘보자.
- 로그인 page구현 및 회원가입 page에서 option 항목들을 표현 할 적절한 animation을 찾아보고 구현해보자.

## 내일 구현 시 참고할 수 있는 사이트

- [spring](https://react-spring.io/hooks/use-spring) `landing button`에 적용하면 좋을 듯
- [framer-motion](https://www.framer.com/docs/animate-shared-layout/) `sign-up page option`항목에 적용하면 좋을 듯
