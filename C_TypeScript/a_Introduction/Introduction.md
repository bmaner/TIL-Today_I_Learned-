# TypeScript Introduction

## TypeScript Summary

- 오픈소스 프로그래밍 언어 <br>
- 자바스크립트의 상위 집합으로 최신 JS를 지원(Javascript로 변환 가능) <br>
- 장점 <br>
  - 대규모 앱 개발에 용이 <br>
  - JS라이브러리 사용 가능 <br>
  - 개발 도구 지원 <br>
  - 정적 타이핑 언어이기에 컴파일 과정에서 에러가 발생, 개발단계에서 에러를 처리 할 수 있음 <br>
    <br>

### How to install?

- `sudo npm install typescript -g`으로 설치 <br>
- `name.ts`로 파일을 만든 후 terminal에 `tsc name.ts`으로 컴파일러가 실행되며 `name.js`파일이 생성된다.<br>

### TypeScript의 특징

- `tsc`는 기본적으로 구형브라우저를 지원하는 es5로 변형을 해주는데(let으로 변수를 선언해도 var로 변형됨),<br>
- `tsc name.ts --target es6`과 같이 `--target`옵션으로 최신 브라우저를 지원하는 형식으로 만들 수 있다.(let 유지)
- Promise 객체를 생성하여 es5로 변형을 시키면 찾을 수 없다고 함.(왜? es5에서는 promise를 지원하려면 별도의 폴리필(`polyfill`)이 필요 아래 ERROR Message 참고)<br>
  > What is the polyfill?<br>
  > 충전솜(메꾸는 역할)이라는 사전적 의미<br>
  > 브라우저에서 지원하지 않는 코드를 사용가능하게하는 플러그인을 의미.<br>
- `--lib`옵션으로 polyfill을 추가하여 코드가 사용가능하게 만들 수 있음
  - `tsc hello.ts --lib es5,es2015.promise,es2015.iterable,dom`이렇게나 많은 polyfill을 추가해야, 그제서야 에러가 안뜨게 됨.

```ts
//TS로 입력한 부분
let timeoutPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('1 sec');
  }, 1000);
});
timeoutPromise.then(console.log);
```

```sh
park@Park:~/TIL/C_TypeScript/a_Introduction$ tsc hello.tshello.ts:3:26 - error TS2585: 'Promise' only refers to a type, but is being used as a value here. Do you need to change your target library? Try changing the 'lib' compiler option to es2015 or later.

3 let timeoutPromise = new Promise((resolve, reject) => {
                           ~~~~~~~


Found 1 error.
```

```js
//터미널에 tsc hello.ts --lib es5,es2015.promise,es2015.iterable,dom 입력 결과 아래와 같이 변형된다.
var timeoutPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('1 sec');
  }, 1000);
});
timeoutPromise.then(console.log);
```

### TypeScript에서의 module

- option을 통해서 control할 수 있음. <br>
- util.ts를 생성하고 그 안에 add 함수를 생성, export default하여 hello.ts에서 import하여 add 함수를 사용하였음. <br>
- 그리고 `tsc hello.ts --lib es2015,dom`으로 compile하면 아래와 같이 util.js와 hello.js가 생성됨<br>

```js
//util.js
'use strict';
exports.__esModule = true;
function add(a, b) {
  return a + b;
}
exports['default'] = add;
```

```js
//hello.js
'use strict';
exports.__esModule = true;
var hello = 'hello';
var hello2 = 'hello2';
var timeoutPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('1 sec');
  }, 1000);
});
timeoutPromise.then(console.log);
var util_1 = require('./util');
var value = util_1['default'](1, 2);
console.log(value);
```

- 위의 `hello.js`는 node에서 3이라는 결과값을 출력하나, `tsc hello.ts --target es6`는 syntax Error를 출력함<br>
- `tsc hello.ts --target es6 --lib es2015, dom --module commonjs`로 target은 es6이지만 모듈시스템은 commonjs형태로 바꿀 수 있다.<br>

### TypeScript compile 시 매번 option을 지정해서 compile해야하는가?

- compile을 설정할 수 있는 파일이 별도로 존재함.<br>
- compile 설정파일에다가 compile 옵션을 지정 가능.<br>
- `--showConfig` 옵션을 통해 현재 어떤 옵션이 지정되는지 확인 가능(하단 참고)<br>

```sh
{
    "compilerOptions": {
        "target": "es6"
    },
    "files": [
        "./hello.ts"
    ]
}
```
