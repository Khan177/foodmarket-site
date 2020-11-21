import { instance } from "./instance";

export const ProductsService = {
    get: () => instance.get("/items"),
    put: (id) => instance.put(`/orders/${ id }`)
}