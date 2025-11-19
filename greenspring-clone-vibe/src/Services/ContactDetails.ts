import MainAPIService from "./MainAPIService";


export async function createContactApi<T, U extends Record<string, unknown>>(
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: "contact/create",
    method: "post",
    data,
  });
}
export async function getcontactdetails<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `contact/get/all`,
    method: "get",
  });
}
