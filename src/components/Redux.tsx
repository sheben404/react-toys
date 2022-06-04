import { useEffect, useState } from 'react'
import { createStore } from 'redux'

interface StateType {
  num: number
}

interface ActionType {
  type: string
  payload?: any
}

const initailState: StateType = {
  num: 1,
}

function counterReducer(state = initailState, action: ActionType) {
  switch (action.type) {
    case 'counter/incremented':
      return { num: state.num + 1 }
    case 'counter/decremented':
      return { num: state.num - 1 }
    default:
      return state
  }
}

const store = createStore(counterReducer)

function Father() {
  return (
    <>
      <Child />
    </>
  )
}

const Child = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    store.subscribe(() => console.log(store.getState()))
    setState(store.getState())
  }, [])

  const add = () => {
    store.dispatch({ type: 'counter/incremented' })
    setState(store.getState())
  }

  const minus = () => {
    store.dispatch({ type: 'counter/decremented' })
    setState(store.getState())
  }

  return (
    <>
      <div>{state ? state.num : null}</div>
      <button onClick={add}>add</button>
      <button onClick={minus}>minus</button>
    </>
  )
}

export function Redux() {
  return <Father />
}
