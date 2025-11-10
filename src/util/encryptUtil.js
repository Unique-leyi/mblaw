
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;


export const encryptData = (data, key = SECRET_KEY) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  return { 
    given: ciphertext, 
    taken: key 
  };
};

export const decryptData = ({ given, taken }) => {
  if (!given || !taken) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(given, taken);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (e) {
    console.log('Decryption error:', e);
    return null;
  }
};
