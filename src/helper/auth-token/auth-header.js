import { encryptedLocalStorage } from "./encrypt-storage";

const authHeader = () => {
    const token = encryptedLocalStorage.getItem("token");

    if (!token) {
        return {};
    }

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

export default authHeader;