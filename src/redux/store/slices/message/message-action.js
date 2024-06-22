import { toast } from "../../../../helper/swal";
import { createMessage,allMessages } from "../../../../api/service/message-service";

// create message
export const createSingleMessage = async (values) => {

    try {
        const resp = await createMessage(values);
        console.log(resp.data)
        const data = await resp.json();
        console.log("create chat", data)
        toast("created successfully")

    } catch (err) {
        toast("catch error", err);
    }
};

// get all messages
export const getAllMessage = async (values) => {

    try {
        const resp = await allMessages(values);
        console.log(resp.data)
        const data = await resp.json();
        console.log("create chat", data)
        toast("created successfully")

    } catch (err) {
        toast("catch error", err);
    }
};