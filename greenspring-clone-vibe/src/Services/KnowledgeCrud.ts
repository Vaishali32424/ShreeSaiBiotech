import MainAPIService from './MainAPIService';

export async function getAllKnowledge<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `knowledgeget/all/`,
    method: "get",
  });
}

export async function getKnowledgeById<T>(
  params: any
) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/get/by/id/${params}`,
    method: "get",
  });
}

export async function getKnowledgePageData<T>(
  params: any
) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/get/by/id/${params}`,
    method: "get",
  });
}
export async function updateKnowledge<T, U extends Record<string, unknown>>(
  params: any,
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/edit//by/id/${params}`,
    method: "put",
    data,
  });
}

export async function deleteKnowledge<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/delete/by/id/${params}`,
    method: "delete",
  });
}
export async function createKnowledge<T, U extends Record<string, unknown>>(
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: "knowledge/create/",
    method: "post",
    data,
  });
}

