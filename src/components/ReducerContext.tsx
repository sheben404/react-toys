import React, { Reducer, useReducer } from 'react'
import { useContext } from 'react'

interface StateType {
  num: number
  color: string
}

interface ActionType {
  type: string
  payload?: any
}

const initialState = {
  num: 1,
  color: 'red',
}

const reducer = (state: any, action: ActionType) => {
  switch (action.type) {
    case 'INCREASE':
      return { ...state, num: state.num + 1 }
    case 'SETCOLOR':
      return { ...state, color: action.payload }
    default:
      return state
  }
}

// 如果要使用创建的上下文
// 需要通过 StateContext.Provider 最外层包装组件
// 并且需要显示的通过 <StateContext.Provider value={{xx:xx}}> 的方式传入 value
// 指定 context 要对外暴露的信息
const StateContext = React.createContext<{
  state: StateType
  dispatch: React.Dispatch<ActionType>
}>(initialState as any)

export function ReducerContext() {
  const [state, dispatch] = useReducer<Reducer<StateType, ActionType>>(reducer, initialState)

  return (
    // 在 value 中传入需要共享的数据和修改数据的方法
    <StateContext.Provider value={{ state, dispatch }}>
      <Father />
    </StateContext.Provider>
  )
}

function Father() {
  return (
    <div>
      <Child />
    </div>
  )
}

function Child() {
  const { state, dispatch } = useContext(StateContext)
  return (
    <>
      <div style={{ color: state.color }}>number from context: {state.num}</div>
      <button onClick={() => dispatch({ type: 'INCREASE' })}>add 1</button>
      <button onClick={() => dispatch({ type: 'SETCOLOR', payload: 'green' })}>set color green</button>
    </>
  )
}
