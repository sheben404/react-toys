import React from 'react';
import {appContext, createStore, connect} from './redux';
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
    <appContext.Provider value={store}>
      <div className="App">
        <Child1/>
        <Child2/>
        <Child3/>
      </div>
    </appContext.Provider>
  );
}

const Child1 = () => <section className={'child'}>child1<User/></section>;
const Child2 = () => <section className={'child'}>child2<UserModifier/></section>;
const Child3 = connect((state: any) => {
  return {group: state.group};
})(({group}) => <section className={'child'}>child3
  <div>Group:{group.name}</div>
</section>);

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
      <input
        value={user.name}
        onChange={onChange}
      />
    </div>
  );
};

const UserModifier = connectToUsers(_UserModifier);

export default App;
