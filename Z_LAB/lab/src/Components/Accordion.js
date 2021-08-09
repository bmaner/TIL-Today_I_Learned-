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
