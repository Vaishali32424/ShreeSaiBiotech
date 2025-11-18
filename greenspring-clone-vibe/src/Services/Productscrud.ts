import MainAPIService from "./MainAPIService";

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

export async function createNewProduct<T, U extends Record<string, unknown>>(
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: "product/create/",
    method: "post",
    data,
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
    url: `product/by/category/${params}`,
    method: 'get',
  });
}


export async function getUserImage<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `profile-attachment/get-attachment-by-username/${params}`,
    method: "get",
  });
}

export async function updateProduct<T, U extends Record<string, unknown>>(
  params: any,
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: `product/edit/by/id/${params}`,
    method: "put",
    data,
  });
}

export async function getProductsData<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `/product/by/id/${params}`,
    method: "get",
  });
}

export async function getHotProducts<T>() {
  return MainAPIService.fetchData<T>({
    url: 'product/get/hot/products',
    method: 'get',
  });
}