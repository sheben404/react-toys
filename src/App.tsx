import React, {useState, useEffect} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import axios, {Urls} from './api/axios';

type Todo = {
  id: number,
  name: string,
  done: boolean
}

type Todos = Todo[]

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos>([]);

  const refreshTodos = () => {
    // 这里传入泛型 <Todos> 声明 axios 返回的数据类型
    axios(Urls.TODOS).then(setTodos);
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const onToggleTodo = async (todo: Todo) => {
    await axios(Urls.TOGGLE, todo.id);
    refreshTodos();
  };

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <TodoForm refreshTodos={refreshTodos}/>
          {
            todos.map((todo, index) => (
              <li
                key={index}
                className={todo.done ? 'done' : undefined}
                onClick={() => onToggleTodo(todo)}
              >
                {todo.name}
              </li>
            ))
          }
        </ul>
      </header>
    </div>
  );
};

export default App;
