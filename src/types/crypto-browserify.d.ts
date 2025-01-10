declare module 'crypto-browserify' {
  import { Hash, Cipher } from 'crypto';
  
  export function createHash(algorithm: string): Hash;
  export function createCipheriv(algorithm: string, key: Buffer | string, iv: Buffer | string): Cipher;
  export function createDecipheriv(algorithm: string, key: Buffer | string, iv: Buffer | string): Cipher;
} 