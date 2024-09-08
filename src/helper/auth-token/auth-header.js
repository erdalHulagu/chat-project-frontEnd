import { encryptedLocalStorage } from "./encrypt-storage";

const authHeader = () => {
  const token = encryptedLocalStorage.getItem("token");
  console.log("Retrieved token:", token);
  let header = {};
  if (token) {

    header = {
      "Content-Type":"application/json",
       Authorization: `Bearer ${token}`, };
      
  }

  return header;
};

export default authHeader;
