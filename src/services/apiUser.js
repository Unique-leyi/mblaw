import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

export async function getMyConsultations() {
    const response = await fetchWithAuth(`${API_URL}/consultations/my-consultations`, {
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

export async function getMyConsultationById(id) {
    const response = await fetchWithAuth(`${API_URL}/consultations/my-consultations/${id}`, {
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

export async function getMyAppointments() {
    const response = await fetchWithAuth(`${API_URL}/appointments/my-appointments`, {
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

export async function getMyAppointmentById(id) {
    const response = await fetchWithAuth(`${API_URL}/appointments/my-appointments/${id}`, {
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

