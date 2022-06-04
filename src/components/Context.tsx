import React, { useState } from 'react'
import { useContext } from 'react'

const initialState = {
  num: 1,
  setNum: () => null,
  color: 'red',
  setColor: () => null,
}

interface ContextType {
  num: number
  setNum: (param: number) => void
  color: string
  setColor: (param: string) => void
}

// 如果要使用创建的上下文
// 需要通过 StateContext.Provider 最外层包装组件
// 并且需要显示的通过 <StateContext.Provider value={{xx:xx}}> 的方式传入 value
// 指定 context 要对外暴露的信息
const StateContext = React.createContext<ContextType>(initialState)

export function Context() {
  const [num, setNum] = useState<number>(0)
  const [color, setColor] = useState<string>('red')
  return (
    // 在 value 中传入需要共享的数据和修改数据的方法
    <StateContext.Provider value={{ num, setNum, color, setColor }}>
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
  const state = useContext(StateContext)
  return (
    <>
      <div style={{ color: state.color }}>number from context: {state.num}</div>
      <button onClick={() => state.setNum(state.num + 1)}>add 1</button>
      <button onClick={() => state.setColor('green')}>set color green</button>
    </>
  )
}
