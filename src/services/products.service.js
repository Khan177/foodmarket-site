import { instance } from "./instance";

export const ProductsService = {
    get: () => instance.get("/items"),
    post: (product) => instance.post("/items", product),
    put: (id,product) => instance.put(`/items/${ id }`,product),
    delete: (id) => instance.delete(`/items/${ id }`),
    getById: (id) => instance.get(`items/by_id/${id}`)
}