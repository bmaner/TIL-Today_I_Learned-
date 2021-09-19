## 왜 state를 직접 수정하지 말아야하는가?

모든 사람들이 `state`를 절대로 직접 바꾸지 말고 언제나 `setState`를 호출하라고 합니다.  
  
하지만 왜 그렇게 말하는 것일까요?  
  
벌써 시도해보셨다면 아마 아무런 나쁜일이 생기지 않는다는 것을 눈치채셨을겁니다.   
만약 `state`를 직접 수정하고 `this.setState({})` 혹은 `this.forceUpdate()`를 호출한다면 모든것이 괜찮아 보일겁니다.   
```jsx
this.state.cart.push(item.id);
this.setState({ cart: this.state.cart });
// renders like normal! maybe?
```
두가지 이유에 있어서 이것은 나쁜 생각입니다. (이것이 실제로 해당 예시에서 그리고 다른 상황에서 작동이 하더라도 말입니다.)  
(`this.state.something = x` 그리고 `this.state = x` 이러한 것들 또한 피해야합니다.)  
`state`를 직접 바꾸는 것은 버그와 최적화하기 어려운 components를 만들어 낼 수 있습니다. 여기에 예시가 있습니다.   
알고 계실 수도 있습니다만, React에서 최적화된 component를 만드는 일반적인 방법은 component를 순수하게 만드는 것입니다.  
component를 순수하게 만들면 부모 component가 리렌더링 될때마다 다시 리렌더링 되지않고 props가 바뀔때에만 리렌더링이 일어나게 만들 수 있습니다.  
이것들은 `React.Component`가 아닌 `React.PureComponent`를 사용하거나 `shouldComponentUpdate` 라이프사이클 메서드를 구현하여 nextProps와 현재 props를 비교함으로 가능합니다.  
props를 비교하여 같다면 render를 스킵하고 시간을 절약하는 것입니다.   

여기에 아이템들의 목록을 렌더하는 간단한 component가 있습니다.(React.PureComponent에서 상속받은 점을 주목해주십시오.)  
```jsx
class ItemList extends React.PureComponent {
  render() {
    return (
      <ul>
        {this.props.items.map(item => <li key={item.id}>{item.value}</li>)}
      </ul>
    );
  }
}
```
당신으로 하여금 목록에 아이템을 좋은 방법, 나쁜 방법으로 추가하게하고 `ItemList` component를 렌더하는 앱이있습니다. 무슨일이 일어나는지 보십시오!  
```jsx
class App extends Component {
  // Initialize items to an empty array
  state = {
    items: []
  };

  // Initialize a counter that will increment
  // for each item ID
  nextItemId = 0;

  makeItem() {
    // Create a new ID and use
    // a random number as the value
    return {
      id: this.nextItemId++,
      value: Math.random()
    };
  }

  // The Right Way:
  // copy the existing items and add a new one
  addItemImmutably = () => {
    this.setState({
      items: [...this.state.items, this.makeItem()]
    });
  };

  // The Wrong Way:
  // mutate items and set it back
  addItemMutably = () => {
    this.state.items.push(this.makeItem());
    this.setState({ items: this.state.items });
  };

  render() {
    return (
      <div>
        <button onClick={this.addItemImmutably}>
          Add item immutably (good)
        </button>
        <button onClick={this.addItemMutably}>Add item mutably (bad)</button>
        <ItemList items={this.state.items} />
      </div>
    );
  }
}
```
시도해보세요!   
immutable Add 버튼을 몇번 누르고 목록이 어떻게 예상대로 업데이트 되는지 보십시오.   
그리고 mutable Add 버튼을 클릭하고 state는 바뀌더라도 새 아이템들이 목록에 나타나지 않는지 보십시오.   
마지막으로 immutable Add 버튼을 다시 누르고 어떻게 `ItemList`가 mutable Add 버튼을 통해 추가해놓은 아이템들을 리렌더하는지 보십시오.  
  
> 실제로 시도를 해보시고 싶다면 아래 링크로 접속하셔서 보라색 버튼을 누름으로 확인가능하십니다!
> 출처 : https://daveceddia.com/why-not-modify-react-state-directly/

`ItemList` component가 순수하기 때문에 그리고 새로운 아이템을 state인 items 배열에 push하여도 기존의 배열을 대체하지 않기 때문에 이런 일이 발생하게 됩니다.   
`ItemList` component가 리렌더 요청을 받으면 props가 바뀌지 않았음을 알고 리렌더하지 않게 되는 것입니다.   
  
### 결론
state를 직접 수정한다면 최적화된 component들은 리렌더 되지 않을 것이고 이 bug들은 추적하기 어려울 것입니다.   
(state의 변화가 화면에 반영이 안될 것이라는 의미입니다. )   
대신에 우리가 위의 예시에서 했던 것 처럼 spread operator를 사용하여 새로운 객체나 배열을 만든 후 setState를 호출하십시오.  
  
출처 : https://daveceddia.com/why-not-modify-react-state-directly/
