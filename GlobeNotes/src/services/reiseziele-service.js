import api from "./api-client";

export const getReiseziel = async () => {
    const res = await api.get("/api/reiseziel");
    return res.data;
};

export const deleteReiseziel = async (id) => {
    await api.delete(`/api/reiseziel/${id}`);
};

export const uploadReiseziel = async (formData) => {
    const res = await api.post("/api/reiseziel/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
