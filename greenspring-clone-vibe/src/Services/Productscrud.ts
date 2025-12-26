import api from "@/Apis/axios";
import MainAPIService from "./MainAPIService";
import { AxiosResponse } from "axios";

export async function getAllProducts<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `product/get/all/`,
    method: "get",
  });
}

export async function listOrganisationByOrgId<T>(params: number, searchInput: string | null) {
  return MainAPIService.fetchData<T>({
    url: `organisations/list-org-user/${params}/${searchInput}`,
    method: "get",
  });
}


export async function deleteProduct<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `product/delete/by/id/${params}`,
    method: "delete",
  });
}

export async function getAllCategories<T>() {
  return MainAPIService.fetchData<T>({
    url: 'product/get/all/category',
    method: 'get',
  });
}

export async function getProductsByCategory<T>(params: number) {
  return MainAPIService.fetchData<T>({
    url: `product/by/category/${params}`,
    method: 'get',
  });
}
export async function getProductsBySearch<T>(params: number) {
  return MainAPIService.fetchData<T>({
    url: `product/get/all/search/${params}`,
    method: 'get',
  });
}

export async function createCategory<T>(data: { name: string }) {
  return MainAPIService.fetchData<T>({
    url: "product/create/cat",
    method: 'post',
    data,
  });
}


export async function ProductExistence<T>(name: string) {
  return MainAPIService.fetchData<T>({
    url: `product/existence/by/${name}`,
    method: 'get',
  });
}
export async function getUserImage<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `profile-attachment/get-attachment-by-username/${params}`,
    method: "get",
  });
}


export async function updateHotProduct<T, U extends Record<string, unknown>>(
  params: any,
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: `/product/hot/${params}`,
    method: "patch",
    data,
  });
}
export async function getProductsData<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `/product/by/${params}`,
    method: "get",
  });
}

export async function getHotProducts<T>() {
  return MainAPIService.fetchData<T>({
    url: 'product/get/all/hot',
    method: 'get',
  });
}
export async function createNewProduct<T>(formData: FormData): Promise<AxiosResponse<T>> {

  return api.post<T>("product/create/", formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}
export async function updateProduct<T>( params: any, formData: FormData): Promise<AxiosResponse<T>> {

  return api.put<T>(`product/edit/by/${params}`, formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}

export async function uploadCertificate<T>( formData: FormData): Promise<AxiosResponse<T>> {

  return api.post<T>(`product/upload/certificates`, formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}
export async function UploadCardsImage<T>( formData: FormData): Promise<AxiosResponse<T>> {

  return api.post<T>(`product/upload/cards`, formData, {

    headers: {
      "Content-Type": undefined, 
    },
  });
}

export const deleteCategory = (id: string) =>
  MainAPIService.fetchData({
    url: `product/category/delete/by/${id}`,
    method: 'delete',
  });

export const updateCategory = (id: string, data: any) =>
  MainAPIService.fetchData({
    url: `product/category/edit/by/${id}`,
    method: 'put',
    data,
  });

export async function getCategoryById<T>(categoryId: string) {
  return MainAPIService.fetchData<T>({
    url: `/product/category/get-by/${categoryId}`,
    method: 'get',
  });
}