import api from './api';

export const findUsuarioById = async (id) => {
    return await api.get(`/api/usuario/${id}`)
}

export const updateProfile = async (usuario) => {
    return await api.put("/api/profile", usuario);
}