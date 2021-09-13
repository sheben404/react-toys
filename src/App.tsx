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
const Child3 = connect((state: any) => {
  return {group: state.group};
})(({group}) => <section className={'child'}>child3
  <div>Group:{group.name}</div>
</section>);

const User = connect((state: any) => {
  return {user: state.user};
})
(({user}) => {
  return <div>User:{user.name}</div>;
});

const _UserModifier = ({updateUser, state, children}: any) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({name: e.target.value});
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

const UserModifier = connect(null, (dispatch: any) => {
  return {
    updateUser: (attrs: any) => dispatch({type: 'updateUser', payload: attrs})
  };
})(_UserModifier);

export default App;
