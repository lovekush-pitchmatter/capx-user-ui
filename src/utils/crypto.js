import CryptoJS from 'crypto-js';

// IMPORTANT: This must match your backend TEMP_SECRET_KEY exactly
const TEMP_SECRET_KEY = process.env.REACT_APP_TEMP_SECRET_KEY || 'wzekgc73y8iholnd5r4qsbxv9a1t06pufmj'; 

/**
 * Decrypts data that was encrypted with the Node.js backend
 * @param {string} encryptedText - Text in format "iv:encrypted"
 * @returns {string} Decrypted text
 */
export function decrypt(encryptedText) {
  try {
    if (!encryptedText) {
      console.error('No encrypted text provided');
      return null;
    }
    
    // Split the IV and encrypted text
    const parts = encryptedText.split(':');
    if (parts.length !== 2) {
      console.error('Invalid encrypted text format, expected iv:encrypted but got:', encryptedText);
      return null;
    }
    
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encrypted = parts[1];
    
    // Generate the key using SHA-256, same as backend
    const key = CryptoJS.SHA256(TEMP_SECRET_KEY);
    
    // Decrypt
    const decryptedBytes = CryptoJS.AES.decrypt(
      { ciphertext: CryptoJS.enc.Hex.parse(encrypted) },
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    
    // Convert to UTF-8 string
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return null;
  }
}

/**
 * For testing/completeness, matching encryption function
 * @param {string} text - Text to encrypt
 * @returns {string} Encrypted text in format "iv:encrypted"
 */
export function encrypt(text) {
  try {
    // Generate random IV
    const iv = CryptoJS.lib.WordArray.random(16);
    
    // Generate the key using SHA-256, same as backend
    const key = CryptoJS.SHA256(TEMP_SECRET_KEY);
    
    // Encrypt
    const encrypted = CryptoJS.AES.encrypt(
      text,
      key,
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    
    // Return IV + encrypted data
    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
}
