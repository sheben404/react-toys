import {Todo} from '../store/todos/reducer';
import {FC, useState} from 'react';
import {Checkbox, Input, List} from 'antd';
import React from 'react';
import classNames from 'classnames';
import {CloseOutlined} from '@ant-design/icons';

interface TodoItemProps {
  todo: Todo,
  onToggle: (id: number) => void
  onRemove: (id: number) => void
  onSave?: (id: number, text: string) => void
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const {todo, onToggle, onRemove, onSave} = props;

  // const [updating, setUpdating] = useState<boolean>(false);
  const [text, setText] = useState<string>(todo.text);

  const onPressEnter = async () => {
    // await onSave(todo.id, text);
    // setUpdating(false);
  };

  // const input = (
  //   <Input
  //     value={text}
  //     onChange={e => setText(e.target.value)}
  //     autoFocus
  //     onPressEnter={onPressEnter}
  //     onBlur={() => setUpdating(false)}
  //   />
  // );

  const task = (
    <span className={classNames('todo-text', {'done': todo.state === 'done'})}>
      {todo.text}
    </span>
  );

  return (
    <List.Item
      className={'todo-item'}
      // onDoubleClick={() => setUpdating(true)}
    >
      <span className="todo-left">
        <Checkbox
          className={'todo-check'}
          checked={todo.state === 'done'}
          onChange={() => onToggle(todo.id)}
        />
        {task}
        {/*{updating ? input : task}*/}
      </span>
      <span className="todo-right" onClick={() => onRemove(todo.id)}>
        <CloseOutlined/>
      </span>
    </List.Item>
  );
};

export default React.memo(TodoItem);
