import api from './api';

//findAllProdutosPorCategoria
export const findAllOrdem = async () => {
    return await api.get("/api/ordem");
}

export const findOrdemById = async (id) => {
    return await api.get(`/api/ordem/${id}`);
}

export const findAllOrdemsPorCategoria = async (id) => {
    return await api.get(`/api/ordem/categoria/${id}`);
}

export const createOrdem = async (ordem) => {
    return await api.post("/api/ordem", ordem);
}

export const updateOrdem = async(ordem) => {
    return await api.put("/api/ordem", ordem);
}

export const deleteOrdemById = async(id) => {
    return await api.delete(`/api/ordem/${id}`);
}