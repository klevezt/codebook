import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useService(url: string) {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    isError: error,
  };
}

export default useService;
