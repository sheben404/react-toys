import React from 'react';
import {createStore, connect, Provider} from './redux';
import './App.css';
import {connectToUsers} from './connectors/connectToUsers';

const initState = {
  user: {name: '社本', age: 20},
  group: {name: '前端组'}
};

const reducer = (state: any, {type, payload}: any) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    };
  } else {
    return state;
  }
};

const store = createStore(reducer, initState);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Child1/>
        <Child2/>
        <Child3/>
        <Child4/>
      </div>
    </Provider>
  );
}

const Child1 = () => <section className={'child'}>child1<User/></section>;
const Child2 = () => <section className={'child'}>child2<UserModifier/></section>;
const Child3 = connect((state: any) => {
  return {group: state.group};
})(({group}) => <section className={'child'}>child3
  <div>Group:{group.name}</div>
</section>);
const Child4 = () => <section className={'child'}>child4<AsynUserModifier/></section>;

const User = connectToUsers(({user}) => {
  return <div>User:{user.name}</div>;
});

const _UserModifier = ({updateUser, user, children}: any) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({name: e.target.value});
  };
  return (
    <div>
      {children}
      输入直接更新：<input
      value={user.name}
      onChange={onChange}
    />
    </div>
  );
};

const UserModifier = connectToUsers(_UserModifier);

const ajax = (url: string) => {
  if (url === '/user') {
    return new Promise(((resolve, reject) => {
      setTimeout(() => {
        resolve({name: '异步更新获取的社本本本', age: 10});
      }, 1000);
    }));
  }
};

// const fetchUser = (dispatch: any) => {
//   ajax('/user')!.then((response: any) => {
//     dispatch({type: 'updateUser', payload: response});
//   });
// };

const fetchUserPromise = () => {
  return ajax('/user')!.then(res => res);
};

const _AsynUserModifier = ({dispatch, state, children}: any) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // dispatch(fetchUser);
      dispatch({type: 'updateUser', payload: fetchUserPromise()});
    }
  ;
  return (
    <div>
      <div>User: {state.user.name}</div>
      <button onClick={onClick}>异步获取 user(1 秒后更新)</button>
    </div>
  );
};

const AsynUserModifier = connect(null, null)(_AsynUserModifier);

export default App;
