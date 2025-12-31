import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function getAdmins() {
    const response = await fetchWithAuth(`${API_URL}/admins`, {
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

export async function getAdminById(id) {
    const response = await fetchWithAuth(`${API_URL}/admins/${id}`, {
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

export async function createTeamMember(data) {
    const response = await fetchWithAuth(`${API_URL}/admins`, {
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

export async function updateTeamMember(id, data) {
    const response = await fetchWithAuth(`${API_URL}/admins/${id}`, {
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

export async function updateAdminStatus(id, isActive) {
    const response = await fetchWithAuth(`${API_URL}/admins/${id}/status`, {
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

