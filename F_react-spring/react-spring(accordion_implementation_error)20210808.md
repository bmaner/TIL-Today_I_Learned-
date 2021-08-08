# **react-spring** Three.js의 mesh가 아닌 일반 html태그에의 적용

## 시도했던 것들

- 프로젝트에서 signup page에 가입하는 사용자가 부담스럽지 말라고(입력안해도 가입가능) 추가입력창을 숨겨놓았다.
- 즉 추가 입력을 위해 클릭할 시 해당하는 내용이 촤르르 나와야하는데 이것이 accordion이다.
- accordion component에 부드러운 효과를 적용하기 위해서 react-spring을 도입하고자 했다.
- useTransition을 통해서 여러 animation을 component의 lifecycle에 적용시키고자 하였으나 `실패`
- react-spring module 자체의 문제인가 싶어서 공식문서의 useSpring hooks 예시를 그대로 복붙 하였을때에 적용 `성공`

## 에러코드

> TypeError: Cannot destructure property 'reset' of '(intermediate value)(intermediate value)(intermediate value)' as it is null.

- 중간값이 3개로 나오는 걸로 보아 `from`, `enter`, `leave` 이 것들 각각을 나타내는 것 같고, reset 값이 null이라서 해체를 할 수가 없다고 한다.
- useTransition에 대한 이해가 더 필요할 것 같다.
- 에러를 발생하게 한 코드는 아래와 같다.

```jsx
import React, { useState } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';

function Accordion() {
  const [isOn, setIsOn] = useState(false);
  const transitions = useTransition(isOn, null, {
    from: { height: '0rem', opacity: 0 },
    enter: { height: '5rem', opacity: 1, overflowY: 'scroll' },
    leave: { height: '0rem', opacity: 0 },
  });
  return (
    <dl>
      <dt>
        <div>
          추가 정보 입력하기 <span onClick={() => setIsOn(true)}>+</span>
        </div>
      </dt>
      <dd>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                Lorem ipsum. <br />
                blah blah blan. <br />
                blah blah blan. <br />
                blah blah blan. <br />
                blah blah blan. <br />
                blah blah blan. <br />
                blah blah blan. <br />
                blah blah blan. <br />
              </animated.div>
            )
        )}
      </dd>
    </dl>
  );
  //     const styles = useSpring({
  //     loop: true,
  //     to: [
  //       { opacity: 1, color: '#ffaaee' },
  //       { opacity: 0, color: 'rgb(14,26,19)' },
  //     ],
  //     from: { opacity: 0, color: 'red' },
  //   });
  //   return <animated.div style={styles}>I will fade in and out</animated.div>;
}

export default Accordion;
```

## 내일 해봐야 할 것 & 마인드 셋

- useSpring으로는 div태그에 적용하는 것이 가능하였으므로, useSpring을 통하여 한번 accordion을 구현해보고,
- useTransition으로도 같은 효과를 적용해보자.
- scss를 통하여 오늘 만들었던 서비스 소개글, 서비스 제목 버튼을 다시 재구성해야 하는데(현재 css로 적용해 놓았음) 아직 scss에 대한 공부를 하지 못했으므로 기존 fastcampus에 구매해놓은 인강을 들어보면서 적용해보자.
- 주말인데도 뭔가 마음이 조급하여 공식문서를 읽고 적용하는데 어려움을 겪었다. 침착하게 여유를 가지고 공식문서를 읽고 다시 재적용 해보자.

## 내일 작업 시 참고해야할 링크

- [useTransition](https://react-spring.io/hooks/use-transition)
- [useSpring](https://react-spring.io/hooks/use-spring)
