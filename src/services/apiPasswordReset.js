import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

// Admin password reset
export async function forgotPasswordAdmin(email) {
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
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

export async function verifyOTPAdmin(email, code) {
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code }),
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

export async function resetPasswordAdmin(email, code, newPassword) {
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code, newPassword }),
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

// User password reset
export async function forgotPasswordUser(email) {
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/user-auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email }),
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

export async function verifyOTPUser(email, code) {
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/user-auth/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code }),
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

export async function resetPasswordUser(email, code, newPassword) {
    if (!navigator.onLine) {
        throw {
            status: 'OFFLINE',
            data: {
                message: 'No internet connection. Please check your network and try again.'
            }
        };
    }

    const response = await fetch(`${API_URL}/user-auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, code, newPassword }),
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

