import { EncryptStorage } from 'encrypt-storage';

export const encryptedLocalStorage=new EncryptStorage(process.env.CHAT_APP_PROJECT_ENCRYPTION_KEY)