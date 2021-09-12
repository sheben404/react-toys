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

type Url = '/api/todos' | '/api/toggle' | '/api/add'

// 正常情况下 箭头函数的泛型可以直接加：const foo = <T>(x: T) => x;
// 但是由于这是 tsx 文件，<> 会被认为是 tag
// 因此需要写成 <T extends unknown>

// 这里的泛型 T 被原封不动地交给了返回值 Promise，所以外部 axios 调用的时候传入泛型 Todos
// 就可以判定出返回值为 Promise
// TS 就可以推断出这个 promise 去 resolve 的 data 的类型是 Todos
const axios = <T extends unknown>(url: Url, payload?: any): Promise<T> | never => {
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
      todos.push(payload);
      break;
    default:
      throw new Error('Unknown API');
  }

  // 在函数的实现中我们把 data resolve 出去
  // 其他地方调用 axios api 时通过 .then(data => {...}) 获取 data
  return Promise.resolve(data as any);
};

export default axios;
