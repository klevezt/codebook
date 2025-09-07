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
  const fetcher = () => fetch(url, { ...params }).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR<T>(
    shouldFetch ? [url, Object.values(watchers)] : null,
    fetcher,
    {
      onError: (err) => {
        console.error(err);
      },
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      ...options,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
}

export default useService;
