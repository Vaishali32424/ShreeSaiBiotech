import MainAPIService from './MainAPIService';

export async function getAllNews<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `news/get/all/`,
    method: "get",
  });
}
export async function getNewsData<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `news/get/all/`,
    method: "get",
  });
}

export async function getNewsByNewsId<T>(
  params: any
) {
  return MainAPIService.fetchData<T>({
    url: `news/get/by/id/${params}`,
    method: "get",
  });
}
export async function updateNews<T, U extends Record<string, unknown>>(
  params: any,
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: `news/edit/by/id/${params}`,
    method: "put",
    data,
  });
}

export async function deleteNews<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `/delete/news/by/id/${params}`,
    method: "delete",
  });
}
export async function createNews<T, U extends Record<string, unknown>>(
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: "news/create/",
    method: "post",
    data,
  });
}

