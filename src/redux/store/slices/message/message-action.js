import { toast } from "../../../../helper/swal";
import { createMessage } from "../../../../service/message-service";

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