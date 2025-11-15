import MainAPIService from "./MainAPIService";

export async function getAllProducts<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `get/all/products`,
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
    url: "create/product",
    method: "post",
    data,
  });
}
export async function deleteProduct<T>(params: any) {
  return MainAPIService.fetchData<T>({
    url: `/delete/product/by/id/${params}`,
    method: "delete",
  });
}

export async function getAllCategories<T>() {
  return MainAPIService.fetchData<T>({
    url: '/get/all/category',
    method: 'get',
  });
}

export async function getProductsByCategory<T>(params: number) {
  return MainAPIService.fetchData<T>({
    url: `products/by/category/${params}`,
    method: 'get',
  });
}
export async function createCategory<T>(data: { name: string }) {
  return MainAPIService.fetchData<T>({
    url: "/create/products/cat",
    method: 'post',
    data,
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
    url: `/edit/products/by/id/${params}`,
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