import React, {Component, useContext, useEffect, useState} from 'react';
import './App.css';

const appContext = React.createContext<any>(null);

const store: any = {
  state: {
    user: {name: 'sheben', age: 20}
  },
  setState(newState: any) {
    store.state = newState;
    store.listeners.map((fn: any) => fn(store.state));
  },
  listeners: [],
  subscribe(fn: any) {
    store.listeners.push(fn);
    return () => {
      const index = store.listeners.indexOf(fn);
      store.listeners.splice(index, 1);
    };
  }
};

const connect = (Component: React.FC<any>) => {
  return (props: any) => {
    const {state, setState} = useContext(appContext);
    const [, update] = useState({});
    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);
    const dispatch = (action: any) => {
      setState(reducer(state, action));
    };
    return <Component {...props} state={state} dispatch={dispatch}/>;
  };
};

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

const reducer = (state: any, {type, payload}: { type: string, payload: any }) => {
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
