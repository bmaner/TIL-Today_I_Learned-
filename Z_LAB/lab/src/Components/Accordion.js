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
