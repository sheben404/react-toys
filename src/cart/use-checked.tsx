import {useCallback, useEffect, useReducer} from 'react';

interface Option {
  key?: string;
}

type CheckedMap = {
  [key: string]: boolean
}

const CHECKED_CHANGE = 'CHECKED_CHANGE';
const CHECKED_ALL_CHANGE = 'CHECKED_ALL_CHANGE';
const SET_CHECKED_MAP = 'SET_CHECKED_MAP';

type CheckedChange<T> = {
  type: typeof CHECKED_CHANGE
  payload: {
    dataItem: T
    checked: boolean
  }
}

type CheckedAllChange = {
  type: typeof CHECKED_ALL_CHANGE
  payload: boolean
}

type SetCheckedMap = {
  type: typeof SET_CHECKED_MAP
  payload: CheckedMap
}

type Action<T> = CheckedChange<T> | CheckedAllChange | SetCheckedMap

export type OnCheckedChange<T> = (item: T, checked: boolean) => any

export const useChecked = <T extends Record<string, any>>(
  dataSource: T[],
  {key = 'id'}: Option = {}
) => {
  const [checkedMap, dispatch] = useReducer(
    (checkedMapParam: CheckedMap, action: Action<T>) => {
      switch (action.type) {
        case 'CHECKED_CHANGE': {
          const {payload} = action;
          const {dataItem, checked} = payload;
          // 下面的 key 实际上是字符串 'id'
          // 因此下面的写法等同于 const {['id']: id} = dataItem;
          // 即取出 dataItem 键名为 'id' 的值并把它赋值给 id
          // 即 id = dataItem.id
          const {[key]: id} = dataItem;
          return {
            ...checkedMapParam,
            [id]: checked
          };
        }
        case 'CHECKED_ALL_CHANGE':
          const {payload: newCheckedAll} = action;
          const newCheckedMap: CheckedMap = {};
          if (newCheckedAll) {
            dataSource.forEach(dataItem => {
              newCheckedMap[dataItem.id] = true;
            });
          }
          return newCheckedMap;
        case 'SET_CHECKED_MAP':
          return action.payload;
        default:
          return checkedMapParam;
      }
    }, {}
  );

  const onCheckedChange: OnCheckedChange<T> = useCallback(
    (dataItem, checked) => {
      dispatch({
        type: CHECKED_CHANGE,
        payload: {
          dataItem,
          checked
        }
      });
    }, []
  );

  type FilterCheckedFunc = (item: T) => boolean

  const filterChecked = useCallback(
    // 这里这个函数参数用于自定义过滤逻辑
    // 右面的 = () => true 是在传递默认参数
    (func: FilterCheckedFunc = () => true) => {
      return (
        Object.entries(checkedMap)
          .filter(entries => Boolean(entries[1])) // 这一步只会取 entries 中  entries[1] 的 bool 值为 true 的数组

          // 在这一步中可以获取到 checkId，不过由于它是 ckeckedMap 的键，因此是个字符串
          // 这里用到的语法是 const arr = ['1',true];const [ checkedId ] = arr; checkedId = '1'
          .map(([checkedId]) =>
            dataSource.find(({[key]: id}) => id === Number(checkedId)),
          )
          .filter(func as any) as T[]
      );
    }, [checkedMap, dataSource, key]
  );

  const checkedAll =
    dataSource.length !== 0 && filterChecked().length === dataSource.length;

  const onCheckedAllChange = (newCheckedAll: boolean) => {
    dispatch({
      type: CHECKED_ALL_CHANGE,
      payload: newCheckedAll
    });
  };

  useEffect(() => {
    filterChecked().forEach((chechedItem) => {
      let changed = false;
      if (!dataSource.find(dataItem => chechedItem.id === dataItem.id)) {
        delete checkedMap[chechedItem.id];
        changed = true;
      }
      if (changed) {
        dispatch({
          type: SET_CHECKED_MAP,
          payload: Object.assign({}, checkedMap)
        });
      }
    });
  }, [dataSource]);

  return {
    checkedMap,
    dispatch,
    onCheckedChange,
    onCheckedAllChange,
    filterChecked,
    checkedAll
  };
};
