import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function createConsultationPublic(data) {
    if (!navigator.onLine) {
        throw {
            status: "OFFLINE",
            data: {
                message:
                    "No internet connection. Please check your network and try again.",
            },
        };
    }

    const response = await fetch(`${API_URL}/consultations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData,
        };
    }

    return responseData;
}

export async function getConsultations() {
    const response = await fetchWithAuth(`${API_URL}/consultations`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData,
        };
    }

    return responseData;
}

export async function getConsultationById(id) {
    const response = await fetchWithAuth(`${API_URL}/consultations/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData,
        };
    }

    return responseData;
}

export async function updateConsultationStatus(id, status) {
    const response = await fetchWithAuth(`${API_URL}/consultations/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData,
        };
    }

    return responseData;
}

export async function deleteConsultation(id) {
    const response = await fetchWithAuth(`${API_URL}/consultations/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const responseData = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: responseData,
        };
    }

    return responseData;
}


