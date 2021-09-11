import React, {useEffect, useState} from 'react';
import {Input, Spin, Tabs} from 'antd';
import {fetchTodos, toggleTodo} from './utils/api';
import {useRequest} from './utils/useRequest';
import TodoList from './components/todo-list';
import {useWithLoading} from './utils/useWithLoading';

import 'antd/dist/antd.css';
import './styles/reset.css';
import './styles/styles.css';
import TodoInput from './components/todo-input';


const TAB_ALL = 'all';
const TAB_FINISHED = 'finished';
const TAB_UNFINISHED = 'unfinished';

export const tabMap = {
  [TAB_ALL]: '全部',
  [TAB_FINISHED]: '已完成',
  [TAB_UNFINISHED]: '未完成'
};

export type TabTypes = 'all' | 'finished' | 'unfinished'

function App() {
  const [activeTab, setActiveTab] = useState<TabTypes | string>(TAB_ALL);
  const [query, setQuery] = useState('');

  // 获取数据
  let todos = [];
  const {data, loading: listLoading}: { data: any, loading: boolean } = useRequest(() => {
    return fetchTodos({query, tab: activeTab});
  }, [query, activeTab]);


  if (data && data.result) {
    todos = data.result;
  }

  // placeHolder
  const [placeholder, setPlaceholder] = useState('');
  useEffect(() => {
    setPlaceholder(`在${tabMap[(activeTab as TabTypes)]}内搜索`);
  }, [activeTab]);

  // 完成todo逻辑
  const {func: onToggleFinished, loading: toggleLoading} = useWithLoading(
    async (id: number) => {
      await toggleTodo(id);
    }
  );

  const loading = !!listLoading || !!toggleLoading;

  return (
    <div className={'App'}>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab={tabMap[TAB_ALL]} key={TAB_ALL}/>
        <Tabs.TabPane tab={tabMap[TAB_FINISHED]} key={TAB_FINISHED}/>
        <Tabs.TabPane tab={tabMap[TAB_UNFINISHED]} key={TAB_UNFINISHED}/>
      </Tabs>
      <div className="app-wrap">
        <h1 className="app-title">Tasks List</h1>
        <TodoInput placeholder={placeholder} onSetQuery={setQuery} />
        <Spin spinning={loading} tip={'稍等片刻'}>
          <TodoList activeTab={(activeTab as TabTypes)} todos={todos} onToggleFinished={onToggleFinished}/>
        </Spin>
      </div>
    </div>
  );
}

export default App;
