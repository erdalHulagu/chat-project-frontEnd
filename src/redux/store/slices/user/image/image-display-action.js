import { getImageById, uploadImage } from "../../../../../api/service/image-service";
import { toast } from "../../../../../helper/swal";
import { setImageURL } from "../auth/auth-slice";

export const imageDisplayAction = (file) => async (dispatch) => {



    const formData = new FormData();
    formData.append("imageFile", file);

    const imageResponse = await uploadImage(formData);
    console.log("imageResponse...................................... ", imageResponse.data.id)
    let imageId = imageResponse.data.id;
    const image = await getImageById(imageId);
    if (image) {
        const blob = new Blob([image.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        dispatch(setImageURL(imageUrl));
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
        toast("Only JPG, JPEG, and PNG files are allowed!");
        return;
    }


}
