let todos = [
  {
    id: 1,
    name: '待办1',
    done: false
  },
  {
    id: 2,
    name: '待办2',
    done: false
  },
  {
    id: 3,
    name: '待办3',
    done: false
  }
];

export enum Urls {
  TODOS = '/api/todos',
  TOGGLE = '/api/toggle',
  ADD = '/api/add'
}

type Todo = typeof todos[0]
type Todos = typeof todos

type Key<U> = U extends Urls.TOGGLE
  ? 'toggle'
  : U extends Urls.ADD
    ? 'add'
    : U extends Urls.TODOS
      ? 'todos'
      : 'other'

type Payload<U> = {
  toggle: number,
  add: Todo,
  todos: any,
  other: any
}[Key<U>]

type Result<U> = {
  toggle: boolean,
  add: boolean,
  todos: Todos,
  other: any
}[Key<U>]

type UrlNoPayload = Urls.TODOS
type UrlWithPayload = Exclude<Urls, UrlNoPayload>

function axios<U extends UrlNoPayload>(url: U): Promise<Result<U>>

function axios<U extends UrlWithPayload>(url: U, payload: Payload<U>): Promise<Result<U>> | never

function axios<U extends Urls>(
  url: U,
  payload?: Payload<U>
) {
  let data;
  switch (url) {
    case '/api/todos':
      data = todos.slice();
      break;
    case '/api/toggle':
      const todo = todos.find(({id}) => id === payload);
      // 这里修改todo，居然直接就把 todos 这个数组中的 id 等于目标 id 的项修改了
      // 因此 app.tsx 中重新获取到的 todos 已经是修改后的内容
      if (todo) {
        todo.done = !todo.done;
      }
      break;
    case '/api/add':
      todos.push(payload!);
      break;
    default:
      throw new Error('Unknown API');
  }

  // 在函数的实现中我们把 data resolve 出去
  // 其他地方调用 axios api 时通过 .then(data => {...}) 获取 data
  return Promise.resolve(data as any);
};

export default axios;
