# **react-spring** accordion implementation basic

## 시도했던 것들

- [shakuro](https://shakuro.com/blog/react-spring-tutorial-making-animated-react-apps)
- 위 페이지의 예제가 잘되있어서 참고하고자 하였으나, styled component와 styled component안에서 제공하는 style을 사용하여서인지 내가 직접 만드는 곳에 적용해보니 사용이 불가하였다.
- useTransition을 통한 시도, useChain을 통한 시도, useSprings를 통한 시도 모두 `실패`
- 하지만 useSpring으로 animation을 적용시켜 div tag의 height가 커지게 하는 것(비록 accordion자체는 아니지만)에는 `성공`을 하였다.

## spring을 통해 height를 늘리는데 성공한 코드

```jsx
import React, { useState } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';

function Accordion() {
  const [isOn, setIsOn] = useState(false);
  const { x } = useSpring({
    from: { x: 0 },
    x: isOn ? 1 : 0,
    // config: { duration: 500 },
  });
  return (
    <animated.div
      style={{
        opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
        height: x.to({ range: [0, 1], output: [60, 100] }),
        background: 'rgba(0, 0, 0, 0.5)',
      }}
      onClick={() => setIsOn(!isOn)}
    >
      accordion
    </animated.div>
  );
}

export default Accordion;
```

## 내일 해봐야 할 것 & 마인드 셋

- container에 해당하는 div tag를 크게하는 것에는 성공을 하였으나 안쪽에 contents를 넣었을때 어떻게 보이는지 확인해야함.
- span태그에 + 혹은 x 이모지나 font를 넣어서 회전시키며 height가 커지도록 해보자.
- useChain으로 useSpring 및 useSprings의 순서를 정해서 animation을 연결시켜 작동해보자.
