# 기술 면접

## Javascript	promise(프로미스)의 개념에 대해서 설명하고, 콜백 함수 방식과 차이점을 설명해주세요.

프로미스는 JavaScript에서 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다.

(우선 동기와 비동기를 설명드릴텐데요. 

동기는 일의 처리가 아무리 오래 걸리더라도 해당 일이 다 끝나면 다음일을 처리하는 것을 의미하고, 

비동기는 일의 처리가 오래걸리면 해당일을 처리요청해놓고 다음 일로 넘어가는 것을 의미합니다.)

이런 비동기 처리를 동기적으로 처리하는 방식이 있는데 그중 하나가 callback 함수를 사용하는 것과 promise를 사용하는 것입니다.  

콜백함수를 사용하여 비동기처리를 동기적으로 처리하면 코드가 중첩되는 문제가 발생하게 됩니다. 

이는 콜백지옥으로 이어질 수가 있겠지요.

콜백지옥은 코드의 가독성을 떨어뜨리고 그에 따라서 당연히 에러 핸들링에 어려움을 겪게 됩니다. 

이에 대한 대안이 될 수 있는 것이 바로 프로미스입니다. 

프로미스에는 몇가지 특징이있습니다. 

프로미스는 생성자 함수로 생성이 가능하며 인자로 resolve와 reject라는 콜백함수를 받는다는 것과  

프로미스에는 pending, fulfilled, rejected라는 상태가 있다는 것입니다. 

(참고로 pending은 이행하거나 거부되지 않은 초기 상태를 의미하고, 

연산이 성공적으로 완료되면 이때 .resolve() 실행되며 fulfilled의 상태가 되며,

연산이 실패하면 이때 .reject()가 실행되며 rejected라는 상태가 됩니다.)

마지막으로 promise는 상태와 관계없이 promise객체를 반환하는데,

객체를 사용하기위해서 .then()이라는 메서드를 사용해야한다는 것입니다.

.then은 연산이 성공적일경우를 처리하기위해,

.catch는 연산이 실패했을 경우의 error핸들링을 위해 사용됩니다. 

.then과 .catch 메서드의 반환값은 다른 프로미스이기에 서로 연결을 할 수가 있는데요? 

즉 chaining이 가능하게 됩니다. 

이 chaining을 사용하면 callback함수와의 차이점이 또 발생하게 되는데요, 

promise로 chaining을 사용하면 가독성이 좋아지며, 

callback으로 연쇄적인 비동기를 사용할 경우에는 error 처리를 비동기를 사용할 때마다, 

적어줬어야했는 반면에, promise를 사용할 경우에는 한번만 사용해도 된다는 것입니다. 

## 자바스크립트에서의 promise

### What is a Promise 프로미스란 무엇인가?
자바스크립트에서의 promise는 우리의 삶에서 하는 약속과 같이 미래에 일어날 일을 참조합니다.  
  
promise는 비동기 작업들을 처리하는데 사용되어지며, 다음과 같은 세가지 가능한 상태가 있습니다.  
  
 - Pending(Initial State) 대기 : 이행하거나 거부되지 않은 초기 상태
 - Fulfilled(Successful) 이행 : 연산이 성공적으로 완료
 - Rejected(Failed) 거부 : 연산이 실패
    
promise 객체를 만들 때 상태는 fulfilled(이행)나 rejected(거부)가 되기 전까지 pending(대기)입니다. 만약 비동기 처리가 성공적으로 완료된다면 프로미스는 pending 상태에서 fulfilled 상태로 변화하며 비동기 처리 결과를 값으로 갖습니다. 비동기 처리가 실패하면 프로미스는 pending 상태에서 rejected 상태로 변화하며 error 객체를 값으로 갖습니다. 
  
### Creating a Promise in JavaScript 프로미스 생성하기
```js
const promiseExample = new Promise((resolve, reject) => {
  const condition = true;
  if (condition) {
    resolve("Resolve with Any type of data (objects, arrays, strings, etc...");
  } else {
    reject("Error description.");
  }
});
```
Promise 생성자 함수를 new 연산자와 함께 호출하면 프로미스(promise 객체)를 생성합니다. Promise 생성자 함수는 비동기 처리를 할 두 콜백 함수(resolve, reject)를 인자로 받습니다. 비동기 처리가 성공하면 콜백 함수의 인수로  전달받은 resolve 함수를 호출하고, 비동기 처리가 실패하면 reject 함수를 호출합니다. 
  
### Using the Promise 프로미스 사용하기

**.then()**
```js
const promiseExample = new Promise((resolve, reject) => {
  const condition = true;
  if (condition) {
    resolve("Promise Fulfilled.");
  } else {
    reject("Promise Rejected.");
  }
});

promiseExample.then((result) => {
  console.log(result); // Promise Fulfilled.
});
```
`.then()`메서드는 두 개의 콜백함수를 인수로 전달받습니다. 첫번째 콜백 함수는 비동기 처리가 성공했을 때 호출되는 성공 처리 콜백 함수이며, 두 번째 콜백 함수는 비동기 처리가 실패했을 때 호출되는 실패 처리 콜백 함수입니다. 에러를 바로 처리해주어야 하는 경우가 아니라면 두 번째 콜백 함수로 일일이 비동기 처리가 실패했을 때를 위한 상황을 대비하지 않아도 됩니다. 마지막에 에러를 한번에 처리하기 위한 좋은 메서드 `.catch()` 가 있기 때문입니다. 콜백함수 자체는 promise에서 반환된 실제 결과(result === "Promise Fulfilled")를 저장하는 매개 변수를 사용합니다.  
  
**.catch()**
```js
promiseExample.catch((err) => {
  console.log(err); // Promise Rejected.
});
```
`.catch`메서드는 한 개의 콜백 함수를 인수로 전달받으며 `.catch`메서드의 콜백 함수는 프로미스가 rejected 상태인 경우만 호출됩니다. 
  
**.finally()**
`.finally`메서드는 한 개의 콜백 함수를 인수로 전달받으며 `finally`메서드의 콜백 함수는 프로미스의 성공, 실패와 무관하게 반드시 한 번 호출됩니다. (전달인자는 받지 않습니다.)
  
### Chaining of Promises 프로미스 체이닝
여러 개의 비동기 작업을 수행해야 할 때 promise chaining을 사용해야 합니다. 
```js  
// Resolve promise after 1 sec
const promiseExample = new Promise((resolve, reject) => {
  setTimeout(() => { 
    resolve("data of 1st Promise");
  }, 1000);
});

promiseExample
  // 1st .then()
  .then((dataOfFirstPromise) => { 
    console.log(dataOfFirstPromise); // data of 1st Promise

    // simulating API call which resolves after 1 sec.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("data of 2nd Promise");
      }, 1000);
    });

  })
  // 2nd .then()
  .then((dataOfSecondPromise) => { 
    console.log(dataOfSecondPromise); // data of 2nd Promise
  })

  .catch((err) => console.log(err));
  ```
몇 가지 유의할 점이 있습니다.
  
- `.then()`과 `.catch()`메서드는 언제나 프로미스 객체를 반환하므로 우리는 `.then()`과 `.catch()`를 반환된 promise 객체에 다시 사용하여 promise를 연결할 수 있습니다. 
- 위 예에서는 두 개의 `then`메서드를 사용하였습니다. 따라서 두 번째 `.then()`에서 첫 번째 `.then()`메서드의 결과를 사용하려면 결과를 첫 번째 `.then()`안에서 반환해야합니다.  위 예시의 경우 첫 번째 `.then()`메서드 안에서 promise 객체를 반환하였습니다. 
- promise에 오류가 발생할 경우 `.catch()`를 사용하여 오류를 파악합니다. `.catch()`메서드는 promise에서 오류가 발생하든 `.then()` 메서드 안에서 오류가 발생하든 언제나 파악할 수 있기에 `.then()`메서드의 두 번째 콜백함수 대신 `.catch()`메서드를 사용합니다. 
> then메서드와 catch메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고, 콜백 함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환합니다. 그러므로 두 메서드는 언제나 프로미스를 반환합니다. 
  
위 예시를 보면 `.then()`, `.catch()` 메서드를 사용하여 promise를 chain 할 수 있음을 알 수 있습니다.
  
## JavaScript와 Nodejs가 어떻게 다른 것인지 설명해주세요.

javascript는 웹브라우저를 위한 싱글스레드 비동기 언어이고, node.js는 웹 브라우저 외에서 자바스크립트를 실행할 수 있는 런타임입니다.

런타임 환경이란 프로그램이 실행되는 곳을 의미하는데 중요한 점은, 런타임 환경이 바로 프로그램이 접근할 수 있는 전역 객체와 작동 방식을 결정한다는 사실이다. 대표적인 JS 런타임은 브라우저와 Node 두 개가 있다.

브라우저 (Chrome, Firefox 등)

- JS 가 실행되는 가장 보편적인 런타임 환경입니다.
- 브라우저에는 window 라는 전역객체가 내장되어 있어, JS script 를 통해 window 와 관련된 메서드를 실행할 수 있습니다.
(예시: window.alert())

Node

- 브라우저 없이도 JS를 실행할 수 있도록 하기 위해 만들어진 런타임 환경입니다.
- 브라우저와는 전혀 다른 런타임 환경이기 때문에, 브라우저 관련 객체 (window 등) 에는 접근할 수 없습니다.
- 대신, 서버를 구축할 때 필요한 다른 변수들 (환경변수 등) 에 접근할 수 있도록 설정되어 있습니다.


## JavaScript에서 event loop란 무엇인가요?

자바스크립트는 싱글스레드입니다.

하지만 멀티스레드처럼 동시에 여러 태스크의 작동이 가능한 것처럼 보입니다. 이는 런타임 환경의 이벤트 루프라는 동작 방식 덕분입니다. 브라우저의 이벤트 루프는 callstack과 task queue를 주시하며 callstack이 비어있다면 task queue의 가장 오래된(첫번째) 메시지를 callstack에 넣어주어서 메세지(콜백함수)가 실행되게 하는 역할을 수행합니다.

[event loop관련 TIL](https://bedeveloper.tistory.com/86)

## 기존 자바스크립트와 ES6의 차이점 및 특징

**Constants**
 다시 할당할 수 없는 변수 const의 추가
 
**Scoping** 
블록{}범위 변수 let, const의 추가
기존 함수의 스코프를 블록{}범위 함수로 변경
```js
//es6 => 하지만 블록{}으로만 감싸주어도 지역스코프의 함수로 선언 가능
{
    function foo () { return 1 }
    foo() === 1
    {
        function foo () { return 2 }
        foo() === 2
    }
    foo() === 1
}

// es5 => 지역스코프의 함수로 선언하기 위해 ()로 감싸고 호출하는 코드를 작성해야 됬었다.
(function () {
    var foo = function () { return 1; }
    foo() === 1;
    (function () {
        var foo = function () { return 2; }
        foo() === 2;
    })();
    foo() === 1;
})();
```
**Arrow Functions**
화살표 함수의 추가로 훨씬 더 가독성이 올라가게 되었다.
```js
//es6
odds  = evens.map(v => v + 1)
pairs = evens.map(v => ({ even: v, odd: v + 1 }))
nums  = evens.map((v, i) => v + i)

//es5
odds  = evens.map(function (v) { return v + 1; });
pairs = evens.map(function (v) { return { even: v, odd: v + 1 }; });
nums  = evens.map(function (v, i) { return v + i; });
```
**화살표 함수는 lexical this를 따른다. => 화살표 함수는 (한번쓰고 버리는게 화살표함수)본인이 가지고 있는 this가 없다. 화살표 함수외에 다른 함수는 this가 있어서 참조할 수 있는데.  그렇다면 화살표함수안에서 this를 찍으면 무엇을 참조할까? 상위 scope의 this를 참조한다. lexical의 의미가 내가 속한 scope가 참조하는 상위 scope. 그러므로 화살표 함수는 lexical this를 따른다.** 
 > 참고 this란?
 > javascript에서 this란 생성자 함수안에서 앞으로 생성될 인스턴스를 가르키는 식별자이다.   
 > this 바인딩은 this와 this의 대상이 되는 인스턴스를 연결해주는 과정이다.
 
**Extended Parameter Handling**
함수의 매개변수에 default value를 설정하려면 함수안에서 별도로 설정 해줘야 했지만   
es6에서는 그럴 필요가 없이 매개변수에다가 바로 할당 해 놓으면 된다.(어디서 본 것은 같은데 굉장히 낯설다.) 아래 예시를 보자.
```js
Default Parameter Values

//es6 
function f (x, y = 7, z = 42) {
    return x + y + z
}
f(1) === 50

//es5
function f (x, y, z) {
    if (y === undefined)
        y = 7;
        // var y = y || 7 로도 쓸 수 있다.
    if (z === undefined)
        z = 42;
        // var z = z || 42 로도 쓸 수 있다.
    return x + y + z;
};
f(1) === 50;
```
단일 매개변수로 나머지 인자를 다룰 수 있다.
```js
Rest Parameter

//es6
function f (x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, "hello", true, 7) === 9

//es5
function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    //Rest Parameter 보다 위의 내용이 더 새로워 보인다.
    return (x + y) * a.length;
};
f(1, 2, "hello", true, 7) === 9;
```
배열이나 문자열(iterable collection)의 요소들을 문자그대로의 요소나 함수의 개별 매개변수로 분산시키는 것이 가능하게 되었다.   
문장으로 적으면 복잡해 보이지만 예시로 보면 오히려 쉽다. 
```js
Spread Operator

//es6
var params = [ "hello", true, 7 ]
var other = [ 1, 2, ...params ] // [ 1, 2, "hello", true, 7 ]

function f (x, y, ...a) {
    return (x + y) * a.length
}
f(1, 2, ...params) === 9

var str = "foo"
var chars = [ ...str ] // [ "f", "o", "o" ]

//es5
var params = [ "hello", true, 7 ];
var other = [ 1, 2 ].concat(params); // [ 1, 2, "hello", true, 7 ]

function f (x, y) {
    var a = Array.prototype.slice.call(arguments, 2);
    return (x + y) * a.length;
};
f.apply(undefined, [ 1, 2 ].concat(params)) === 9;

var str = "foo";
var chars = str.split(""); // [ "f", "o", "o" ]
```
**Template Literals**
문자열에 대하여 조금더 직관적인 표현이 가능하게 해주는 Template Literal의 등장  
Template Literal은 `${}`(${}안에)자바스크립트 표현식을 사용가능하게 했다.

**Extended Literals**
2진수와 8진수를 parseInt()함수의 도움없이 바로 사용할 수 있게끔 했다.   
이로 인해서 Octal Error가 strict 모드에서 발생하게 되었는데 관련자료는 아래와 같다. 

[Octal Error 관련 TIL](https://bedeveloper.tistory.com/80)

```js
//es6
0b111110111 === 503
0o767 === 503

//es5
parseInt("111110111", 2) === 503;
parseInt("767", 8) === 503;
```

**Enhanced Object Properties**

객체에서 속성과 값이 같을 경우 줄여서 쓸 수 있다.

Property Shorthand
```js
//es6
var x = 0, y = 0
obj = { x, y }

//es5
var x = 0, y = 0;
obj = { x: x, y: y };
```
또한 속성 이름을 객체 안에서 계산되어 정의될 수 있도록 하였다.(처음 보는 듯 하다.)
```js
//es6
let obj = {
    foo: "bar",
    [ "baz" + quux() ]: 42
}

//es5
var obj = {
    foo: "bar"
};
obj[ "baz" + quux() ] = 42;
```
일반 함수와 생성자 함수 모두 객체의 속성 정의 시 메서드 표기법을 지원하게 되었다. 
```js
//es6
obj = {
    foo (a, b) {
        …
    },
    bar (x, y) {
        …
    },
    *quux (x, y) {
        …
    }
}

//es5
obj = {
    foo: function (a, b) {
        …
    },
    bar: function (x, y) {
        …
    },
    //  quux: no equivalent in ES5 => 생성자 함수가 ES5에는 없다.
    …
};
```

**Classes**

class를 통해 객체 정의하고 이 객체를 new 키워드를 통해 생성을 할 수 있게 되었다.  

(ECMA에서 설명하기로는 객체지향스타일로 상용구 없이 class를 정의할 수 있게 되었다고 표현한다.)
```js
//es6

class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
}

//es5

var Shape = function (id, x, y) {
    this.id = id;
    this.move(x, y);
};
Shape.prototype.move = function (x, y) {
    this.x = x;
    this.y = y;
};
```
extends, constructor, super를 통해 상용구 없이 객체의 속성과 메소드의 상속이 가능해 졌다.  

참고로 mdn에서 extends, constructor, super는 아래와 같이 표현된다. 

> The extends keyword is used in class declarations or class expressions to create a class as a child of another class.  
> The constructor method is a special method of a class for creating and initializing an object of that class.  
> The super keyword is used to access and call functions on an object's parent.(this keyword를 쓰려면 반드시 contructor안에서 super가 사용되어야한다. )  

예시는 아래와 같다. 
```js
//es6

class Rectangle extends Shape {
    constructor (id, x, y, width, height) {
        super(id, x, y)
        this.width  = width
        this.height = height
    }
}
class Circle extends Shape {
    constructor (id, x, y, radius) {
        super(id, x, y)
        this.radius = radius
    }
}

//es5

var Rectangle = function (id, x, y, width, height) {
    Shape.call(this, id, x, y);
    this.width  = width;
    this.height = height;
};
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;
var Circle = function (id, x, y, radius) {
    Shape.call(this, id, x, y);
    this.radius = radius;
};
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;
```
static 키워드는 클래스의 정적 메서드를 정의한다.  

정적 메서드는 클래스의 인스턴스 없이 호출이 가능하며 클래스가 인스턴스화되면 호출할 수 없다.   

출처: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/static  
```js
Static Members

//es6
class Rectangle extends Shape {
    …
    static defaultRectangle () {
        return new Rectangle("default", 0, 0, 100, 100)
    }
}
class Circle extends Shape {
    …
    static defaultCircle () {
        return new Circle("default", 0, 0, 100)
    }
}
var defRectangle = Rectangle.defaultRectangle()
var defCircle    = Circle.defaultCircle()
```
Getter와 Setter가 원래는 prototype안에서만 사용이 가능했는데 이제는 class안에서도 직접적으로 사용할 수 있게 되었다.   

여기서 getter와 setter를 알지 못하기에 짚고 넘어가려고 한다.   

출처: https://ko.javascript.info/property-accessors  

get은 인수가 없는 함수로, 프로퍼티를 읽을 때 동작하고  

set은 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출된다. 값이 매개변수로 오게 되는데 예시를 보면 이해하기 쉽다.  
```js
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};

alert(user.fullName); // John Smith

//get과 set을 접근자 프로퍼티(accessor property)라고 부르는데 
//get으로 함수를 지정한 경우에는 객체 밖에서 일반 프로퍼티처럼 접근할 수 있게 된다. 
//기 정의한 것 처럼 프로퍼티를 읽을 때 실행 된다.

let user = {
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
};

user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper

// set은 인수가 하나인 함수로, 프로퍼티에 값을 할당 할 때 호출된다.
```
**Destructuring Assignment**  
유용한 구조분해할당 또한 es6에서 등장하게 되었는데  
  
배열을 개별 변수로 직관적이고 유연하게 분해할 수 있게 도와준다.   
  
Swapping variables 변수 교환 역시 하나의 구조 분해 할당 식에서 가능하게 되었다고 한다.  
(구조분해할당이 없었으면 두값을 교환하기 위해 임시 변수가 필요했다.)  
아래 예시를 보면 이해하기 쉬울 것이다.   

```js
Array Matching & Swapping variables

//es6
var list = [ 1, 2, 3 ]
var [ a, , b ] = list
[ b, a ] = [ a, b ]
console.log(a) // 3
console.log(b) // 1

//es5
var list = [ 1, 2, 3 ];
var a = list[0], b = list[2];
var tmp = a; a = b; b = tmp;
```
객체를 개별 변수로 직관적이고 유연하게 분해할 수 있게 도와준다. 
```js
Object Matching, Shorthand

//es6
var { op, lhs, rhs } = getASTNode()

//es5
var tmp = getASTNode();
var op  = tmp.op;
var lhs = tmp.lhs;
var rhs = tmp.rhs;

//코드가 얼마나 짧아지는지 예시를 보면 알 수 있다.
```
중첩된 객체 또한 개별 변수로 직관적이고 유연하게 구조화가 가능하다.(이부분 또한 처음 알게된 사실)
```js
Object Matching, Deep Matching

//es6
var  { op: a ,  lhs: { op: b } , rhs: c } = getASTNode ( )

//es5
var tmp = getASTNode ( ) ; 
변수 a = tmp . op ; 
var  b = tmp . 좌 . op ; 
var c = tmp . rhs ;
```
구조분해할당에서도 기본값 설정이 가능하다.
```js
Object and Array Matching, Default Values

//es6
var obj = { a: 1 }
var list = [ 1 ]
var { a, b = 2 } = obj
var [ x, y = 2 ] = list

//es5
var obj = { a: 1 };
var list = [ 1 ];
var a = obj.a;
var b = obj.b === undefined ? 2 : obj.b;
var x = list[0];
var y = list[1] === undefined ? 2 : list[1];
```
함수의 호출 중에 배열과 객체를 개별 매개변수로 직관적이고 유연하게 구조화 할 수 있다.   

이 부분은 react에서 부모 component가 자식 component로 props를 넘겨줄때 자주 보았다.   
```js
Parameter Context Matching

//es6
function f ([ name, val ]) {
    console.log(name, val)
}
function g ({ name: n, val: v }) {
    console.log(n, v)
}
function h ({ name, val }) {
    console.log(name, val)
}
f([ "bar", 42 ])
g({ name: "foo", val:  7 })
h({ name: "bar", val: 42 })

//es5
function f (arg) {
    var name = arg[0];
    var val  = arg[1];
    console.log(name, val);
};
function g (arg) {
    var n = arg.name;
    var v = arg.val;
    console.log(n, v);
};
function h (arg) {
    var name = arg.name;
    var val  = arg.val;
    console.log(name, val);
};
f([ "bar", 42 ]);
g({ name: "foo", val:  7 });
h({ name: "bar", val: 42 });
```
선택적으로 기본값이 있는 Fail-soft 구조분해가 가능하다.   

> fail-soft가 무슨 말인가?
> Destructuring is also fail-soft, meaning that values not found return undefined instead of an error
> 즉, value가 찾아지지 않을때 error대신에 undefined를 반환하는 것을 말한다. 
> 그러고보니 fail-soft '연약한 실패' 용어를 만드는 자바스크립트 개발자들도 재밌다는 생각이 든다. 
> 출처: https://www.benmvp.com/blog/learning-es6-destructuring/
```js
//es6
var list = [ 7, 42 ]
var [ a = 1, b = 2, c = 3, d ] = list
a === 7
b === 42
c === 3
d === undefined
//list에 0번째, 1번째자리가 정해져있지 않으면 각각 a는 1, b는 2가된다는 말이고 
//2번째 줄에서 2번째, 3번째에 해당하는 요소가 없기 때문에 c는 3으로 기본값이 정해지고,
//d의 경우는 3번째 줄에서도 정의되지 않았기에 undefined가 되는 것이다.
//fail-soft의 개념으로 다시 설명하자면 d의 경우 해당하는 값이 없기 때문에 error 대신 undefined를 반환하는 것이다. 

//es5
var list = [ 7, 42 ];
var a = typeof list[0] !== "undefined" ? list[0] : 1;
var b = typeof list[1] !== "undefined" ? list[1] : 2;
var c = typeof list[2] !== "undefined" ? list[2] : 3;
var d = typeof list[3] !== "undefined" ? list[3] : undefined;
a === 7;
b === 42;
c === 3;
d === undefined;
```
**Modules**

namespace pollution없이 모듈에서 값 내보내기/가져오기를 지원한다.  

(개인적으로는 전역 스코프에 선언되지 않아서 충돌의 위험이 없다라고 해석을 했습니다. )  

> namespace pollution이 무슨 말인가?
> It means that something is misplaced. In programming that means that code that should really live in separate namespaces is added to a common namespace (in some cases the global namespace).
> 뭔가 잘못된 위치에 있는 것을 의미하며 별도의 네임스페이스에 있어야하는 코드가 공통 네임스페이스에 있는 것을 의미한다. 
> Basically, namespaces' main function is to categorize code, and both static and non static code must be defined in a namespace somewhere.
> 네임스페이스이 주요기능은 코드를 분류하는 것이며 어떤 코드(정적, 비정적 코드)든 네임스페이스 어딘가에 정의되어 있어야 한다.
> 출처: https://stackoverflow.com/questions/22903542/what-is-namespace-pollution

> namespace란?
> The namespace axis indicates all the nodes that are in scope for the context node. In this case, the context node must be an element node.
> 출처 : https://developer.mozilla.org/ko/docs/Web/XPath/Axes/namespace

> 즉, 종합하자면 JavaScript는 함수 오버로딩을 지원하지 않기에 동일한 이름을 가진 두 함수가 사용되면 함수가 로드되는 순서에 따라 한 함수가 다른 함수를 재정의 하게 된다.(충돌) 
> namespace pollution은 이러한 충돌의 원인이 되기에 전역 네임스페이스에 모든 것을 추가하지 않도록 주의해야한다라는 것.
> (네임스페이스를 scope라고 이해하고 이를 바탕으로 모든 글들을 읽었습니다. 다른 분들은 어떻게 해석하실런지 궁금하네요! 아시면 댓글 부탁드립니다.)

> namespace pollution에 대한 예시와 좋은 해결방법을 제시하는 reference :
> https://www.tutorialspoint.com/how-to-avoid-namespace-pollution-in-javascript

```js
//es6
//  lib/math.js
export function sum (x, y) { return x + y }
export var pi = 3.141593

//  someApp.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))

//  otherApp.js
import { sum, pi } from "lib/math"
console.log("2π = " + sum(pi, pi))

//es5
//  lib/math.js
LibMath = {};
LibMath.sum = function (x, y) { return x + y };
LibMath.pi = 3.141593;

//  someApp.js
var math = LibMath;
console.log("2π = " + math.sum(math.pi, math.pi));

//  otherApp.js
var sum = LibMath.sum, pi = LibMath.pi;
console.log("2π = " + sum(pi, pi));
```
기본으로 export되는 것을 표시할 수 있고 다른 값들을 혼합하여 표시 할 수 있다. 

```js
Default & Wildcard

//es6
//  lib/mathplusplus.js
export * from "lib/math"
export var e = 2.71828182846
export default (x) => Math.exp(x)

//  someApp.js
import exp, { pi, e } from "lib/mathplusplus"
console.log("e^{π} = " + exp(pi))
```
**Symbol Type**

객체 속성의 식별자로 사용될 수 있는 고유하고 변경할 수 없는 데이터 형식(원시 데이터 형의 일종)이 추가되었다,  

Symbol은 디버깅 목적으로만 사용된다.  
```js
Symbol("foo") !== Symbol("foo")
const foo = Symbol()
const bar = Symbol()
typeof foo === "symbol"
typeof bar === "symbol"
let obj = {}
obj[foo] = "foo"
obj[bar] = "bar"
JSON.stringify(obj) // {}
Object.keys(obj) // []
Object.getOwnPropertyNames(obj) // []
Object.getOwnPropertySymbols(obj) // [ foo, bar ]
```
위의 설명을 읽어도 이해가 안되고 왜 써야하는지 납득이 되지 않아서 조금 더 조사를 했다.  

Symbol()로 호출 할 때마다 다른 모든 기호와 다른 새로운 고유한 기호를 얻게 된다고 한다.  

Symbol()에 매개변수를 전달할 수 있고 Symbol()의 기호 설명으로 사용할 수 있다고한다.   

Symbol은 객체의 key로 사용될 수 있다. 그러나 getOwnPropertynames, for in 같은 메소드로는 접근할 수 없고  
getOwnPropertySymbols()를 통해서만 Symbol로 된 key에 접근할 수 있다.  

> 다른 것과 같은 기호가 없이 때문에 종종 속성 간의 이름 충돌을 피하기 위해  
> 혹은 사용자가 의도적으로든 인지하지 않고든 덮어쓸 수 없는 속성을 추가하기 위해 사용한다고 한다.   
> 쉽게 말하자면 실수로(이미 있는 메서드를 인식하지 못하고 같은 이름의 메소드를 추가하는)   
> 존재하는 객체의 key값이 변경될 수 있으므로 symbol을 통하여 유일한 값을 정의해 추가한다면 만약의 상황을 대비할 수 있는 것이다.  

**Iterators**

객체에서 반복 동작을 사용자가 지정할 수 있도록 iterable 프로토콜을 지원한다.   
또한 값 시퀀스(유한 또는 무한)를 생성하기 위해 iterator 프로토콜을 지원한다.   
마지막으로, 반복 가능한 개체의 모든 값에 대해 반복할 수 있는 연산자를(for ~ of) 편리하게 제공한다.  

> iterable이란 반복 가능한 객체이고 Symbol.iterator 속성에 특별한 형태의 함수가 들어있다.  
> 즉 객체의 Symbol.iterator속성에 특정 형태의 함수가 들어있으면,  
> 이를 Iterable이라고 부르는 것이고 해당 객체는 iterable protocol을 만족한다고 말한다.  
> iterable 객체를 만들어내는 생성자에는 다음과 같은 종류가 있다.  
> - String  
> - Array  
> - TypedArray  
> - Map  
> - Set  
> 어떤 객체가 iterable이면 for ~ of, spread연산자, 구조분해할당을 사용할 수 있다.  
> 출처: https://helloworldjavascript.net/pages/260-iteration.html  

> Iterable protocol을 만족하려면, Symbol.iterator 속성에 저장되어 있는 함수는 iterator 객체를 반환해야 한다.  
> Iterator 객체는 다음과 같은 특징이 있다.  
> - Iterator는 next라는 메소드를 갖는다.  
> - next 메소드는 다음 두 속성을 갖는 객체를 반환한다.  
>   - value : 현재 순서의 값을 나타냄  
>   - done : 반복이 모두 끝났는지를 나타냄  
> 위 조건을 iterator protocol이라고 한다.  
> 출처: https://helloworldjavascript.net/pages/260-iteration.html   
> 어떤 객체든 iterable protocol을 구현하기만 하면 iterable이 될 수 있고, 
> 이 iterable을 만드는 방법에는 generator 함수를 이용하는 방법(Generators에서 소개)과 next메소드 안에서 return(done과 value)을 지정해주는 방법이 있다.  
> 여기서는 generator가 아닌 next메소드 안에서 return을 지정해주는 방법으로 한번 예시를 들어보겠다.  
```js
//es6

let fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1
        return {
           next () {
               [ pre, cur ] = [ cur, pre + cur ]
               return { done: false, value: cur }
           }
        }
    }
}

for (let n of fibonacci) {
    if (n > 1000)
        break
    console.log(n)
}
```
**Generators**
위 Iterator를 다루면서 Iterable 객체를 위한 방법으로 Generator를 잠시 언급했었다.  
  
Iterable을 생성하기 위해서는 Iterable protocol을 만족해야하고,  
Iterable protocol을 만족하기 위해서는 객체의 Symbol.Iterator속성에 특별한 함수가 있어야 한다.  
Generator 함수를 호출하면 객체가 생성되는데, 이 객체는 iterable protocol을 만족한다. 즉, Symbol.iterator 속성을 갖고 있다.   
  
Generator 함수 안에서는 yield라는 특별한 키워드를 사용할 수 있다. Generator 함수 안에서 yield 키워드는 return과 유사한 역할을 하며, iterable의 기능을 사용할 때 yield 키워드 뒤에 있는 값들을 순서대로 넘겨준다.  
  
출처: https://helloworldjavascript.net/pages/260-iteration.html  
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTzT5O%2FbtreJR3FG18%2FvPeUhGc1LSMcdLTRIVks01%2Fimg.png"  width="500" height="300">
<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvcuzA%2FbtreJiOe3n2%2F9xS4yPxHzcHjw86pv3kNvK%2Fimg.jpg"  width="300" height="120">

**Map/Set**

Map은 값들을 매핑하기 위한 새로운 데이터 구조로 간단한 키와 값을 서로 연결시켜 저장하며  
저장된 순서대로 각 요소들을 반복적으로 접근할 수 있도록 한다.   
  
for ~ of로 Map객체에 저장되어 있는 각 요소들을 [키, 값]형태의 배열로 반복적으로 반환해줄 수 있다.  
```js
var sayings = new Map();
sayings.set("dog", "woof");
sayings.set("cat", "meow");
sayings.set("elephant", "toot");
sayings.size; // 3
sayings.get("fox"); // undefined
sayings.has("bird"); // false
sayings.delete("dog");

for (var [key, value] of sayings) {
  console.log(key + " goes " + value);
}
// "cat goes meow"
// "elephant goes toot"
```
Set은 수학에서의 집합과 같은 개념으로 중복되지 않는 요소들이 모이는 data-structure이다.  
  
Set의 특징은 예시를 보면서 살펴보자.  
```js
let s = new Set()
s.add("hello").add("goodbye").add("hello") 
s.size === 2 //동일한 값을 여러번 넣어도 값이 추가되지 않는다.(치환된다)
s.has("hello") === true //has로 고유값의 존재 여부를 확인이 가능하다.
for (let key of s.values()) // insertion order
    console.log(key)
```
set은 고유값을 얻어야 할 때, 빠르게 Look up을 해야 할 때, 순서가 상관없을 때 사용해야 한다.   
  
**Typed Arrays**  
네트워크 프로토콜, 암호화 알고리즘, 파일 형식 조작 등을 구현하기 위한 임의의 바이트 기반 데이터 구조 지원  
  
**New Built-In Methods**  
```js
Object.assign(dest, src1, src2)

[ 1, 3, 4, 2 ].find(x => x > 3) // 4
[ 1, 3, 4, 2 ].findIndex(x => x > 3) // 2

"foo".repeat(3)

"hello".startsWith("ello", 1) // true

"hello".endsWith("hell", 4) // true

"hello".includes("ell") // true

Number.isNaN(NaN) === true

Number.isFinite(Infinity) === false

Number.isSafeInteger(42) === true

Number.isSafeInteger(9007199254740992) === false

console.log(0.1 + 0.2 === 0.3) // false ???

console.log(Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON) ???

console.log(Math.trunc(42.7)) // 42 정수 부분으로 자르고 소수 부분을 완전히 삭제 

console.log(Math.trunc( 0.1)) // 0

console.log(Math.trunc(-0.1)) // -0

console.log(Math.sign(7)) // 1 어떤 수의 부호를 반환

console.log(Math.sign(0)) // 0

console.log(Math.sign(-0)) // -0

console.log(Math.sign(-7)) // -1

console.log(Math.sign(NaN)) // NaN
```
> Number.EPSILON 속성(property)은 Number 형으로 표현될 수 있는 1과 1보다 큰 값 중에서 가장 작은 값의, 차입니다.  
  
**Promises**    
> Promise는 프로미스가 생성될 때 꼭 알 수 있지는 않은 값을 위한 대리자로, 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위한 처리기를 연결할 수 있도록 합니다. 프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드처럼 값을 반환할 수 있습니다. 다만 최종 결과를 반환하지는 않고, 대신 프로미스를 반환해서 미래의 어떤 시점에 결과를 제공합니다.
> Promise.all(iterable)
iterable 내의 모든 프로미스가 이행한 뒤 이행하고, 어떤 프로미스가 거부하면 즉시 거부하는 프로미스를 반환합니다. 반환된 프로미스가 이행하는 경우 iterable 내의 프로미스가 결정한 값을 모은 배열이 이행 값입니다. 반환된 프로미스가 거부하는 경우 iterable 내의 거부한 프로미스의 이유를 그대로 사용합니다. 이 메서드는 여러 프로미스의 결과를 모을 때 유용합니다.

**Meta-Programming**  
  
Proxy 객체는 기본적인 동작(속성 접근, 할당, 순회, 열거, 함수 호출 등)의 새로운 행동을 정의할 때 사용한다.  
```js
let target = {
    foo: "Welcome, foo"
}
let proxy = new Proxy(target, {
    get (receiver, name) {
        console.log('receiver', receiver)
        console.log('name', name)
        return name in receiver ? receiver[name] : `Hello, ${name}`
    }
})
proxy.foo   === "Welcome, foo"
proxy.world === "Hello, world"
//receiver {foo: 'Welcome, foo'}
//name foo
//receiver {foo: 'Welcome, foo'}foo: "Welcome, foo"[[Prototype]]: Object
//name world
//true

proxy.foo   === "Welcome, foo"
//true

proxy.world === "Hello, world"
//true
```
receiver의 경우 target 그 자체를 반환했고, name은 proxy 인스턴스의 속성을 반환했다. 

**Internationalization & Localization**  
Intl 객체는 각 언어에 맞는 문자비교, 숫자, 시간, 날짜비교를 제공하는, ECMAScript 국제화 API다.  
Intl.Collator콜레이터 생성자. 콜레이터 객체는 각 언어에 맞는 문자열 비교를 가능하게 해준다.  
```js
// in German,  "ä" sorts with "a"
// in Swedish, "ä" sorts after "z"
var list = [ "ä", "a", "z" ]
var l10nDE = new Intl.Collator("de")
var l10nSV = new Intl.Collator("sv")
l10nDE.compare("ä", "z") === -1
l10nSV.compare("ä", "z") === +1
console.log(list.sort(l10nDE.compare)) // [ "a", "ä", "z" ]
console.log(list.sort(l10nSV.compare)) // [ "a", "z", "ä" ]
```
Intl.DateTimeFormat각 언어에 맞는 시간과 날짜 서식을 적용할 수 있는 객체의 생성자.
```js
var l10nEN = new Intl.DateTimeFormat("en-US")
var l10nDE = new Intl.DateTimeFormat("de-DE")
l10nEN.format(new Date("2015-01-02")) === "1/2/2015"
l10nDE.format(new Date("2015-01-02")) === "2.1.2015"
```
Intl.NumberFormat각 언어에 맞는 숫자 서식을 적용할 수 있는 객체의 생성자.
```js
var l10nEN = new Intl.NumberFormat("en-US")
var l10nDE = new Intl.NumberFormat("de-DE")
l10nEN.format(1234567.89) === "1,234,567.89"
l10nDE.format(1234567.89) === "1.234.567,89"

var l10nUSD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
var l10nGBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" })
var l10nEUR = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })
l10nUSD.format(100200300.40) === "$100,200,300.40"
l10nGBP.format(100200300.40) === "£100,200,300.40"
l10nEUR.format(100200300.40) === "100.200.300,40 €"
```
## 모든 자바스크립트 파일을 브라우저에서 한 번에 로딩 할 때의 문제점과 그 해결([번역]How to load JavaScript properly)

> 모든 자바스크립트 파일을 브라우저에서 한 번에 로딩 할 때의 문제점이라는 질문에 대한 답을 찾기 전에 
> 한 번에 로딩할 때라는 것은 스크립트 파일을 동기적으로 로드 할 때라는 것을 의미한다고 정하겠습니다.

DOM이 구성 되어있지 않은 상태에서 DOM에 접근하는 script를 실행한다면  
script는 해당 DOM 요소에 접근 할 수 없습니다.   
  
(아래의 코드를 보면 스크립트를 읽는 시점에서는 h1은 아직 존재하지 않기 떄문에 console.log는 null을 출력합니다.)   
```html
<head> 
  <script> 
    console.log(document.querySelector('h1')) 
  </script> 
</head>
<body> 
  <h1>제목</h1> 
</body>
```
이를 해결하기 위해서 쉽게 body 태그의 맨 끝에서 script를 불러오면 문제가 없지 않을까라고 생각할 수 있지만 이것이 완전한 해결책이 될수는 없습니다. DOM이 준비가 되어 화면은 사용자에게 이미 보여지고 있는 상황이지만 script파일이 크고 무거울 경우 그리고 이를 로드 중 일 경우에 사용자가 페이지와의 상호작용을 시도한다면 페이지가 아무런 반응을 하지 않을 것이고 이는 나쁜 사용자 경험과 유저 이탈로 이어 질 수도 있기 때문입니다.    
  
이 문제는 아래와 같은 이유로 발생하게 됩니다.   
브라우저는 HTML파일을 맨 위에서 아래로 한 줄씩 파싱합니다. 그러다가 스크립트 파일을 마주치는 경우  
이를 로드하고 실행되는 동안에는 script 아래에 있는 나머지 DOM구성을 차단합니다. 즉 이 문제는 스크립트 파일을 동기적으로 로드하기 때문에 발생하게 되는 것입니다.   
  
그렇다면 이를 해결하기 위해서는 스크립트 파일을 비동기로 로드하고 실행해야할 것 입니다.  
이를위한 script 태그의 두 속성 async와 defer를 소개합니다.    

### async
```html
<script src="jquery.js" async></script>
```
script 태그의 async 속성은 브라우저가 DOM을 빌드하는 것과 스크립트 로드하는 것을 동시에 처리하도록 합니다. 스크립트 로드가 더 이상 DOM을 구성하는 것을 차단하지 않도록 할 수 있습니다. 
![image](https://user-images.githubusercontent.com/78008369/133060966-78c3c82f-b4b1-460b-b58c-f33acf4a8fe5.png)
하지만 스크립트 로드만 DOM 구성을 차단하지 않을 뿐 스크립트가 로드를 완료하는 즉시 스크립트가 실행되고 스크립트가 실행될 때에는 브라우저가 수행하는 모든 작업을 차단합니다.   
async는 아래와 같은 특징을 가지고 있습니다.  
- script 로드가 언제 완료될 지, 실행될 지 예측할 수 없다.
- 그렇기에 script가 완료되어 script가 존재하지 않는 DOM에 접근하여 문제를 발생시킬 수 있다. 
언제 async를 쓰지 말아야 할까요?  
- DOM에 접근하는 script가 있을 경우
- 여러개의 스크립트가 있고 스크립트들이 서로 상호 의존적인 경우
### defer
async처럼 defer 또한 script 로드 시에 브라우저를 차단시키지 않습니다. async의 경우 script를 실행 시 브라우저를 차단 시켰지만 defer의 경우 차이점이 있는데요.  
defer속성이 포함된 script의 경우 DOM의 구성이 끝나고 난 다음에야 실행이 됩니다. 그러므로 defer는 script가 DOM에 접근을 보장하는 이상적인 속성인 것이죠.    
![image](https://user-images.githubusercontent.com/78008369/133061157-539504cd-ccd8-444b-99ba-5c00e43eea94.png)
defer는 아래와 같은 특징을 가지고 있습니다. 우선 예시 코드를 먼저 보시죠.    
```html
<script src="library.js" defer></script>
<script src="app.js" defer></script>
```
library.js, app.js 둘 다 어떠한 값을 console.log하는 script파일이고, library.js가 app.js보다 훨씬 더 크고 무거운 파일일지라도 library.js의 console.log가 먼저 실행된 후 app.js의 console.log가 실행 됩니다. 이것은 defer 속성이 우리가 지정한 script tag의 순서를 따라서 실행시켜주기 때문입니다.   

언제 defer를 써야할까요?  
- DOM에 접근하는 모든 script들에 사용하면 좋습니다.(DOM에 대한 접근을 보장하기 때문이죠.)
- 여러 script들이 있고 이것들의 실행 순서가 script 각각에 영향이 있는 경우

원문 출처 : https://javascript.plainenglish.io/async-and-defer-the-complete-guide-to-loading-javascript-properly-ce6edce1e6b5

## Node.js는 싱글스레드 인가요? Node.js런타임이 동작하는 방식을 설명해주세요.
**싱글스레드 멀티스레드 여부**   
  
**NodeJS 는 기본적으로 libuv의 이벤트 루프를 메인 스레드**로 활용하기 때문에 "싱글 스레드"입니다.  
  
그러나 기본 작업 외 특정 작업을 수행할 때, 추가 스레드가 필요한 경우에는 새로운 스레드를 생성하여 실행할 수 있는 Multi-thread 이기도 합니다.  
  
**런타임의 동작 방식**  
  
Node.js는 V8 자바스크립트 엔진(memory heap과 call stack으로 구성)을 기본으로 동작합니다. 이벤트 루프는 싱글 스레드로 작동하며, libuv 내에서 비동기 작업을 처리합니다. DNS, fs, 해싱, 압축 등의 특정한 작업 호출이 있는 경우, 이를 libuv 내부의 Thread pool을 이용하여 멀티스레드로 처리합니다. 
  
NodeJS 의 스레드는 이벤트루프 (메인 스레드) 와 Thread Pool 로 구성되어 있습니다. Thread Pool 은 말 그대로 얼마든지 '향후에 사용 가능한' 비어 있는 스레드들의 그룹입니다. 현재 사용중이지 않지만, 태스크 분배가 가능한 상태의 스레드로 보시면 됩니다.   
NodeJS 의 경우 별도의 설정을 해주지 않을 경우 이 Thread Pool 의 값이 4로 지정되어 있어, 최대 4개의 추가 스레드를 사용할 수 있습니다. (물론 수동 설정을 통해 늘릴 수 있습니다)

## CORS란?
**정의**  
  
보안 정책, Cross-Origin Resource Sharing 의 약자. 웹 생태계에서 다른 Origin으로의 리소스 요청을 제한하거나 허용하는 것과 관련된 정책  
  
**목적**  
  
원래는 SOP (Same-origin policy) 가 정석인데 점차 웹에서 다른 출처에 있는 리소스를 가져와서 사용하는 일이 흔해지자, "몇 가지 예외 조항에 해당하는 리소스 요청"에 한해서는 허용해주자는 정책이 바로 CORS 정책  
- HTTP 통신에서의 더욱 효율적인 소통을 위한 과정  
- Cross-Origin: url 의 scheme(http), host(domain), port 가 다른 경우  
CORS 가 작동하는 3가지 방식이다.
  
**Simple Requests(간단한 요청)**: 다음 조건들을 만족하는 경우에 해당한다.  
  
- GET, HEAD, POST 메서드 요청
- 자동적으로 설정되는 헤더와 Accept, Accept-Language, Content-Language, Content-Type 만 존재하는 요청
- Content-Type 가 application/x-www-form-urlencoded, multipart/form-data, text/plain 중 하나에 속하는 요청
- 간단한 요청의 경우, 서버에서
  
```
Access-Control-Allow-Origin:
```
  
헤더를 추가한 응답을 보낸다.  

**Preflight Requests(사전 요청)**  
  
본 요청을 보내기 전에 OPTIONS 헤더를 단 요청을 먼저 보내, 안전성을 확인하는 형태의 요청이다. 이 경우, 실제 POST 요청이 아닌 OPTIONS 요청에 **Access-Control-Request-***  
  
요청 헤더에 **withCredentials** 와 같은 헤더가 포함된 경우 쿠키를 동반하게 되어, 서버의 응답에  
  
헤더가 포함되며, 이는 서버에게 실제 요청이 전달될 때 수행할 메서드와 기타 내용을 명시해주는 역할을 한다. OPTIONS 메서드는 실제 리소스를 변경할 수 없는 안전한 메서드이다.  
  
**Credential Requests(인증을 이용하는 요청)**  
  
**Access-Control-Allow-Credentials: true** 헤더가 포함되지 않을 경우 브라우저는 이를 거부하게 된다.  

## REST API?

    **API 란?**  

    Application Programming Interface 의 약자로, 서버가 클라이언트에게 제공하는, 리소스 활용 방법이 담긴 인터페이스이다.  
  
    Representational State Transfer API 의 약자이다.  
  
    HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.  
  
    등장 배경:  
  
    **프론트엔드Front-End와 백엔드Back-End가 분리되기 시작**  
  
    - 새로운 서비스 개발을 위해 개발작업 진행
    - JSON 형태로 데이터를 제공하는 API를 제공하자고 동의
    - RequestMethod(HTTP: GET, POST, PUT, DELETE)와 URL을 이용한 정의
    - View 영역이 포함되지 않은 서버사이드Server-side 개발을 진행
  
    주요 특징:  
  
    **행위(Verb) : HTTP Method**  
  
    POST, GET, PUT, DELETE 와 같은 메서드이다.  
  
    **REST API 는 아키텍쳐 원칙 세트로, 자원(Resource), 행위(Verb : HTTP Method), 그리고 표현(Representation) 으로 구성되어 있다.  **
  
    **자원(Resource) : URI**  
  
    자원은 서버에 저장되어 있으며, 해당 자원에 접근할 수 있는 uri 가 존재한다. client 는 uri 를 통해 해당 자원을 조작할 수 있다. (create, read, update, delete)  
  
    **표현(Representation of Resource)**  
  
    Client 가 상태 조작을 요구하는 요청(request)를 보내면 서버는 이에 대한 응답(Representation) 을 보낸다.  

## prototypes in JavaScript 자바스크립트에서의 프로토타입

### 소개
- 자바스크립트는 프로토타입 기반 언어이며, 상속을 통한 프로퍼티, 메서드 조회 및 코드 재사용성을 위해 프로토타입을 사용합니다.   
- 이번 글에서는 프로토타입과 프로토타입 체인, 프로토타입의(을 통한) 상속에 대해 알아보겠습니다.  
  
### 프로토타입과 프로토타입 체인

- 자바스크립트에서는 원시타입(numbers, strings, boolean 등)과 참조타입(arrays, object, function) 두가지의 데이터 타입이 있습니다.  
- 원시타입과 참조타입 둘 다 각각 object로 감싸여져있습니다.
(Both the primitive and the object types are wrapped by their respective objects.)
- 숫자는 `Number`로, 문자열은 `String`로, 부울은 `Boolean`으로 래핑됩니다.
- 배열은 `Array`에 의해, 객체는 `Object`에 의해, 함수는 `Function`에 의해 래핑됩니다.
- 이런 모든 래핑하는 객체에는 prototype이라는 프로퍼티가 있습니다.
- 이 프로토타입은 재사용 가능한 모든 속성, 메서드를 포함하는 객체이며 그것의 부모 프로토타입도 가지고 있습니다.
- 이러한 래핑하는 객체들의 부모는 `Object`라고 불리는 전역 객체입니다. 
- 프로토타입들에 의해서 서로 연결된 객체들의 체인은 프로토타입 체인이라고 합니다.
- 예시를 통해 프로토타입 체인을 시각화 해봅시다. 
![image](https://user-images.githubusercontent.com/78008369/133734966-70621171-ad35-4d26-ac63-e58095a8a89b.png)
- 이것이 어떻게 코드에서 작동하는지 봅시다.
- 변수의 프로토타입을 얻기위하여 `Object.getPrototypeOf()`메서드를 사용합니다. 
```js
const arr = [1, 2, 3];

const arrWrapperProto = Object.getPrototypeOf(arr);

console.log(arrWrapperProto); // Array

const objectProto = Object.getPrototypeOf(arrWrapperProto);

console.log(objectProto); // Object

const objectParentProto = Object.getPrototypeOf(objectProto);

console.log(objectParentProto); // null
```
### 프로퍼티, 메소드 조회
- 만약 여러분이 프로퍼티나 메서드에 접근하려고 노력할 때 자바스크립트는 그것들을 맨 먼저 현재 객체에서 찾으려고 할 것입니다.
- 그것들을 현재 객체에서 찾지 못할경우 프로토타입 체인을 이용하여 부모의 객체에서 찾습니다.
- 이 과정을 프로퍼티와 메서드를 발견할 때까지 혹은 null에 도달할 때까지 지속합니다.
- 이것이 바로 속성 또는 메서드를 조회하는 방법입니다.  
> Object.prototype
> 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있다. 자바스크립트 엔진은 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 __proto__ 접근자 프로퍼티가 가리키는 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 프로토타입 체인의 종점, 즉 프로토타입 체인의 최상위 객체는 Object.prototype이며, 기 객체의 프로퍼티와 메서드는 모든 객체에 상속된다. 
> 출처 : 모던 자바스크립트 Deep Dive
 
### 프로토타입의(을 통한) 상속
- 프로토타입의 주용 사용 사례는 코드를 상속받아 재사용하는 것입니다. 
- 상속은 프로토타입 체인으로 가능하게 됩니다. 
- 이해를 위한 예를 살펴봅시다.
```js
const person = {
  isTalkative: true,
  talk() {
    console.log("Talking...");
  },
};

const student = {
  name: "John",
  age: 12,
};

Object.setPrototypeOf(student, person);

console.log(student.name); // John

console.log(student.isTalkative); // true

student.talk(); // Talking...

console.log(Object.getPrototypeOf(student) === person); // true
```
- 여기서 우리는 `Object.setPrototypeof()`메서드를 사용하여 student의 프로토타입을 person으로 지정하였습니다.
- 이말은 곧 student는 상속을 통해 person의 프로퍼티와 메서드를 상속받게 됬다는 것입니다.
- student는 person의 모든 프로퍼티와 메서드에 접근이 가능하게 된 것입니다.
- 위의 예시에서 프로토타입 체인을 시각화해봅시다.
![image](https://user-images.githubusercontent.com/78008369/133735194-5251098b-f3a3-4e63-8fb5-b6d8f1d8d8e0.png)
- student의 프로토타입은 person이고, person의 프로토타입은 `Object`입니다. 그리고 `Object`의 프로토타입은 `null`입니다.
- 이것은 곧 student는 `Object`와 person의 프로퍼티들과 메서드들에 접근할 수 있을 것이라는 것을 의미합니다.
- 비슷하게 person역시 `Object`의 모든 프로퍼티와 메서드에 접근 할 수 있을 것 입니다.
  
### 객체 생성
- 프로토타입에 대하여 알아보았으니 프로토타입을 이용해서 우리 자신의 객체를 만드는 방법을 알아봅시다.
```js
function Student(name, age) {
  this.name = name;
  this.age = age;
}

Student.prototype.isTalkative = true;

Student.prototype.talk = function () {
  console.log("Talking...");
};

const john = new Student("John", 12);

console.log(john.age); // 12

john.talk(); // Talking...
```
- 위 예시에서 Student 함수는 객체를 만드는 생성자 함수(constructor function)입니다. 
- 관례적으로 생성자 함수는 일반함수와 구분하기 위하여 첫글자를 대문자로 적어줍니다.
- `this`키워드는 생성자 함수로 인해 만들어질 인스턴스를 가르킵니다.
- 화살표 함수의 경우 생성자 함수로서 사용될 수 없음을 기억해주십시오.
- `new`키워드는 생성자 함수로 객체를 생성할 때 사용합니다.
- `Object.create()` 메서드는 object literals로 부터 새로운 객체를 만들 때 사용됩니다.
- 예시를 통해 확인해봅시다.
```js
const person = {
  isHappy: true,
  introduce() {
    console.log(`Hi I'm ${this.name}`);
  },
};

const john = Object.create(person);

john.name = "John";

console.log(john.isHappy); // true
john.introduce(); // Hi I'm John

console.log(Object.getPrototypeOf(john) === person); // true
```
- `Object.create()` 메서드는 john의 프로토타입을 person 객체로 설정하였습니다.
- ES6에서 자바스크립트에서 클래스가 추가되었지만 자바스크립트가 클래스기반 언어임을 나타내는 것은 아닙니다. 단순히 문법적으로 바뀐 것일 뿐 여전히 프로토타입 기반의 상속을 사용하고 있습니다. 
  
### 결론
- 프로토타입은 객체이고 이 객체는 그것들의 부모 프로토타입과 함께 모든 재사용 가능한 프로퍼티들과 메서드를 포함하고 있습니다.
- 프로토타입 체인은 프로토타입들에 의해 연결된 체인입니다.
- 자바스크립트는 프로퍼티와 메서드를 찾을 때 프로퍼티 체인을 사용합니다.
- 프로토타입을 통한 상속은 프로토타입 체인을 통해 부모 객체의 프로퍼티와 메서드들을 재사용하게 해줍니다. 
