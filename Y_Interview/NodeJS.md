# 기술면접

## [NodeJS] Node.js에서 비동기의 개념은 어떻게 되나요?

### synchronous(동기) & asynchronous(비동기) 차이와 의미

- 일이 처리되면서 그 일이 오랫동안 처리되어야하는 경우에도 기다렸다가 그 다음일을 처리하는 것이 `동기적`인 처리방식이고.
- 병렬적으로 동시에 여러가지를 처리하는 것이 `비동기적`인 처리방식이다.
<!-- - 비동기는 효율적이지만 복잡하다. -->
- Node JS는 비동기적 처리를 기본으로 한다.(하기위한 좋은 기능을 가지고 있음.)

### fs.readFile은 비동기, fs.readFileSync는 동기적인 것을 의미하며

> `EX` fs.readFile(path[options], callback)과 fs.readFileSync(path[options]) readFile에는 callback이 있고 readFileSync에는 callback이 없다.

함수호출 순서에서 함수의 콜백이 이루어졌을때 콜백의 결과를 기다리는 것이 아닌 콜백함수를 호출하면서 다음줄을 실행하는 경우를 뜻 한다.

NodeJS는 multi Thread 방식의 문제점을 보완하기위해 Single Thread + Non-blocking I/O 방식을 도입한 FrameWork이다.

### 알아야할 개념

- CPU Bound, I/O Bound
- Event Loop
- multi thread
- single thread

[비동기 관련 참고하여 조사하자](https://qkraudghgh.github.io/node/2016/10/23/node-async.html)
[libuv 관련](https://hdaleee.tistory.com/15)

### 답변

> node.js는 `multi Thread` 방식의 문제점을 보완하기 위해 `single thread`와 `Non-blocking I/O 방식`을 도입했는데요. 이를 추상적으로 node.js는 비동기라고 말을 합니다.

> client에서 Disk, Network, Database와 관련된 작업 즉 I/O bound Task를 요청하면 Event Queue에 message형식으로 쌓이고 event loop가 돌면서 event task들을 pop하여 non-blocking 방식으로 kernel에 처리를 요청하며 작업이 끝난 Task를 감지해서 callback function을 호출하는 형식으로 비동기를 구현합니다.

- NodeJS는 자바스크립트 V8엔진과 libuv가 합쳐져서 만들어낸 것이고, `libuv`에 event loop가 있습니다.
- `event loop`는 Nodejs의 싱글 쓰레드에서 돌아가며 event queue에 쌓인 I/O Bound 작업들을 비동기적으로 처리해주기 위해서 필요합니다. 또한 event loop는 kernel에 요청한 system call을 ....
- `I/O Bound` Disk, Network, Database와 관련된 Task를 말합니다.
- `kernel` 커널이란 운영체제(OS)에서 가장 중요한 구성요소로서, 입출력을 관리하고 소프트웨어로부터 요청 (System Call)을 컴퓨터에 있는 하드웨어(CPU, 메모리, 저장장치, 모니터)가 처리할 수 있도록 요청(System Call)을 변환하는 역할을 합니다.
- `동기`는 일이 처리되면서 그 일이 오랫동안 처리되어야하는 경우도 기다렸다가 다음 일을 처리하는 것이 동기적인 `blocking` 처리방식이고
- `병렬적`으로 동시에 여러가지를 처리하는 것이 비동기적인 `non-blocking` 처리방식이라고 합니다.
