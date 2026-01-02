import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

export const getDashboardStats = async () => {

    const response = await fetchWithAuth(`${API_URL}/dashboard/stats`, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        throw {
            status: response.status,
            data: error,
        };
    }

    return response.json();
};

export const getMyDashboardStats = async () => {
    const response = await fetchWithAuth(`${API_URL}/dashboard/my-stats`, {
        method: "GET",
    });

    if (!response.ok) {
        const error = await response.json();
        throw {
            status: response.status,
            data: error,
        };
    }

    return response.json();
};

