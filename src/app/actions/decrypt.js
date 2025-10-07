"use server";

import CryptoJS from "crypto-js";

export async function decryptData(encrypt) {
    const secretKey = process.env.SECRET_KEY;
    let groqDecryptKey, geminiDecryptKey, openaiDecryptKey, openrouterDecryptKey;

    if (encrypt.groqEncryptKey) {
        groqDecryptKey = CryptoJS.AES.decrypt(encrypt.groqEncryptKey, secretKey).toString(CryptoJS.enc.Utf8);
    }

    if (encrypt.geminiEncryptKey) {
        geminiDecryptKey = CryptoJS.AES.decrypt(encrypt.geminiEncryptKey, secretKey).toString(CryptoJS.enc.Utf8);
    }

    if (encrypt.openaiEncryptKey) {
        openaiDecryptKey = CryptoJS.AES.decrypt(encrypt.openaiEncryptKey, secretKey).toString(CryptoJS.enc.Utf8);
    }

    if (encrypt.openrouterEncryptKey) {
        openrouterDecryptKey = CryptoJS.AES.decrypt(encrypt.openrouterEncryptKey, secretKey).toString(CryptoJS.enc.Utf8);
    }

    return { groqDecryptKey, geminiDecryptKey, openaiDecryptKey, openrouterDecryptKey }
}