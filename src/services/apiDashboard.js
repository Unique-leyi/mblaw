import { fetchWithAuth } from "./fetchWithAuth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const getDashboardStats = async () => {
    const response = await fetchWithAuth(`${API_BASE_URL}/dashboard/stats`, {
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
    const response = await fetchWithAuth(`${API_BASE_URL}/dashboard/my-stats`, {
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

