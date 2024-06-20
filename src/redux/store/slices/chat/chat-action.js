import { toast } from "../../../../helper/swal";
import { createChat, createGroupChat, getAllChat } from "../../../../service/chat-service";


//create single chat
export const singleUserChat = async (values) => {

    try {
        const resp = await createChat(values);
        console.log(resp.data)
        const data = await resp.json();
        console.log("create chat", data)
        toast("created successfully")

    } catch (err) {
        toast("catch error", err);
    }
};

//create group chat
export const createUserGroupChat = async (values) => {

    try {
        const resp = await createGroupChat(values);
        console.log(resp.data)
        const data = await resp.json();
        console.log("create chat", data)
        toast("created successfully")

    } catch (err) {
        toast("catch error", err);
    }
};

//get all user's chats
export const getAllUsersChats = async (values) => {

    try {
        const resp = await getAllChat(values);
        console.log(resp.data)
        const data = await resp.json();
        console.log("create chat", data)
        toast("created successfully")

    } catch (err) {
        toast("catch error", err);
    }
};