import MainAPIService from "./MainAPIService";


export async function createContactApi<T, U extends Record<string, unknown>>(
  data: U
) {
  return MainAPIService.fetchData<T>({
    url: "contact-details/create/",
    method: "post",
    data,
  });
}
export async function getcontactdetails<T>(
) {
  return MainAPIService.fetchData<T>({
    url: `contact-details/get/all`,
    method: "get",
  });
}
