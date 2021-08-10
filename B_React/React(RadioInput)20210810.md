# **React**로 Radio Input 구현 및 checked value 구하는 함수 작성

## 시도했던 것들

- [get checked value](https://dd00oo.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%9D%BC%EB%94%94%EC%98%A4%EB%B2%84%ED%8A%BC%EC%9D%98-%EC%B2%B4%ED%81%AC-%EC%97%AC%EB%B6%80-%ED%99%95%EC%9D%B8)
- [mdn](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
- `RadioInputGender` Component 구현
  > `RadioInputGender.js`

```jsx
import React from 'react';

function RadioInputGender({
  value,
  name,
  width,
  isChecked,
  radioInputHandler,
}) {
  return (
    <div style={{ width: width }}>
      {isChecked ? (
        <input
          type="radio"
          className="radioinput"
          name={name}
          value={value}
          defaultChecked
          onChange={() => radioInputHandler()}
        />
      ) : (
        <input
          type="radio"
          className="radioinput"
          name={name}
          value={value}
          onChange={() => radioInputHandler()}
        />
      )}
      <label htmlFor={value}>{value}</label>
    </div>
  );
}

export default RadioInputGender;
```

- 여러개의 radio 중 `checked`된 radio의 `value`를 구하는 함수 작성
  > `radioInputHandler`

```jsx
function radioInputHandler() {
  let checkGender = document.querySelectorAll('.radioinput');
  for (let el of checkGender) {
    if (el.checked === true) {
      setGender(el.value);
    }
  }
}
//onChange로 radio 각각의 checked 가 바뀔때(boolean) 위 함수가 실행되게하였다.
```

---

## 알게된 점

- 기초적인 것이지만 mdn을 보고 깨닳은 것이 있다.
- input tag의 `type="radio"`가 여러개일 경우 하나만 선택되게 하려면, `name`속성을 똑같이 묶어주여야 한다.
- mdn에서는 label에 `for`속성을 사용하였으나, react에서는 `htmlFor`를 사용하라고 한다.
- 초기 어떠한 value가 checked가 되게하면서 변경이 가능하게 하려면 `defaultChecked` 속성을 사용하여야 한다.
