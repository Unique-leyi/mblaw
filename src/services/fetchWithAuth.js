import { jwtDecode } from "jwt-decode";
import { getStoredTokens, redirectToLogin } from "../util/helper";


const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const now = Date.now() / 1000;
  return decodedToken.exp < now;
};

export async function fetchWithAuth(url, options = {}) {

    const { accessToken } = getStoredTokens();

    // Check internet connectivity
    if (!navigator.onLine) {
        return {
            status: 'OFFLINE',
            message: 'No internet connection. Please check your network and try again.'
        };
    }

    if (!accessToken) {
        redirectToLogin();
        return;
    }

    
    // Check if the access token is expired before making the request
    if (isTokenExpired(accessToken)) {
        redirectToLogin();
        return;
    }

    options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    let response = await fetch(url, options);

    if (response.status === 401 || response.status === 403) {
        //    redirectToLogin()
           return; 
    }

    return response;
}

