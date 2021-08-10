# **react-spring** accordion_implement

## 시도했던 것들

- [react로 accordion 구현하기](https://code-masterjung.tistory.com/81)
- 위 링크를 따라 spring 없이 accordion을 구현하기에 도전 그리고 `성공`
- `useSpring`을 animation에 적용하는 것에도 `성공`
- 하지만 정작 적용되어야할 project의 signup page에서는 똑같은 코드를 사용하였음에도 accordion의 효과(펼쳐지는 것)를 볼 수 없었음.
- useState 훅을 써서 state의 상태에 따라 height를 조정하는 것에서는 성공.
- landing page에서는 accordion이 작동하였음.
- 원인불명.....(순수 CSS로 구현)

> `useSpring`을 이용한 `accordion`

```jsx
import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';

function Accordion() {
  const [isOn, setIsOn] = useState(false);
  const { x } = useSpring({
    from: { x: 0 },
    x: isOn ? 1 : 0,
  });
  return (
    <div
      className="accordioncontainer"
      style={{
        width: '360px',
        display: ' flex',
        position: 'relative',
        flexDirection: 'column',
        background: 'yellow',
      }}
    >
      <div
        className="header"
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '32px',
          margin: '0 32px 0 8px',
          background: 'red',
        }}
      >
        추가 정보 입력하기
        <div
          className="btn"
          style={{
            top: '8px',
            right: '8px',
            fontSize: '14px',
            position: 'absolute',
          }}
          onClick={() => setIsOn(!isOn)}
        >
          열기
        </div>
      </div>
      <animated.div
        className="contentswrapper"
        style={{
          height: x.to({ range: [0, 1], output: [0, 260] }),
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {new Array(4).fill(0).map(el => {
          return (
            <animated.div
              className="content"
              style={{
                opacity: x.to({ range: [0, 1], output: [0, 1] }),
                width: '360px',
                height: '40px',
                marginBottom: '24px',
                background: 'blue',
              }}
            >
              {el}
            </animated.div>
          );
        })}
      </animated.div>
    </div>
  );
}

export default Accordion;
```

> `CSS`을 이용한 `accordion`

```jsx
//transition에 관한 부분은 css파일에 별도로 작성함.
import React, { useState } from 'react';

function Accordion() {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="accordioncontainer">
      <div className="header">
        추가 정보 입력하기
        <div className="btn" onClick={() => setIsOn(!isOn)}>
          열기
        </div>
      </div>
      <div
        className="contentswrapper"
        style={{
          height: isOn ? '260px' : '0',
        }}
      >
        <div
          className="radiowrapper"
          style={{
            display: 'flex',
            opacity: isOn ? 1 : 0,
            transition: 'opacity 0.7s',
          }}
        ></div>
      </div>
    </div>
  );
}

export default Accordion;
```

## 고민해봐야 할 것 & 마인드 셋

- react-spring은 화려한 animation을 쉽게 만들 수 있는 좋은 도구이지만, 진입장벽이 높은 것임에 틀림없다.
- 결국 이번 `accordion`구현에는 순수 `CSS`로 구현을 하게되었지만, 이번 프로젝트에서 그리고 앞으로의 프로젝트에서 지속적으로 시도해보고 공부를 할것이다.
- 하지만 순수 `CSS` 또한 함께 공부해야함을 잊지 말아야겠다.
- 이번 처럼 뭔가 계속 막히게 될 때 나는 계속 그 구현 기능의 코드만 바라보는 경향이 있다. 하지만 다른 것이 문제일 수도 있으니 배경 또한 바라보는 숲을 보는 사람이 되도록 하자.
