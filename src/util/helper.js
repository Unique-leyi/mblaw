import { jwtDecode } from "jwt-decode";
import { decryptData, encryptData } from "./encryptUtil";

export function getTokenExpiration(token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken && decodedToken.exp) {
      return new Date(decodedToken.exp * 1000);
  }
  return null;
}


export const generateContactLink = (contact) => {
    switch (contact.title) {
      case "WhatsApp":
        // Use the first phone number for WhatsApp
        const whatsappNumber = contact.content.split(',')[0].trim().replace(/\s+/g, '');
        return `https://wa.me/${whatsappNumber.replace('+', '')}`;
      
      case "Email":
        return `mailto:${contact.content}`;
      
      case "Phone":
        // Use the first phone number for calling
        const phoneNumber = contact.content.split(',')[0].trim().replace(/\s+/g, '');
        return `tel:${phoneNumber}`;
      
      default:
        return "#";
    }
};


export function splitDateTime(timestamp) {
  // Validate input
  if (!timestamp || typeof timestamp !== 'string') {
    console.error('Invalid timestamp: Expected a non-empty string, received:', timestamp);
    return { date: 'Invalid', time: 'Invalid' };
  }

  // Normalize microsecond precision (e.g., .000000Z → .000Z)
  const normalizedTimestamp = timestamp.replace(/(\.\d{3})(\d*)Z$/, '$1Z');

  // Create Date object
  const dateObj = new Date(normalizedTimestamp);

  // Check if Date is valid
  if (isNaN(dateObj.getTime())) {
    console.error('Failed to parse timestamp:', timestamp, 'Normalized:', normalizedTimestamp);
    return { date: 'Invalid', time: 'Invalid' };
  }

  // Extract date in YYYY-MM-DD format
  const date = dateObj.toISOString().split('T')[0];

  // Format time as hh:mmAM/PM sssecs
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getUTCSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const time = `${formattedHours}:${minutes}${ampm} ${seconds}secs`;

  return { date, time };
}





export function formatToNaira(amount) {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 0
    }).format(amount);
}

export function formatDateMethod(isoDateString) {
    const date = new Date(isoDateString);
    
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    
    return `${month} ${day}, ${year}`;
}

export const formatPriceNumber = (numString) => 
    parseFloat(numString).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) || "0";


export function calculateCartTotal(cartData) {
    const total = (cartData?.cart?.cart_items || []).reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = item.quantity || 1;
        return sum + (price * quantity);
    }, 0);

    return total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
    

export function formatToMillions(numString) {
    // Remove commas and convert to number
    const num = parseFloat(numString.replace(/,/g, '')) || 0;
    
    // Convert to millions and round to 2 decimal places
    const millions = num / 1000000;
    const formattedNum = millions.toFixed(2);
    
    // Remove trailing zeros after decimal point if they're not needed
    const cleanNum = parseFloat(formattedNum).toString();
    
    return `${cleanNum}M`;
}

export function truncateText(text, maxLength = 20) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


export const capitalizeFirstLetterTable = (string) => {
    if (!string) return "Unfulfilled";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};


export function getDaysFromDate(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const diffInMs = today - inputDate;
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
}

export function getFirstName(fullName) {
  if (!fullName || typeof fullName !== "string") {
    return "";
  }
  return fullName.split(" ")[0];
}


//capitalize first letter
export const capitalizeFirstLetter = (str) => {
    return str && str[0].toUpperCase() + str.slice(1);
};
  
// convert time to minutes it will receive in MM:SS format
export const convertTimeToMinutes = (time) => {
    const [minutes, seconds] = time.split(":");
    const totalMinutes = Math.round(parseInt(minutes) + parseInt(seconds) / 60);
    return totalMinutes;
}; 


export const getStoredTokens = () => {
    const encryptedAccessToken = localStorage.getItem("A_C");
 
    const accessToken = encryptedAccessToken
      ? decryptData(JSON.parse(encryptedAccessToken))
      : null;

    return {
      accessToken,
    };
};
  
  export const saveTokens = (accessToken) => {
    const accessTokenExpiry = getTokenExpiration(accessToken);
  
    if (accessTokenExpiry) {
      const encryptedAccessToken = encryptData(accessToken);
      localStorage.setItem("A_C", JSON.stringify(encryptedAccessToken));
    }
  
  };



export const saveToLocalStorage = (key, data) => {
  try {
    const encryptedData = encryptData(data);
    localStorage.setItem(key, JSON.stringify(encryptedData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromLocalStorage = (key) => {
  try {
    const encryptedData = localStorage.getItem(key);
    
    if (!encryptedData) return null;
    
    const parsedData = JSON.parse(encryptedData);
    const retrievedData = decryptData(parsedData);
    
    return retrievedData;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return null;
  }
};

export const clearTokens = () => {
    localStorage.removeItem("A_C");
    localStorage.removeItem("C_I");
    localStorage.clear();
};

export const redirectToLogin = () => {
    window.location.href = "/login";
    clearTokens();
};


export function extractMonthAndDay(dateString) {
    const [year, month, day] = dateString.split("-");
    return {
        month,
        day
    };
}