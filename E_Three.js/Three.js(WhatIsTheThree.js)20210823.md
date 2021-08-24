# What Is the Three.js?

## Basic Definition

- Three.js는 웹페이지에 3D 객체를 쉽게 렌더링하도록 도와주는 자바스크립트 3D 라이브러리
- Three.js는 3D 객체를 렌더링하는 데 WEBGL을 사용
- WEBGL은 점, 선, 삼각형만을 그리는 단순한 시스템으로 무언가를 구현하려면 많은 양의 코드가 필요한데, 이를 쉽게 해주는 것이 Three.js(쉽게 말하자면 WEBGL은 3차원을 canvas에 그려주는 도구)
- **WEBGL로 정육면체 만드는 코드와 three.js로 만드는 코드를 비교 필요**
  > 이런...저는 WEBGL로는 뭔가 만들 상상을 못하겠네요..
- `Mesh`는 `Material`로 하나의 `Geometry`를 그리는 객체
- `Geometry`란 기하학 객체의 정점 데이터인데 물체의 형태
- `Material`은 표면 속성인데 쉽게 재질이라고 생각하면 될 듯. Texture로 표면을 이미지로 wrapping 할 수 있다.

## Basic Code

> 아래는 움직이는 정육면체를 render하는 Three.js의 코드이다.

---

```js
function main() {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({ canvas });
  // renderer : 입력한 데이터를 실제 canvas에 그려는 역할이고 renderer에는 여러가지 종류가 있다.

  const fov = 75; // field of view(시야각)
  const aspect = 2; // canvas 가로,세로 비율
  const near = 0.1;
  const far = 5; // near, far는 카메라 앞에 렌더링되는 공간 범위를 지정하는 요소
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //camera는 3d scene의 일부를 2차원 이미지로 rendering하는 역할
  camera.position.z = 2; // 카메라를 뒤로 움직이는 코드

  const scene = new THREE.Scene(); //화면에 렌더링하기 위에서는 scene에 추가를 해야만 한다.

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  //직선 빛을 추가 직사광선이라고 생각하면 되는가?, three에는 여러종류의 광원이 있다고 한다.

  const geometry = new THREE.BoxGeometry(1, 1, 1); // 물체의 형태에 해당하는 geometry 생성
  const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  // const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 }); // 표면 속성(색 지정) BasicMaterial은 광원에 반응 X 그림자가 지게하려면 PhongMaterial을 사용해야함
  const cube = new THREE.Mesh(geometry, material); //mesh는 geometry, material, 위치, 방향, 크기 등의 정보를 담은 객체이다.

  scene.add(cube); //박스를 scene에 넣어주고

  function render(time) {
    //애니메이션 구현 함수
    time *= 0.001; // ms => seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render); //브라우저에 애니메이션 프레임을 요청하는 함수(1초에 60프레임을 목표로 한다.)
  }
  requestAnimationFrame(render); //재귀의 형태로
}

main();
```

---

## 알게 된 점

- React에서 Three.js를 먼저 접하였던지라 Three.js에 대한 기초지식이 부족했었는데,
- 특히 그림자에 관한 부분을 한번도 들어본 적이 없었다.
- `MeshBasicMaterial` 광원에 반응을 하지 않아서 그림자가 생기지 않는다.
- `MeshPhongMaterial` 사용해야 그림자에 반응한다. (phong은 사람이라는 것도 처음 알았다. )
- 내일은 같은 코드를 react-three-fiber로 옮겨봄과 동시에 three.js tutorial을 읽으면서 지식을 추가로 얻어보겠다.
