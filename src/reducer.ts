export interface Todo {
  id: number,
  text: string,
  state: string
}

const initTodos: Todo[] = [
  {
    id: 1,
    text: '抽烟',
    state: 'done'
  },
  {
    id: 2,
    text: '喝酒',
    state: 'done'
  },
  {
    id: 3,
    text: '烫头',
    state: 'done'
  }
];

export type FilterType = 'all' | 'todo' | 'done'

const initFilter: FilterType = 'all';
const initState = {
  todos: initTodos,
  filter: initFilter
};

const reducer = (state = initState, action: any) => {
  switch (action.type) {
    case 'addTodo': {
      const newTodos = [...state.todos, action.payload];
      return {...state, todos: newTodos};
    }
    case 'removeTodo': {
      const newTodos = state.todos.filter(todo => todo.id !== action.payload);
      return {...state, todos: newTodos};
    }
    case 'toggleTodo': {
      const newTodos = state.todos.map(todo =>
        todo.id === action.payload
          ? {...todo, state: todo.state === 'todo' ? 'done' : 'todo'}
          : todo
      );
      return {...state, todos: newTodos};
    }
    case 'setFilter':
      return {...state, filter: action.payload};
    case 'reset':
      return initState;
    default:
      return state;
  }
};

export default reducer;
