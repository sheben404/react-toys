import React, {useContext, useEffect, useState} from 'react';

export const appContext = React.createContext<any>(null);

let state: any = undefined;
let reducer: any = undefined;
let listeners: any = [];
const setState = (newState: any) => {
  state = newState;
  listeners.map((fn: any) => fn(state));
};

const store: any = {
  getState() {
    return state;
  },
  dispatch(action: any) {
    setState(reducer(state, action));
  },
  subscribe(fn: any) {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      listeners.splice(index, 1);
    };
  }
};

const dispatch = store.dispatch;

export const createStore = (_reducer: any, initState: any) => {
  state = initState;
  reducer = _reducer;
  return store;
};

const changed = (oldState: any, newState: any) => {
  let changed = false;
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true;
    }
  }
  return changed;
};

export const connect = (selector?: any, mapDispatchToProps?: any) => (Component: React.FC<any>) => {
  return (props: any) => {

    const [, update] = useState({});
    const data = selector ? selector(state) : {state: state};
    const dispatchers = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch};
    useEffect(() => {
      const unSubscribe = store.subscribe(() => {
        const newData = selector ? selector(state) : {state: state};
        if (changed(data, newData)) {
          update({});
        }
      });
      // 这里最好加一个取消订阅，否则在 selector 变化时会出现重复订阅
      // unSubscribe 这个函数只用到了一次，因此可以省略函数名，直接 return store.subscribe
      // 不过那么写不易理解，因此不做那个改动了
      return unSubscribe;
    }, [selector]);
    return <Component {...props} {...data} {...dispatchers}/>;
  };
};

export const Provider = ({store, children}: any) => {
  return (
    <appContext.Provider value={store}>
      <div className="App">
        {children}
      </div>
    </appContext.Provider>
  );
};
