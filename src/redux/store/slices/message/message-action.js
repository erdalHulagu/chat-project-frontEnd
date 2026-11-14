
import { toast } from "../../../../helper/swal";
import {
  createMessage,
  allMessages as fetchMessages,
} from "../../../../api/service/message-service";

// Mesaj gönder
export const createSingleMessage = (values) => async (dispatch) => {
  try {
    const resp = await createMessage(values);
    const data = resp.data;

    if (!data) {
      throw new Error("Message could not be created.");
    }

    dispatch({
      type: "message/createNewMessage",
      payload: data,
    });

    return data;
  } catch (err) {
    console.error("Create message error:", err);
    toast("Message could not be sent");
    throw err;
  }
};

// Sohbet mesajlarını getir
export const getAllMessage = (chatId) => async (dispatch) => {
  try {
    const resp = await fetchMessages(chatId);
    const responseData = resp.data;

    // Backend Page<MessageDTO> veya doğrudan liste döndürebilir.
    const messages = Array.isArray(responseData)
      ? responseData
      : Array.isArray(responseData?.content)
        ? responseData.content
        : [];

    dispatch({
      type: "message/allMessages",
      payload: messages,
    });

    return messages;
  } catch (err) {
    console.error("Get messages error:", err);
    throw err;
  }
};
