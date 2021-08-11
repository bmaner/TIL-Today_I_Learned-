# **React** SignUp Page 관련 component 및 function 추가 + (react-select)

## 시도했던 것들

- 유효성 검증 관련 메세지를 처음에 안뜨게 하도록 처리 `성공`
  > 관련 코드는 아래 참고

```jsx
useEffect(() => {
  if (checkEmail(Email)) {
    setEmail_isValid(true);
  } else {
    setEmail_isValid(false);
  }

  if (checkPassword(Password)) {
    setPw_isValid(true);
  } else {
    setPw_isValid(false);
  }
  if (Password === ConfirmPassword) {
    setPw_confirm(true);
  } else {
    setPw_confirm(false);
  }
}, [Email, Password, ConfirmPassword]);
//원래 아래코드가 위의 useEffect보다 위에 위치해 있었다.
useEffect(() => {
  Auth(false);
  setEmail_isValid(true);
  setPw_isValid(true);
}, []);
//useEffect에 dependency가 []가 아니더라도 render 시 실행이 되기 때문에 useEffect가 두 개 이상일 경우 유의하여 위치시키도록 하여야 한다.
```

- email 인증을 위해 signup page에 email 인증 버튼을 만들고 이 버튼을 누를경우에 post요청(body parameter에는 입력한 email이 가도록 한다.)하도록 구현 `성공` (+ with custom-axios module)

- react-select library의 적용 및 선택한 항목의 value 얻어내는 함수 작성 `완료`
  > 관련 코드는 아래 참고.

```jsx
function selectInputHandler() {
  let singleValues = document.querySelectorAll(
    '.basicsingle input:nth-child(3)'
  );
  let singleArr = [];

  for (let el of singleValues) {
    singleArr.push(el.value);
  }

  setAge(singleArr[0]);
  setPosition(singleArr[1]);
}
//하나의 선택지만 선택할 경우의 함수

let multiArr = [];

let multiValues = document.querySelectorAll('.basicmulti div:nth-child(3)');
if (multiValues.length - 1 !== 0 && multiValues[multiValues.length - 1]) {
  for (let el of multiValues[multiValues.length - 1].childNodes) {
    multiArr.push(el.attributes[2].value);
  }
  setLanguage(multiArr);
} else {
  setLanguage([]);
}
//복수 선택지를 선택할 경우의 함수
//isMulti라는 속성을 Select Component에 추가하면 복수 선택이 가능하다.
```

## 오늘 만났던 에러와 그 원인

- first project에서 input tag를 통해 사용자에게 입력받은 정보를 formdata로 구성하여 보냈기에 이번에도 formdata로 진행을 하였으나, 서버에서는 body로 받았기에 오류가 발생하였다.
  > 아래 코드 참고

```jsx
function postHandler() {
  let body = {
    user_email: Email,
    user_password: Password,
    user_name: Name,
    user_info: {
      user_gender: Gender,
      user_age: Age,
      user_position: Position,
      user_language: Language,
    },
  };

  console.log('SignUpWrapper :', body);

  dispatch(signupUser(body)).then(res => {
    console.log(res.payload);
    if (res.payload === 'User created') {
      window.location.href = '/signin';
    } else {
      alert('회원가입 실패하였습니다.');
    }
  });
}
```

---

```jsx
let multiArr = [];

let multiValues = document.querySelectorAll('.basicmulti div:nth-child(3)');
if (multiValues.length - 1 !== 0 && multiValues[multiValues.length - 1]) {
  for (let el of multiValues[multiValues.length - 1].childNodes) {
    multiArr.push(el.attributes[2].value);
  }
  setLanguage(multiArr);
} else {
  setLanguage([]);
}
```

- Select component 자체를 본인이 만들지 않아서 input의 value 값을 얻어내기가 어려웠으며 얻은 후에도 함수의 위치를 어디로 정하는지에 대하여 많은 고민을 하였음.
- 복수 선택지를 허용하는 Select Component의 value를 얻기 위해서 위 코드를 처음에는 단일 선택을 허용하는 Select의 value를 얻는 함수안에 넣었으나 지속적으로 childNodes와 multiValues가 undefined라는 error를 만나게 되었다.
- 어찌보면 당연한게 처음 render시에는 multiValues가 비어있기에 그리고 단일, 복수를 허용하는 Select component에 동일한 함수를 적용하였기에 발생할 수 밖에 없다.
- 그리하여 위 코드를 postHandler 즉 회원가입 버튼을 누를때 실행되게하여 회원가입 마지막 단계에 실행되게 하였으며 또한 multiValues가 있을때에만 실행되게하여 undefined 오류를 막았다.

## 내일 해봐야 할 것 & 마인드 셋

- login modal 구현
- Mypage 구현
- 위 page와 관련한 component 및 함수 구현
- 오전이 너무 멍했는데 오후부터 정신을 차릴 수 있었으며, 조급한 마음이 들었지만 침착하게 하나하나 해결해 나가니 문제가 해결되었음. 위 언급하였던 Select Component에서 value를 얻는 함수를 구현하는 과정에서 시간이 많이 허비가 되었지만 다른사람에게 어려움을 공유하는 와중에 해결이 되었음. 나의 경우 어려움을 공유하면서 설명하는 과정 중에 많은 부분이 해결되었음을 알 수 있음. 적당한 고민은 필요하지만 너무 오래 고민하지 말고 한번 공유해보자!
