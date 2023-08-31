import api from './api';

//findAllProdutosPorCategoria
export const findAllProduto = async () => {
    return await api.get("/api/produto");
}

export const findProdutoById = async (id) => {
    return await api.get(`/api/produto/${id}`);
}

export const findAllProdutosPorCategoria = async (id) => {
    return await api.get(`/produto/categoria/${id}`);
}

export const createProduto = async (produto) => {
    return await api.post("/api/produto", produto);
}

export const updateProduto = async(produto) => {
    return await api.put("/api/produto", produto);
}

export const deleteProdutoById = async(id) => {
    return await api.delete(`/api/produto/${id}`);
}