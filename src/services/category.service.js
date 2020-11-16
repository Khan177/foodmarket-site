import { instance } from "./instance";

export const CategoryService = {
    get:() => instance.get("/categories"),
    getById:(id) => instance.get(`/categories/by_id/${id}`),
    delete:(id) => instance.delete(`/categories/${id}`),
    post: (obj) => instance.post("/categories", obj),
    put: (id, obj) => instance.put(`/categories/${id}`, obj)
}

export const SubCategoryService = {
    get:() => instance.get("/subcategories"),
    getById:(id) => instance.get(`/subcategories/by_id/${id}`),
    delete:(id) => instance.delete(`/subcategories/${id}`),
    post: (obj) => instance.post("/subcategories", obj),
    put: (id, obj) => instance.put(`/subcategories/${id}`, obj)
}