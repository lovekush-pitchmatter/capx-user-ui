import CryptoJS from "crypto-js";
import ENV_CONSTANTS from "../constants/envConstants";

/**
 * Decrypts AES-encrypted data (Base64) using environment constants.
 * @param {string} encryptedData - The encrypted string from backend (Base64).
 * @returns {any} - Decrypted JS object or null if decryption fails.
 */
export function decryptData(encryptedData) {
  if (!encryptedData) return null;
  try {
    const key = CryptoJS.enc.Utf8.parse(ENV_CONSTANTS.ENCRYPTION_KEY);
    const iv = CryptoJS.enc.Utf8.parse(ENV_CONSTANTS.ENCRYPTION_IV);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedStr);
  } catch (err) {
    console.error("Decryption failed", err);
    return null;
  }
}
