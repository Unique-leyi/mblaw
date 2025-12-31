import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function registerUser(data) {
    // Check internet connectivity first
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/user-auth/register`, {
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

export async function loginUser({ email, password }) {
    // Check internet connectivity first
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/user-auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
        }),
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

export async function getCurrentUserProfile() {
    const response = await fetchWithAuth(`${API_URL}/user-auth/get-profile`, {
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

export async function updateUserProfile(data) {
    const response = await fetchWithAuth(`${API_URL}/user-auth/update-profile`, {
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

export async function changeUserPassword(data) {
    const response = await fetchWithAuth(`${API_URL}/user-auth/change-password`, {
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

