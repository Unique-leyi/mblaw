import { fetchWithAuth } from "./fetchWithAuth";

const API_URL = import.meta.env.VITE_BASE_URL;

// Public endpoints
export async function getPublishedBlogPosts(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.type) queryParams.append("type", params.type);
    if (params.search) queryParams.append("search", params.search);

    const url = `${API_URL}/blog-posts/published${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
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

export async function getBlogPostBySlug(slug) {
    const response = await fetch(`${API_URL}/blog-posts/published/${encodeURIComponent(slug)}`, {
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

// Protected endpoints (admin)
export async function getBlogPosts(params = {}) {
    const queryParams = new URLSearchParams();
    if (params.status) queryParams.append("status", params.status);
    if (params.type) queryParams.append("type", params.type);
    if (params.featured) queryParams.append("featured", params.featured);

    const url = `${API_URL}/blog-posts${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetchWithAuth(url, {
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

export async function getBlogPostById(id) {
    const response = await fetchWithAuth(`${API_URL}/blog-posts/${id}`, {
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

export async function createBlogPost(data) {
    const response = await fetchWithAuth(`${API_URL}/blog-posts`, {
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

export async function updateBlogPost(id, data) {
    const response = await fetchWithAuth(`${API_URL}/blog-posts/${id}`, {
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

export async function deleteBlogPost(id) {
    const response = await fetchWithAuth(`${API_URL}/blog-posts/${id}`, {
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

