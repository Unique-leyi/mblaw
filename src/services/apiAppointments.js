import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function createAppointment(data) {
    const response = await fetchWithAuth(`${API_URL}/appointments`, {
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

export async function getAppointments() {
    const response = await fetchWithAuth(`${API_URL}/appointments`, {
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

export async function getAppointmentById(id) {
    const response = await fetchWithAuth(`${API_URL}/appointments/${id}`, {
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

export async function updateAppointment(id, data) {
    const response = await fetchWithAuth(`${API_URL}/appointments/${id}`, {
        method: "PATCH",
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

export async function deleteAppointment(id) {
    const response = await fetchWithAuth(`${API_URL}/appointments/${id}`, {
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


