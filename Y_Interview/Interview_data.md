# **Interview_Data** 이 자료는 분명 도움이 될 것이다!

## 기술면접

---

### [NodeJS] Node.js에서 비동기의 개념은 어떻게 되나요?

#### synchronous(동기) & asynchronous(비동기) 차이와 의미

- 일이 처리되면서 그 일이 오랫동안 처리되어야하는 경우에도 기다렸다가 그 다음일을 처리하는 것이 `동기적`인 처리방식이고.
- 병렬적으로 동시에 여러가지를 처리하는 것이 `비동기적`인 처리방식이다.
<!-- - 비동기는 효율적이지만 복잡하다. -->
- Node JS는 비동기적 처리를 기본으로 한다.(하기위한 좋은 기능을 가지고 있음.)

#### fs.readFile은 비동기, fs.readFileSync는 동기적인 것을 의미하며

> `EX` fs.readFile(path[options], callback)과 fs.readFileSync(path[options]) readFile에는 callback이 있고 readFileSync에는 callback이 없다.

함수호출 순서에서 함수의 콜백이 이루어졌을때 콜백의 결과를 기다리는 것이 아닌 콜백함수를 호출하면서 다음줄을 실행하는 경우를 뜻 한다.

NodeJS는 multi Thread 방식의 문제점을 보완하기위해 Single Thread + Non-blocking I/O 방식을 도입한 FrameWork이다.

#### 알아야할 개념

- CPU Bound, I/O Bound
- Event Loop
- multi thread
- single thread

[비동기 관련 참고하여 조사하자](https://qkraudghgh.github.io/node/2016/10/23/node-async.html)

## 프로젝트를 진행하며 어려웠던 경험?

---

### DEVzine에서 메일로 자체 컨텐츠의 url 및 신문사들의 url을 보내주고 그 url을 통해 DEVzine 사이트에 접속하면 그 url에 해당하는 내용을 볼 수 있게 해야하는 상황에서, 자체 컨텐츠가 만들어질때마다 어떻게 (직접 하나하나 컨텐츠 component와 path를 만들지 않고) 자동으로 DB와 유기적으로 연계하여 컨텐츠와 path를 만들어낼지 고민했던 경험.

---

- 회원, 구독자에게 매일마다 싱싱한 IT뉴스와 자체 컨텐츠(물론 직접 생산하지는 못하고 Lorem Ipsum으로 채웠습니다만,)를 제공하며 email을 보내주는 DEVzine이라는 프로젝트를 진행한 적이 있습니다.
- 자체 컨텐츠는 유일한 client의 path가 있어야했고, 그 path마다 다른 내용을 포함하고 있어야 했습니다.
- 맨처음 생각했었던 정말 단순한 생각은 우리가 직접 생산하는 기고글이니까 직접 하나씩 등록 해도 나쁘지 않겠다라고 생각했습니다만 이건 아니죠 아무리 생각해도.
- 두번째는 만약에 react에 express처럼 req.params같은 것이 있다고 가정한다면 component 자체는 서버에서 response를 받아서 array data(array 각각의 요소에는 id가 있어야하겠죠.)에 map을 돌려 만들어내고 array data에 있는 컨텐츠 각각의 id 값을 route의 path로 넣어주고 각 route에 해당하는 콤포넌트안에서 path의 값을 불러 올 수 있으니까 그 path의 값을 즉 contents의 id를 get요청을 보내면 해당하는 내용을 불러올 수 있겠다 생각했습니다.
- 검색을 하였고 해당하는 react-router-dom의 useParams라는 hook을 찾아내었습니다.
- 관련링크는 아래와 같습니다.  
  [useParams](https://reactrouter.com/web/example/url-params)

---

### window.close()구현이 되지 않아서 헤맸던 경험

---

## 로그인을 어떻게 구현하였나?

---

### Gallery:port JWT

### Gallery:port session

---

## 왜 프로젝트 진행 시 이런 stack을 사용하였나요?
