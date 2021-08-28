# 모바일에서 사용자와 상호작용하기 위한 touch event

## 상황

- Project의 Landing Page 카드 Interaction은
  scroll, click에만 반응을 하게 하였기에
  모바일 환경에서는 클릭만 되던 상황
- 모바일에서 touch를 하면 카드가 sliding되도록 하기 위해 바닐라 JS로 구현한 자료를 참고하여 React에 적용 시도

## 어려웠던 점

- 이벤트 핸들러 함수의 위치와
  함수 실행에 따라 추가, 감소되는 값을 카드 컴포넌트 안에서 직접 더하고  
  뺄 것인가 혹은 props로 전달할 것인가 등 여러 경우의 수를 시도
- state를 set함수로 업데이트하면
  화면 전체가 다시 render되며 sliding 효과가 끊기는 듯한 느낌을 주었음

## 해결

- scroll 값을 반영하는 변수 자체에 touch 이벤트가 일어날 때 마다 일정 값을 더해주고 빼도록 설계하여 적용

> 해당 코드

```js
function touchFunc(e) {
  let type = null;
  let touch = null;

  switch (e.type) {
    case 'touchstart':
      type = 'mousedown';
      touch = e.changedTouches[0];
      start_X = touch.clientX;
      end_X = 0;
      break;
    case 'touchend':
      type = 'mouseup';
      touch = e.changedTouches[0];
      end_X = touch.clientX;

      var chkNum = start_X - end_X;
      var chkNumAbs = Math.abs(chkNum);

      if (chkNumAbs > 100) {
        if (chkNum < 0) {
          speed = speed + -0.2;
          //speed는 사용자의 스크롤값을 반영하는 변수
        } else {
          speed = speed + 0.2;
        }
      }
      break;
  }
}

window.addEventListener('touchstart', touchFunc, false);

window.addEventListener('touchend', touchFunc, false);
```

## touch event를 조사하면서 시도해보고 싶어진 것

- [touch event with canvas 예시 참고](https://developer.mozilla.org/ko/docs/Web/API/Touch_events)
