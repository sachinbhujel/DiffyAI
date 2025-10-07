"use server";

import CryptoJS from "crypto-js";

export async function encryptData(keyData) {
    console.log(keyData);
    let groqEncrypted, openaiEncrypted, openrouterEncrypted, geminiEncrypted;
    const secretKey = process.env.SECRET_KEY;

    if (keyData.groqSet) {
        groqEncrypted = keyData.groqkey;
    } else {
        if (keyData.groqkey === "") {
            groqEncrypted = "";
        } else {
            groqEncrypted = CryptoJS.AES.encrypt(keyData.groqkey, secretKey).toString();
        }
    }

    if (keyData.openaiSet) {
        openaiEncrypted = keyData.openaikey;
    } else {
        if (keyData.openaikey === "") {
            openaiEncrypted = "";
        } else {
            openaiEncrypted = CryptoJS.AES.encrypt(keyData.openaikey, secretKey).toString();
        }
    }

    if (keyData.openrouterSet) {
        openrouterEncrypted = keyData.openrouterkey;
    } else {
        if (keyData.openrouterkey === "") {
            openrouterEncrypted = "";
        } else {
            openrouterEncrypted = CryptoJS.AES.encrypt(keyData.openrouterkey, secretKey).toString();
        }
    }

    if (keyData.geminiSet) {
        geminiEncrypted = keyData.geminikey;
    } else {
        if (keyData.geminikey === "") {
            geminiEncrypted = "";
        } else {
            geminiEncrypted = CryptoJS.AES.encrypt(keyData.geminikey, secretKey).toString();
        }
    }

    return { groqEncrypted, openaiEncrypted, openrouterEncrypted, geminiEncrypted };
}