import {useEffect, useState} from 'react';

export const useRequest = (fn: any, dependencies: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = () => {
    let cancel = false;
    setLoading(true);
    fn()
      .then((res: any) => {
        if (!cancel) {
          setData(res);
        } else {
          const {tab} = res;
          console.log(`resquest with ${tab} canceled`);
        }
      })
      .catch(() => {
        if (!cancel) {
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {cancel = true;};
  };

  useEffect(() => {
    const cancelRequest = request();
    return () => {cancelRequest();};
  }, dependencies);

  return {data, setData, loading, request, error};
};
