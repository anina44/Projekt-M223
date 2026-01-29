import api from "./api-client";

export const getReiseziele = async () => {
    const res = await api.get("/api/reiseziele");
    return res.data;
};

export const deleteReiseziel = async (id) => {
    await api.delete(`/api/reiseziele/${id}`);
};
