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

## JavaScript와 Nodejs가 어떻게 다른 것인지 설명해주세요.

자바스크립트는 스크립트 언어로써 동적으로 컨텐츠를 바꾸고, 멀티미디어를 다루는 등 다양한 일을 하기 위해 웹에서 사용되었고 웹브라우저가 없으면 사용할 수 없는 단점이 있습니다.  

웹에서 사용될 수 있었던 이유는 웹브라우저가 자바스크립트를 실행시킬 수 있는 엔진 실행환경을 구축했었기 때문입니다.

예를 들면 크롬에는 V8이라는 엔진이 있는 것 처럼 말이죠. 

NodeJS는 V8과 libuv를 바탕으로 만들어졌으며 터미널과 같이 웹 이외의 환경에서도 작동되기위해 그리고 다양한 용도로 확장되어 사용되기 위해 만들어진 자바스크립트 런타임입니다. 


## JavaScript에서 event loop란 무엇인가요?

event loop는 callstack과 task queue를 주시하며
callstack이 비어있다면 task queue의 가장 오래된(첫번째) 메세지를
callstack에 넣어주어서 메세지(콜백함수)가 실행되게 하는 것.(즉 콜백함수가 호출되게 하는 것)
(콜백함수가 호출되면 값을 반환하고 스택을 비우게 된다.)

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
**화살표 함수는 lexical this를 따른다. => 이게 무슨 말인지 추가 조사 필요**
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
---
> 오늘 다루지 못한 부분은 내일 정리 하도록하겠다. 
Modules
Symbol Type
Iterators
Generators
Map/Set & WeakMap/WeakSet
Typed Arrays
New Built-In Methods
Promises
Meta-Programming
Internationalization & Localization
```
