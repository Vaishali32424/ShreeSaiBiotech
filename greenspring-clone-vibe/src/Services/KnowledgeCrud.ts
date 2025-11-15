import MainAPIService from './MainAPIService';

export async function getAllKnowledge<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `get/all/knowledge`,
    method: "get",
  });
}
export async function getknowledgeData<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `get/all/knowledge`,
    method: "get",
  });
}
export async function updateKnowledge<T, U extends Record<string, unknown>>(
  params: any,
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: `/edit/knowledge/by/id/${params}`,
    method: "put",
    data,
  });
}

export async function deleteKnowledge<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `/delete/knowledge/by/id/${params}`,
    method: "delete",
  });
}
export async function createKnowledge<T, U extends Record<string, unknown>>(
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: "create/knowledge",
    method: "post",
    data,
  });
}

