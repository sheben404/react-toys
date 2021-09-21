import {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Todo} from './store/todoReducer';
import {FilterType} from './store/filterReducer';
import {selectFilteredTodos, selectTodoNeeded} from './store/selectors';
import {addTodo, removeTodo, setFilter, toggleTodo} from './store/actionCreators';
import React from 'react';
import {Input, List, Radio, Spin} from 'antd';
import TodoItem from './components/TodoItem';

interface LoadingType {
  status: boolean;
  tip: string;
}

export interface StoreType {
  todos: Todo[],
  filter: FilterType,
  loading: LoadingType
}

const TodoApp: FC = () => {
  const todos = useSelector<StoreType, Todo[]>(selectFilteredTodos);
  const todoNeeded = useSelector<StoreType, number>(selectTodoNeeded);
  const dispatch = useDispatch();

  const [task, setTask] = useState<string>('');

  const onAddTodo = () => {
    dispatch(addTodo(task));
    setTask('');
  };

  const onToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const onRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  const onFilter = (filter: FilterType) => {
    dispatch(setFilter(filter));
  };

  const footer = (
    <div className="footer">
      {todoNeeded > 0 && <span className="todo-needed">
          还剩{todoNeeded}项 <span role="img" aria-label="Clap">🎉</span>
        </span>
      }

      <Radio.Group onChange={e => onFilter(e.target.value)}
                   size="small"
                   defaultValue="all"
                   buttonStyle="solid">
        <Radio.Button className="filter-item" value="all">全部</Radio.Button>
        <Radio.Button className="filter-item" value="done">已完成</Radio.Button>
        <Radio.Button className="filter-item" value="todo">待完成</Radio.Button>
      </Radio.Group>
    </div>
  );

  return (
    <div className="app">
      <h1>react-redux todos</h1>

      <Input size="large"
             placeholder="今天想干嘛"
             value={task}
             onChange={e => setTask(e.target.value)}
             onPressEnter={onAddTodo}
      />

      {/*<Spin spinning={loading.status} tip={loading.tip}>*/}
      <List
        className="todo-list"
        footer={footer}
        bordered
        dataSource={todos}
        renderItem={todo => (
          // <TodoItem onRemove={onRemoveTodo} onToggle={onToggleTodo} onSave={onUpdateTodo} todo={todo}/>
          <TodoItem onRemove={onRemoveTodo} onToggle={onToggleTodo} todo={todo}/>
        )}
      />
      {/*</Spin>*/}
    </div>
  );

};

export default TodoApp;
