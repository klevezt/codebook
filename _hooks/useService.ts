import { HTTP_METHOD } from "next/dist/server/web/http";
import useSWR, { SWRConfiguration } from "swr";

type ParamsArray = Record<string, string | number | boolean | undefined>;

type ServiceProps = {
  url: string;
  method?: HTTP_METHOD;
  options?: SWRConfiguration;
  params?: ParamsArray;
  body?: ParamsArray;
  watchers?: ParamsArray;
  shouldFetch?: boolean;
};

function useService<T>({
  url,
  options,
  method = "GET",
  params = {},
  watchers = {},
  shouldFetch = true,
}: ServiceProps) {
  const fetcher = () => fetch(url, { method, ...params }).then((res) => res.json());

  const { data, error, isValidating, mutate } = useSWR<T>(
    shouldFetch ? [url, Object.values(watchers)] : null,
    fetcher,
    {
      onError: (err) => {
        console.error(err);
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      ...options,
    }
  );

  return {
    data,
    isValidating,
    isError: !!error,
    mutate,
  };
}

export default useService;
