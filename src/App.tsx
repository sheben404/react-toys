import React, {useContext, useState} from 'react';
import './App.css';

const appContext = React.createContext<any>(null);

function App() {
  const [appState, setAppState] = useState({
    user: {name: 'sheben', age: 20}
  });
  const contextValue = {appState, setAppState};
  return (
    <appContext.Provider value={contextValue}>
      <div className="App">
        <Child1/>
        <Child2/>
        <Child3/>
      </div>
    </appContext.Provider>
  );
}

const Child1 = () => <section className={'child'}>child1<User/></section>;
const Child2 = () => <section className={'child'}>child2<Wrapper/></section>;
const Child3 = () => <section className={'child'}>child3</section>;

const User = () => {
  const contextValue = useContext(appContext);
  return <div>User:{contextValue.appState!.user!.name}</div>;
};

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

const Wrapper = () => {
  const {appState, setAppState} = useContext(appContext);
  const dispatch = (action: any) => {
    setAppState(reducer(appState, action));
  };
  return <UserModifier state={appState} dispatch={dispatch}/>;
};

const UserModifier = ({dispatch, state}: { dispatch: any, state: any }) => {

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type: 'updateUser', payload: {name: e.target.value}});
  };
  return (
    <div>
      <input
        value={state.user.name}
        onChange={onChange}
      />
    </div>
  );
};

export default App;
