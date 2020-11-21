import { instance } from "./instance";

export const AddressesService = {
    get: () => instance.get('/addresses'),
    getById: (id) => instance.get(`/by_id/${id}`),
    put: (id,address) => instance.put(`/addresses/${id}`, address),
    post: (address) => instance.post(`/addresses`, address)
}