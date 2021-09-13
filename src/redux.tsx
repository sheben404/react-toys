import React, {useContext, useEffect, useState} from 'react';

export const appContext = React.createContext<any>(null);

const store: any = {
  state: undefined,
  reducer: undefined,
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

export const createStore = (reducer: any, initState: any) => {
  store.state = initState;
  store.reducer = reducer;
  return store
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
    const dispatch = (action: any) => {
      setState(store.reducer(state, action));
    };
    const {state, setState} = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(state) : {state: state};
    const dispatchers = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch};
    useEffect(() => {
      const unSubscribe = store.subscribe(() => {
        const newData = selector ? selector(store.state) : {state: store.state};
        if (changed(data, newData)) {
          console.log('update');
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
