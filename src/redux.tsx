import React, {useContext, useEffect, useState} from 'react';

export const appContext = React.createContext<any>(null);

export const store: any = {
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

export const connect = (selector?: any) => (Component: React.FC<any>) => {
  return (props: any) => {
    const {state, setState} = useContext(appContext);
    const [, update] = useState({});
    const data = selector ? selector(state) : {state: state};
    useEffect(() => {
      store.subscribe(() => {
        update({});
      });
    }, []);
    const dispatch = (action: any) => {
      setState(reducer(state, action));
    };
    return <Component {...props} {...data} dispatch={dispatch}/>;
  };
};
