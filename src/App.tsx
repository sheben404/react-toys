import React from 'react';
import {appContext, store, connect} from './redux';
import './App.css';


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
const Child3 = () => <section className={'child'}>child3</section>;

const User = connect(({state, dispatch}) => {
  return <div>User:{state.user.name}</div>;
});

const _UserModifier = ({dispatch, state, children}: any) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'updateUser', payload: {name: e.target.value}});
  };
  return (
    <div>
      {children}
      <input
        value={state.user.name}
        onChange={onChange}
      />
    </div>
  );
};

const UserModifier = connect(_UserModifier);

export default App;
