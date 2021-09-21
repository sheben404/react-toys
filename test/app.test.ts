import {Todo} from '../src/store/todos/reducer';
import store from '../src/store/store';

it('可以添加一条 todo', () => {
  const newTodo: Todo = {
    id: 99,
    text: '吃饭',
    state: 'todo'
  }
  store.dispatch({type: 'addTodo', payload: newTodo})
  const todos = store.getState().todos
  expect(todos[todos.length - 1]).toEqual(newTodo)
})

it('可以完成一条 todo', () => {
  const toggleId = 99
  store.dispatch({type: 'toggleTodo', payload: toggleId})
  const todos = store.getState().todos
  expect(todos[todos.length - 1].state).toEqual('done')
})

it('可以删除一条 todo', () => {
  const delId = 99
  store.dispatch({type: 'removeTodo', payload: delId})
  const todos = store.getState().todos
  expect(todos.length).toEqual(3)
})
