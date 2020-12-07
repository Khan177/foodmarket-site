import { instance } from "./instance";

export const OrdersService = {
    get: () => instance.get("/orders"),
    put: (id) => instance.put(`/orders/${ id }`),
    post: (order) => instance.post(`/orders`, order),
    delete: (id) => instance.delete(`/orders/${id}`),
}