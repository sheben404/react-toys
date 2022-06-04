import { useState } from 'react'

// 父子组件通信
// 父组件通过 props 的形式向子组件传递数据和方法
// 子组件通过函数参数的形式向父组件传递参数
function Father() {
  const [num, setNum] = useState(0)
  return (
    <>
      <div>number from father: {num}</div>
      <div>
        change it from father: <button onClick={() => setNum(num + 1)}>add 1</button>
      </div>
      <Child num={num} setNum={setNum} />
    </>
  )
}

interface PropsType {
  num: number
  setNum: (param: number) => void
}

const Child: React.FC<PropsType> = (props) => {
  const { num, setNum } = props
  return (
    <>
      <div>number from father: {num}</div>
      <div>
        change it from child: <button onClick={() => setNum(num + 1)}>add 1</button>
      </div>
    </>
  )
}

export function Props() {
  return <Father />
}
