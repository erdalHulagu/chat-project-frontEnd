import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { HiArrowLongRight } from "react-icons/hi2";
import { error, toast } from "../../../helper/swal";
import { uploadImage } from "../../../api/service/image-service";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { loginSuccess, setImageURL } from "../../../redux/store/slices/user/auth/auth-slice";
import { encryptedLocalStorage } from "../../../helper/auth-token/encrypt-storage";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../api/service/user-service";

const UpdateProfileImage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [updating, setUpdating] = useState(false);
    const { isUserLogin, imageUrl } = useAppSelector((state) => state.auth);



    const formik = useFormik({
        initialValues: {
            profileImage: "",
        },
        validationSchema: Yup.object({
            profileImage: Yup.mixed()
                .test("fileType", "Only JPG, JPEG, and PNG files are allowed!", (value) => {
                    if (!value) return true; // Eğer kullanıcı yeni bir resim seçmemişse hata döndürme
                    return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
                }),
        }),
        onSubmit: async (values) => {
            if (!values.profileImage) {
                toast("Please select an image first!");
                return;
            }

            setUpdating(true);
            const formData = new FormData();
            formData.append("imageFile", values.profileImage);

            try {
                const response = await uploadImage(formData);
                console.log("Uploaded Image ID:", response.data.imageId);

                dispatch(setImageURL(response.data.imageId));

                if (response.data.token) {
                    encryptedLocalStorage.setItem("token", response.data.token);
                    console.log("Updated token:", response.data.token);
                }



                const updatedUserResponse = await getUser();
                console.log("Updated user:", updatedUserResponse.data);
                dispatch(loginSuccess(updatedUserResponse.data));

                setUpdating(false);
                toast("Profile image updated successfully!");
            } catch (err) {
                setUpdating(false);
                error(err?.response?.data?.message || "Image upload failed");
            }
        },
    });

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            toast("Please upload a valid image file!");
            return;
        }

        if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
            toast("Only JPG, JPEG, and PNG files are allowed!");
            return;
        }

        // Dosyayı ekrana hemen önizleme olarak yansıt
        const reader = new FileReader();
        reader.onloadend = () => {
            dispatch(setImageURL(reader.result)); // Redux store'da güncelle
        };
        reader.readAsDataURL(file);

        // Formik state'ini güncelle
        formik.setFieldValue("profileImage", file);
    };
    useEffect(() => {
        if (!isUserLogin) {
            toast("Please log in to update your profile!");
            navigate("/login");
        }
    }, [isUserLogin, navigate]);
    return (
        <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mt-5 flex flex-col items-center" controlId="profileImageInput">
                <label htmlFor="profileImageInput" className="relative cursor-pointer">
                    <img
                        src={imageUrl || "/default-profile.png"}
                        alt="Uploaded Profile"
                        className="h-60 w-60 rounded-full p-3 mb-10 shadow-md"
                    />
                    {/* {updating ? "Updating..." :  */}
                    <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md">
                        <HiArrowLongRight className="text-gray-600 hover:text-slate-500" />
                    </div>
                    {/* } */}

                </label>

                <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                />

                {formik.touched.profileImage && formik.errors.profileImage && (
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.profileImage}
                    </Form.Control.Feedback>
                )}
            </Form.Group>

            <button
                type="submit"
                className="btn btn-primary mt-4"
                disabled={updating || !formik.values.profileImage}
            >
                {updating ? "Updating..." : "Update Profile Image"}
            </button>
        </Form>
    );
};

export default UpdateProfileImage;
