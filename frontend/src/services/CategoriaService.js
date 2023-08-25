import api from './api';

export const findAllCategoria = async () => {
    return await api.get("/api/categorias");
}

export const createCategoria = async (categoria) => {
    return await api.post("/api/categorias", categoria);
}

export const updateCategoria = async(categoria) => {
    return await api.put("/api/categorias", categoria);
}

export const deleteCategoriaById = async(id) => {
    return await api.delete(`/api/categorias/${id}`);
}