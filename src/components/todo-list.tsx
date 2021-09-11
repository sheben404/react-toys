import React from 'react';
import {List} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {tabMap, TabTypes} from '../App';

const TodoList = ({activeTab, todos, onToggleFinished}: { activeTab: TabTypes, todos: any, onToggleFinished: any }) => {
  const onDelete = (e: any) => {
    e.stopPropagation();
    // 删除
  };

  return (
    <div className="list-wrap">
      {todos.length === 0 ? (
        activeTab === 'all'
          ? <p>暂无事项</p>
          : <p>暂无{tabMap[activeTab]}事项</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={todos}
          renderItem={({id, text, finished}: any, idx) => {
            return (
              <List.Item className={`list-item ${finished ? `list-item__finished` : null}`}>
                <div
                  onClick={() => onToggleFinished(id)}
                  className="list-item-wrap"
                >
                  <span className="list-item-text">{text}</span>
                  <DeleteOutlined onClick={onDelete}/>
                </div>
              </List.Item>
            );
          }}
        />
      )}
    </div>
  );
};

export default TodoList;
