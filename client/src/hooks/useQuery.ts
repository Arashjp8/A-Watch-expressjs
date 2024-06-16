// most important things we need
// 1. geting the queryKey and queryFn
// 2. set a state based on the QueryState<T> interface
// 3. write a fetchData function that checks the cache data then trys fetching with queryFn
// 4. returning the state based on the result of the try catch block
// 5. run the fetchData with a useEffect every time the queryKey changed

import { useEffect, useState } from "react";

interface QueryState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
}

// using strings as object keys for caching
const cache: { [key: string]: any } = {};

const useQuery = <T>(queryKey: string, queryFn: () => Promise<T>) => {
  const [state, setState] = useState<QueryState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isFetching: false,
  });

  const fetchData = async () => {
    if (cache[queryKey]) {
      setState({
        data: cache[queryKey],
        error: null,
        isLoading: false,
        isFetching: false,
      });
      return;
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      isFetching: true,
    }));

    try {
      const data = await queryFn();
      cache[queryKey] = data;

      console.log("Cache Data: ", cache);

      setState({ data, error: null, isLoading: false, isFetching: false });
    } catch (err) {
      setState({
        data: null,
        error: err as Error,
        isLoading: false,
        isFetching: false,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryKey]);

  return state;
};

export default useQuery;
