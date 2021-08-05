# p5.js gif 불러와 pixel 조작하기

## 시도했던 것들

- p5.js 공식 홈페이지에서 동영상 집어넣는 것. `실패`
- 동영상 및 사진을 업로드 할 수 있는 기능 자체가 없었다.
- 이전에 있었던 기능이 사라진 듯 하다.
- loadImage, createImg 메소드에 gif파일을 적용하여 불러오기 `성공`
- createVideo, createCapture를 했었던 기억에 의존하여 createImg를 하여 img 태그를 생성해서 canvas에 옮기기를 시도.
- createCapture 때에는 video 태그에서 실시간 변동사항을 불러오던 canvas가 createImg에서는 처음 화면만을 render하는 것을 확인 할 수 있었음.
- 일반 사진을 render하는 방법으로 시도(loadImage)
- 해당 링크를 참조하였음. https://youtu.be/me04ZrTJqWA
- gif가 재생되는 상태로 픽셀을 조작할 수 있는 코드는 아래를 참고

```jsx
import './App.css';
import Sketch from 'react-p5';

function App() {
  let img;
  let x = 0;

  const setup = (p5, parent) => {
    p5.createCanvas(1000, 1000).parent(parent);
    img = p5.loadImage(
      'https://media3.giphy.com/media/h4lMaDPaaNzqAcnaPm/giphy.gif?cid=ecf05e47lg7cndes3xfbrycf8halzhfsyqt6zdamwpu2qtdo&rid=giphy.gif&ct=g'
    );
  };
  const draw = p5 => {
    p5.image(img, 480, 0, 700, 700);
    for (let x = 0; x < p5.width; x += 10) {
      for (let y = 0; y < p5.height; y += 10) {
        let c = img.get(x, y);
        // c는 이미지 픽셀의 색상정보를 포함하는 배열이다.
        // 픽셀의 rgb 각각의 값을 더하여 평균을 구하면 흑백이 된다.
        let colAverage = c[0] + c[1] + c[2] / 3;
        // p5.stroke(p5.color(c));
        p5.stroke(p5.color([colAverage, colAverage, colAverage, 255]));
        p5.strokeWeight(p5.random(20));
        // p5.strokeWeight(15);
        p5.point(x, y);
        ///위에 세줄 주석 하고 아래 주석 풀면 사각형 효과
        // p5.fill(p5.color(c));
        // p5.rect(x, y, 10, 5);
        // p5.noStroke();
      }
    }
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default App;
```

## 발견한 점

- 위의 코드를 실행하니 픽셀을 조작할 수 있었으나, `p5.image(img, 480, 0, 700, 700);` 여기서 `480`을 x로 바꾸어(x++하며) gif를 이동하게 하였더니 pixel이 조작되는 부분과 별도로 변형되지 않은 또 하나의 gif가 튀어나옴을 발견
- 조작되는 부분의 크기는 변형할 수가 없었으나 변형되지 않는 부분의 크기와 위치는 변경이 가능했다.
- `p5.strokeWeight(p5.random(20));`에서 `p5.random(20)`으로 지정하면 지글지글하는 효과를 줄 수 있고, 단일 값으로 주면 점으로 표현되는 느낌을 얻을 수 있다.
- `let c = img.get(x, y);`이중 반복문 안에서 img.get으로 pixel에 접근할 수 있으며 c를 console.log하면 array가 나오고 array 각각의 요소는 픽셀의 rgba값에 해당하는 것을 알 수 있다.
- c값을 조작하여 이를 p5.color()안에 넣어주면 pixel의 색을 조작 할 수 있다.

## 결과

- 애초에 이런 효과를 넣어서 landing page에 넣어보자고 계획하였기에 목표를 잡고 실행하였으나 사용자의 마음을 사로잡는 효과는 아닌것같다라고 나와 팀원들 모두 공감하였다.
- 다소 아쉬운 마음이 있지만 지난 3일간 많은 공부를 하였기에 후회는 없다.
