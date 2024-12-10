import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';
import { ec as EC } from 'elliptic';
import { sha256 } from 'js-sha256';
import { SignatureData } from '../types';

// Initialize the elliptic curve
const ec = new EC('p256'); // P-256 curve

// Define storage keys
const PRIVATE_KEY_STORAGE_KEY = 'PRIVATE_KEY';
const PUBLIC_KEY_STORAGE_KEY = 'PUBLIC_KEY';

/**
   * Generates an ECDSA P-256 key pair and stores them securely.
   * @returns {Promise<{ privateKey: string, publicKey: string }>}
   */
export async function generateKeysAsStrings(): Promise<{ privateKey: string; publicKey: string }> {
  try {
    // Generate key pair
    console.log('entered generateKeysAsStrings');

    const keyPair = ec.genKeyPair();
    console.log('keyPair:', keyPair);

    // Export keys in hexadecimal format
    const publicKey = keyPair.getPublic('hex');
    console.log('publicKey:', publicKey);
    const privateKey = keyPair.getPrivate('hex');
    console.log('privateKey:', privateKey);

    // Store keys securely
    console.log('Storing keys...');
    await SecureStore.setItemAsync(PUBLIC_KEY_STORAGE_KEY, publicKey, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
    await SecureStore.setItemAsync(PRIVATE_KEY_STORAGE_KEY, privateKey, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
    console.log('Keys stored successfully.');
    return { privateKey, publicKey };
  } catch (error) {
    console.error('Error generating keys:', error);
    throw error;
  }
}

 /**
   * Retrieves the stored ECDSA key pair after successful authentication.
   * @returns {Promise<{ privateKey: string, publicKey: string }>}
   */
 export async function getKeysAsStrings(): Promise<{ privateKey: string; publicKey: string }> {
  try {
    // Authenticate the user before accessing keys
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to access cryptographic keys',
        fallbackLabel: 'Enter Passcode',
      });

      if (!auth.success) {
        throw new Error('Authentication failed');
      }
    }

    const publicKey = await SecureStore.getItemAsync(PUBLIC_KEY_STORAGE_KEY);
    const privateKey = await SecureStore.getItemAsync(PRIVATE_KEY_STORAGE_KEY);

    if (!publicKey || !privateKey) {
      throw new Error('Keys not found. Please generate them first.');
    }

    return { privateKey, publicKey };
  } catch (error) {
    console.error('Error retrieving keys:', error);
    throw error;
  }
}

/**
   * Signs data using the private key.
   * @param {string} data - The data to sign.
   * @returns {Promise<string>} - The signature in hexadecimal format.
   */
export async function signData(data: string): Promise<string> {
  try {
    console.log('Signing data...');

    const { privateKey } = await getKeysAsStrings();

    // Recreate key pair from private key
    const keyPair = ec.keyFromPrivate(privateKey, 'hex');
    console.log('keyPair:', keyPair);

    // Hash the data
    const hash = sha256(data);
    console.log('hash:', hash);

    // Sign the hash
    const signature = keyPair.sign(hash, 'hex');
    console.log('signature:', signature);

    // Return signature in DER format as hex
    console.log('Data signed successfully.');
    console.log('signature.toDER:', signature.toDER('hex'));

    return signature.toDER('hex');
  } catch (error) {
    console.error('Error signing data:', error);
    throw error;
  }
}

export async function getSignatureData(): Promise<SignatureData> {
  const { publicKey } = await getKeysAsStrings();
  return {
    keyData: {
      keyAlgorithm: 'ECDSA',
      keyParameters: ['P-256'],
      publicKey: publicKey
    },
    hashData: {
      hashAlgorithm: 'SHA256'
    }
  };
}

/**
 * Verifies the signature using the public key.
 * @param {string} data - The original data.
 * @param {string} signatureHex - The signature in hexadecimal format.
 * @returns {Promise<boolean>} - Whether the signature is valid.
 */
export async function verifyData(data: string, signatureHex: string): Promise<boolean> {
  try {
    const { publicKey } = await getKeysAsStrings();

    // Recreate key pair from public key
    const keyPair = ec.keyFromPublic(publicKey, 'hex');

    // Hash the data
    const hash = sha256(data);

    // Verify the signature
    const isValid = keyPair.verify(hash, signatureHex);

    return isValid;
  } catch (error) {
    console.error('Error verifying data:', error);
    throw error;
  }
}

/**
 * Generates a SHA-256 digest of the input data.
 * @param {string} data - The data to hash.
 * @returns {Promise<string>} - The hash in hexadecimal format.
 */
export async function generateHash(data: string): Promise<string> {
  try {
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data,
      { encoding: Crypto.CryptoEncoding.HEX }
    );
    return hash;
  } catch (error) {
    console.error('Error generating hash:', error);
    throw error;
  }
}
