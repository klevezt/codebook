import { clsx, type ClassValue } from "clsx";
import { HTTP_METHOD } from "next/dist/server/web/http";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export async function fetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      method: HTTP_METHOD;
    };
  }
) {
  const { method = "GET", ...restArgs } = arg;
  return fetch(url, {
    method: method ?? "GET",
    body: JSON.stringify({ ...restArgs }),
  }).then((res) => res.json());
}

export const getKey = (pageIndex: number, previousPageData: [], watchers: object) => {
  const limit = pageIndex === 0 ? 5 : 3;
  const skip = pageIndex === 0 ? 0 : pageIndex === 1 ? 5 : pageIndex * limit + 2;

  if (previousPageData && !previousPageData.length) return null; // no more data
  return [`/api/posts?limit=${limit}&skip=${skip}`, Object.values({ ...watchers })];
};
