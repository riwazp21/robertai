// /lib/encrypt.ts
import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY!;

console.log("💡 SECRET_KEY =", SECRET_KEY);
export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(cipherText: string): string {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
