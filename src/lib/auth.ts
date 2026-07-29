import { ed25519 } from '@noble/curves/ed25519';
import { sha256 } from '@noble/hashes/sha256';
import { db } from './db';

/**
 * Generate a cryptographically random hex nonce.
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 16; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Generate a random session token.
 */
export function generateSessionToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined') {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Verify Ed25519 signature from Nimiq Pay SDK.
 * @param message The nonce string that was signed
 * @param publicKeyHex Hex representation of public key
 * @param signatureHex Hex representation of signature
 */
export function verifySignature(
  message: string,
  publicKeyHex: string,
  signatureHex: string
): boolean {
  try {
    const encoder = new TextEncoder();
    const msgBytes = encoder.encode(message);
    const pubKeyBytes = hexToBytes(publicKeyHex);
    const sigBytes = hexToBytes(signatureHex);

    return ed25519.verify(sigBytes, msgBytes, pubKeyBytes);
  } catch (err) {
    console.error('Signature verification error:', err);
    return false;
  }
}

function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.substring(i, i + 2), 16);
  }
  return bytes;
}
