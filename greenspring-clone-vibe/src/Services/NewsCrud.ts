import axios, { AxiosResponse } from 'axios';
import MainAPIService from './MainAPIService';
import api from '@/Apis/axios';

export async function getAllNews<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `news/get/all/`,
    method: "get",
  });
}
export async function getNewsByCategory<T>(
  selectedCategory: string
) {
  return MainAPIService.fetchData<T>({
    url: `news/get/by/category/${selectedCategory}`,
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
    url: `news/get/by/${params}`,
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
    url: `news/delete/by/id/${params}`,
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

// This function is for handling file uploads (multipart/form-data)
export async function createNewsMultipart<T>(formData: FormData): Promise<AxiosResponse<T>> {

  return api.post<T>("news/create/", formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}
export async function updateNewsMultipart<T>(params: any, formData: FormData): Promise<AxiosResponse<T>> {

  return api.put<T>(`news/edit/by/id/${params}`, formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}
// export async function updateNewsMultipart<T, U extends Record<string, unknown>>(
//   params: any,
//   data: U
// ) {
//   return MainAPIService.fetchData<T>({
//     url: `news/edit/by/id/${params}`,
//     method: "put",
//     data,
//   });
// }
