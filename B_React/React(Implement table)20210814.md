# **React** Table 구현

## 시도했던 것들

- `Mypage`에서 사용자는 사용자 본인이 기고 요청한 글들의 목록을 볼 수 있고, 수정, 삭제 버튼을 통하여 해당 글을 UD 요청 할 수 있다.
- 해당 `Table`은 사용자가 기고한 글의 수에 따라서 유동적으로 달라져야하므로 Table container의 height는 auto로 설정하고 min-height 속성을 주어 없어지는 것을 방지 하였다.
- html의 `table`, `th`, `tr`, `td` 태그가 있지만 기본으로 들어가있는 style이 너무 구려서 `ul`, `li`, `span` 태그로 구현하였다.
- 제목, 수정, 삭제, 현황 각각의 width를 flex-grow로 일괄적으로 설정하려 하였으나 contents의 길이에 따라서 통일이 되지않아 width를 하나하나 지정해주었다.

## 구현 코드

> `jsx`

```jsx
import React from 'react';
import { contributions } from '../../assets/datas/MyPageData/data';

function ContributionStatus() {
  return (
    <div className="contributionstatuscontainer">
      <div className="subjectwrapper">기고현황</div>
      <ul className="contributionstatustable">
        <li className="contributionstatuslist">
          <span className="tableheader first">제목</span>
          <span className="tableheader">수정</span>
          <span className="tableheader">삭제</span>
          <span className="tableheader last">현황</span>
        </li>
        {contributions.map(el => {
          return (
            <li className="contributionstatuslist">
              <span className="tablecontent first">
                {el.contribution_title.slice(0, 17)}
              </span>
              <span className="tablecontent"> 수정 </span>
              <span className="tablecontent"> 삭제</span>
              <span className="tablecontent last">{el.status}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContributionStatus;
```

## 추가적으로 구현해야 할 것

- 현재 contribution data의 길이가 0일 경우의 모습을 정의하지 못했으므로 이를 구현.(UI디자인에 맞게 해보자.)
- 수정 버튼을 누를 시 해당 글의 id를 `Link`태그의 `to`속성에 넣어주어서 해당 글의 수정화면으로 이동하게 만들어야한다.
- 수정, 삭제 버튼을 누를경우 현황이 해당 요청에 맞게 바뀌어야한다.
- 현황은 현재 상태코드 그자체를 보여주고 있는데 상태코드를 상태로 변환하는 작업을 해주어야한다.
