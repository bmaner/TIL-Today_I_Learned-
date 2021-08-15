# **JavaScript** Legacy octal literals are not allowed in strict mode Error

## 시도했던 것들

- 서버에서 `contribution status code`(사용자가 기고한 글의 상태를 나타내는 code)를 받아 이에 알맞은 메세지를 render하기 위하여 아래와 같은 함수를 작성하였으나,

```js
export function statuscodeconvert(code) {
  console.log(typeof code);
  const status = {
    00: '게시 승인 대기',
    01: '수정 승인 대기',
    02: '삭제 승인 대기',
    10: '게시 승인 완료',
    11: '수정 승인 완료',
    12: '삭제 승인 완료',
    20: '게시 승인 거부',
    21: '수정 승인 거부',
    22: '삭제 승인 거부',
    30: '기타',
  };
  return status[code];
}
```

- 터미널에서 이러한 오류를 만나게 되었다.

```sh
SyntaxError: /home/park/코드스테이츠/DEVzine-port/client/src/utils/statuscodeconvert.js: Legacy octal literals are not allowed in strict mode. (4:4)
```

- `JS`에서는 정수 리터럴에서 0으로 시작할 경우 8진수임을 나타낸다.
  > 정수 리터럴에서 선행 0(zero)이나 선행 0o(혹은 0O)은 8진수임을 나타냅니다. 8진 정수는 오직 숫자 0-7만 포함할 수 있습니다. (출처 : `mdn`)
- 8진 literal은 더이상 사용하지 않으므로 `use strict`모드 에서는 `syntax error`를 날리는데
- 숫자 0뒤에 영어 소문자 o를 넣음으로 8진수를 사용할 수 있다.
- 내가 짠 코드가 8진수라는 것도 몰랐고 사용하고자하는 생각도 없었지만 지금과 같은 형태를 사용하고자한다면 백엔드분들과 한번 얘기를 나누어보아야 할 것 같다.

아래는 `use strict`에서 8진 리터럴이 더이상 사용하지 못함을 실험하기 위한 코드 이다.

```js
(() => {
  'use strict';
  console.log(010);
})();
//Uncaught SyntaxError: Octal literals are not allowed in strict mode.
```

```js
(() => {
  console.log(010);
})();
//8
```

---

## 오류해결에 참고한 링크

- [mdn octal](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Grammar_and_types)
- [mdn SyntaxError: "0"-prefixed octal literals and octal escape seq. are deprecated](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Errors/Deprecated_octal)
- [stackoverflow](https://stackoverflow.com/questions/23609042/how-to-avoid-octal-literals-are-not-allowed-in-strict-mode-with-createwritestr)
- [runebook](https://runebook.dev/ko/docs/javascript/errors/deprecated_octal)
