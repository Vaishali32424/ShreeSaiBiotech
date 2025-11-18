import api from '@/Apis/axios';
import MainAPIService from './MainAPIService';
import { AxiosResponse } from 'axios';

export async function getAllKnowledge<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/get/all`,
    method: "get",
  });
}



export async function getKnowledgeById<T>(
  params: any
) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/get/by/${params}`,
    method: "get",
  });
}


export async function updateKnowledge<T, U extends Record<string, unknown>>(
  params: any,
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/edit/by/id/${params}`,
    method: "put",
    data,
  });
}

export async function deleteKnowledge<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `knowledge/delete/by/${params}`,
    method: "delete",
  });
}


export async function createKnowledgeMultipart<T>(formData: FormData): Promise<AxiosResponse<T>> {

  return api.post<T>("knowledge/create/", formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}
export async function updateKnowledgeMultipart<T>(params: any, formData: FormData): Promise<AxiosResponse<T>> {

  return api.put<T>(`knowledge/edit/by/id/${params}`, formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}