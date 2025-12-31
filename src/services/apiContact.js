import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

// Public endpoint - no auth required
export async function submitContact(data) {
    const response = await fetch(`${API_URL}/contacts`, {
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

// Admin endpoints - require auth
export async function getContacts() {
    const response = await fetchWithAuth(`${API_URL}/contacts`, {
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

export async function getContactById(id) {
    const response = await fetchWithAuth(`${API_URL}/contacts/${id}`, {
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

export async function updateContactStatus(id, status) {
    const response = await fetchWithAuth(`${API_URL}/contacts/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ status }),
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

export async function deleteContact(id) {
    const response = await fetchWithAuth(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
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

