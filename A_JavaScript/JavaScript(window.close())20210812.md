# **JavaScript** window.close()에 관하여

## 문제상황

- 현 프로젝트`DEVzine:port`에서 우리 앱에 가입하기 위해서는 이메일 인증을 해야 하는데,
- signup page에서 이메일을 적고 이메일인증 버튼을 누르면 해당 이메일로 인증 메일이 발송된다.
- 인증 메일에서 `accept`를 누르면 email 화면이 우리 앱의 /authmail로 redirecting된다. 
- 여기서 몇 초 후에 자동으로 인증화면이 꺼지게 하고싶은것이 목표였고,
- 이를 위해 `window.close()`라는 메소드를 알게 되었다.
- 하지만 이는 올바르게 작동하지 않았고 `console`창에 아래와 같은 `ERROR`를 발생 시켰는데...

## 에러
> Scripts may close only the windows that were opened by them.
> 스크립트로 새로 열린 page가 아니면 스크립트로 닫을 수 없다. 

## 해결방안 
- 인증 이메일에서 accept를 누를경우에 `/authmail:email` 로 `redirection`되는데 이것 자체가 문제로 보인다.
- accept를 누를경우에 스크립트(`window.open()`으로)로 새로운 창을 띄우면서 그창의 주소를 `/authmail:email` 주소로 넣을 수 있다면 해결 할 수 있지 않을까?
- ejs파일의 기존 `a tag`의 속성을 아래와 같이 변경하면 작동할 것이라고 생각한다. 

```html
<a href='#' onclick="window.open(<%=CLIENT_ENDPOINT %>/authmail/<%= user_email %>); return false;">accept signup</a>
```

## 내일 해야할 것
- mypage에서 비밀번호 비교할때 해싱값으로 비교하게 구현
> `참고 코드` password는 사용자가 typing할 때 적히는 값(state), original password는 서버에서 받아오는 hash값(state) 사용자가 타이핑하면 password를 해싱해서 비교한다.
```jsx
const bcrypt = require('bcryptjs');

export function checkHashedPassword(password, originalPassword) {
  const result = bcrypt.compareSync(password, originalPassword);
  return result;
}
``` 
- 위 `window.close()` 검증.
- `react-select`모듈에 defaultValue를 지정할 수 있는 방법을 찾아내어 defaultValue를 정의