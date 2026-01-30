import api from "./api-client";

export const getReiseziele = async () => {
    const res = await api.get("/api/reiseziele");
    return res.data;
};

export const deleteReiseziel = async (id) => {
    await api.delete(`/api/reiseziele/${id}`);
};

export const uploadReiseziel = async (formData) => {
    const res = await api.post("/api/reiseziele/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
