import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function getUsers() {
    const response = await fetchWithAuth(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData
        };
    }

    return responseData;
}

export async function getUserById(id) {
    const response = await fetchWithAuth(`${API_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData
        };
    }

    return responseData;
}

export async function createClient(data) {
    const response = await fetchWithAuth(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData
        };
    }

    return responseData;
}

export async function updateClient(id, data) {
    const response = await fetchWithAuth(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData
        };
    }

    return responseData;
}

export async function updateUserStatus(id, isActive) {
    const response = await fetchWithAuth(`${API_URL}/users/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ isActive }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData
        };
    }

    return responseData;
}

