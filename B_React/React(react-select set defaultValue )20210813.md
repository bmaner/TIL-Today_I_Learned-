# **React**react-select module에 defaultValue 적용 시키기

## 시도했던 것들

- DB에 저장된 userdata를 서버에서 받아와 이를 state에 저장하고 react-select의 SELECT component의 defaultValue로 지정하는 작업이다.
- 아래의 코드와 같이 ageIdx, positionIdx를 선언만 한 후에 SELECT component를 만드는 data에 foreach로 접근하여 state에 저장된 value가 data의 몇번째 idx에 있는지 알아내어 이를 각각 ageIdx, positionIdx에 저장하고 이를 활용하여 defaultValue를 작성하였다.

> **SELECT component 생성을 위한 data의 형태**

```js
export const singleSelectData = [
  [
    [
      { value: '10대', label: '10대' },
      { value: '20대', label: '20대' },
      { value: '30대', label: '30대' },
      { value: '40대', label: '40대' },
      { value: '50대', label: '50대' },
      { value: '60대 이상', label: '60대 이상' },
    ],
    '나이',
  ],
  [
    [
      { value: '서버/백엔드', label: '서버/백엔드' },
      { value: '프론트엔드', label: '프론트엔드' },
      { value: '풀스택', label: '풀스택' },
      { value: '머신러닝/인공지능', label: '머신러닝/인공지능' },
      { value: '학생', label: '학생' },
      { value: '데이터분석', label: '데이터분석' },
      { value: 'Android', label: 'Android' },
      { value: 'IOS', label: 'IOS' },
      { value: '기타', label: '기타' },
    ],
    '직무',
  ],
];

export const multiSelectData = [
  [
    { value: 'C', label: 'C' },
    { value: 'C++', label: 'C++' },
    { value: 'C#', label: 'C#' },
    { value: 'Java', label: 'Java' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'SQL', label: 'SQL' },
    { value: 'PHP', label: 'PHP' },
    { value: '기타', label: '기타' },
  ],
  '언어',
];
```

> **idx를 가져오는 코드**

```jsx
let ageIdx;
let positionIdx;

singleSelectData[0][0].forEach((el, idx) => {
  if (el.value === Age) {
    ageIdx = idx;
  }
});
singleSelectData[1][0].forEach((el, idx) => {
  if (el.value === Position) {
    positionIdx = idx;
  }
});
singleSelectData[0][2] = ageIdx;
singleSelectData[1][2] = positionIdx;
```

> **defaultValue에 props로 전달하는 코드**

```jsx
<div className="singleselectwrapper">
  <div className="singleselectcontents">
    {singleSelectData.map((el, i) => {
      return (
        <SingleSelect
          key={i}
          options={el[0]}
          name={el[1]}
          defaultValue={el[0][el[2]]}
          // defaultValue={el[2]}
          selectInputHandler={selectInputHandler}
        />
      );
    })}
  </div>
</div>
```

- 결과는 `실패` `SingleSelect` component안에서 defaultValue를 `console.log()`로 찍어 보았다.
  > `2` SingleSelect.js:5 undefined
  > {value: "20대", label: "20대"}{value: "프론트엔드", label: "프론트엔드"}
- 처음 두 번 undefined가 뜨는 곳에서 힌트를 얻어서 Data를 바탕으로 map으로 `SELECT` component를 만드는 component에서 useEffect로 render 될 때 data를 저장하는 식으로 시도하였으나 이마저도 `실패`
- **그리하여 현재 component보다 상위 컴포넌트인 즉, 서버에서 data를 받아와 state로 저장하는 component에서 기본값이 false인 state를 만들고 dependency가 []인 useEffect(get으로 기존 user data를 가져오는 함수를 실행시킴)의 최하단에서 get함수가 끝나면 setState(true)로 state를 변경해줬고 이 state가 true 일때만 return문이 render되도록 만들었다. 결과는 `성공`**

## 내일 해봐야 할 것 & 마인드 셋

- Mypage 기고현황 구현 및 완성
- 매거진/기고글 view 화면 작업 착수
