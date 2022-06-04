import { useState } from 'react'

// 兄弟组件通信
// 通过状态提升通信
// 兄弟组件通过接受父组件传递的 props 来通信
function Father() {
  const [num, setNum] = useState(0)
  return (
    <>
      <Child1 num={num} setNum={setNum} />
      <Child2 num={num} setNum={setNum} />
    </>
  )
}

interface PropsType {
  num: number
  setNum: (param: number) => void
}

const Child1: React.FC<PropsType> = (props) => {
  const { num, setNum } = props
  return (
    <>
      <div>number from father: {num}</div>
      <div>
        change it from child1: <button onClick={() => setNum(num + 1)}>add 1</button>
      </div>
    </>
  )
}

const Child2: React.FC<PropsType> = (props) => {
  const { num, setNum } = props
  return (
    <>
      <div>number from father: {num}</div>
      <div>
        change it from child2: <button onClick={() => setNum(num + 1)}>add 1</button>
      </div>
    </>
  )
}

export function LiftingStateUp() {
  return <Father />
}
