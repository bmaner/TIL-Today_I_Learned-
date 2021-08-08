import React, { useState } from 'react';
import { useTransition, animated, useSpring } from 'react-spring';

function Accordion() {
  //   const [isOn, setIsOn] = useState(false);
  //   const transitions = useTransition(isOn, null, {
  //     from: { height: '0rem', opacity: 0 },
  //     enter: { height: '5rem', opacity: 1, overflowY: 'scroll' },
  //     leave: { height: '0rem', opacity: 0 },
  //   });
  //   return (
  //     <dl>
  //       <dt>
  //         <div>
  //           추가 정보 입력하기 <span onClick={() => setIsOn(true)}>+</span>
  //         </div>
  //       </dt>
  //       <dd>
  //         {transitions.map(
  //           ({ item, key, props }) =>
  //             item && (
  //               <animated.div key={key} style={props}>
  //                 Lorem ipsum. <br />
  //                 blah blah blan. <br />
  //                 blah blah blan. <br />
  //                 blah blah blan. <br />
  //                 blah blah blan. <br />
  //                 blah blah blan. <br />
  //                 blah blah blan. <br />
  //                 blah blah blan. <br />
  //               </animated.div>
  //             )
  //         )}
  //       </dd>
  //     </dl>
  //   );
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: '#ffaaee' },
      { opacity: 0, color: 'rgb(14,26,19)' },
    ],
    from: { opacity: 0, color: 'red' },
  });
  return <animated.div style={styles}>I will fade in and out</animated.div>;
}

export default Accordion;
