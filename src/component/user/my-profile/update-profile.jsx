
import React, { useEffect, useState } from "react";
import { Form, Spinner, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { updateUserProfile } from "../../../redux/store/slices/user/user/upDateUser/update-user-action";
import { HiArrowLongRight } from "react-icons/hi2";
import { useFormik } from "formik";
import ReactInputMask from "react-input-mask-next";
import { getImageById, uploadImage } from "../../../api/service/image-service";
import { updateUser } from "../../../api/service/user-service";
import { NULL } from "sass";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isUserLogin, user, imageUrl } = useAppSelector((state) => state.auth);
  const [update, setUpdate] = useState(false)
  const [updating, setUpdating] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(imageUrl || "../../../assets/img/user.webp");
  const [imageReturnId, setImageReturnId] = useState("")
  const imageId1=useParams();

  useEffect(() => {
    if (!isUserLogin) {
      toast.error("Please log in to update your profile!");
      navigate("/login");
    }
  }, [isUserLogin, navigate]);

  const updateProfile = () => {
    setUpdate(!update);
  }

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    phone: user.phone || "",
    address: user.address || "",
    postCode: user.postCode || "",
    email: user.email || "",
    profileImage: null || "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    address: Yup.string().required("Address is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
  });

  const onSubmit = async (values) => {
    setUpdating(true);
    
    const formData = new FormData();
 
    formData.append("imageFile", values.profileImage);
    
   




    try {

      const uploadedImage = await uploadImage(formData);
      console.log("uploadImage.........",uploadImage)
      const imageId = uploadedImage.data.id;
      console.log("imageId..............", uploadedImage)
      delete values.imageFile;

      let newValues = {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        address: values.address,
        postCode: values.postCode,
        email: values.email,
       
    };

      const updatedUserData = await updateUser(newValues,imageId);
      console.log("updatedUserData:", updatedUserData.data);

      toast("Update successful");


      const imageResponse = await getImageById(imageId);
      const blob = new Blob([imageResponse.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setImageReturnId(imageUrl);


    } catch (error) {
      toast.error("Failed to update profile. Try again!");
    } finally {
      setUpdating(false);
    }

  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("Please upload a valid image file!");

      
    }
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed!");
      
    }
    formik.setFieldValue("imageFile", file);

    const reader = new FileReader();
    reader.onloadend = () => setProfileImageUrl(reader.result);
    reader.readAsDataURL(file);




  };
  return (
    <div className="h-full w-full flex absolute">
      {/* Profil Görüntüleme */}
      <div className="rounded-l w-[40%] max-w-md h-full flex flex-col items-center justify-center bg-slate-200">
        {isUserLogin && (
          <div className="w-full max-w-md h-full relative flex flex-col items-center justify-center rounded-full">
            <div className="w-full h-[35%] max-w-md shadow-lg shadow-slate-800 flex items-center justify-center">
              <Form.Group
              // onSubmit={formik.handleSubmit}
                className="mt-5 flex flex-col items-center"
                controlId="profileImageInput"
              >
                {/* Profil Resmi */}
                <label htmlFor="profileImageInput" className="relative cursor-pointer">
                  <img
                    src={profileImageUrl}
                    alt="Uploaded Profile"
                    className="h-60 w-60 rounded-full p-3 mb-10 shadow-md"
                  />
                  <div className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md">
                    <HiArrowLongRight className="text-gray-600 hover:text-blue-500" />
                  </div>
                </label>

                {/* Gizli Dosya Input */}
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
            </div>

            {/* Kullanıcı Detayları */}
            <div className="h-[80%] w-full flex flex-col">
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                First Name <span className="text-slate-600">{user.firstName}</span>
              </div>
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Last Name <span className="text-slate-600">{user.lastName}</span>
              </div>
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Phone Number <span className="text-slate-600">{user.phone}</span>
              </div>
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Email Address <span className="text-slate-600">{user.email}</span>
              </div>
              <div className="p-3 flex flex-col h-24 text-sm shadow-lg shadow-slate-800 text-gray-500">
                Post Code <span className="text-slate-600">{user.postCode}</span>
              </div>
              <div className="p-3 flex flex-col h-full text-sm shadow-lg shadow-slate-800 text-gray-500">
                Address <span className="text-slate-600">{user.address}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profil Güncelleme */}
      <div className="h-full w-[70%] rounded">
        <div className="opacity-80 w-full h-full rounded max-w-2xl flex justify-evenly item-center">
          {!update ? (
            <div className="h-30 w-full flex  justify-end items-start">
              <div
                onClick={updateProfile}
                className="flex my-2 mr-4 h-10 w-auto gap-2 items-center cursor-pointer justify-evenly hover:text-red-600 text-gray-300"
              >
                <HiArrowLongRight />
                Update Profile
              </div>
            </div>
          ) : (

            <Form
              className="w-[70%] text-white "
              noValidate
              onSubmit={formik.handleSubmit}
            >
              {/* <fieldset disabled={builtIn}> */}
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("firstName")}
                  isInvalid={formik.touched.firstName && formik.errors.firstName}
                  isValid={formik.touched.firstName && !formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("lastName")}
                  isInvalid={formik.touched.lastName && formik.errors.lastName}
                  isValid={formik.touched.lastName && !formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  // as={ReactInputMask}
                  // mask="(999) 999-9999"
                  {...formik.getFieldProps("phone")}
                  isInvalid={formik.touched.phone && formik.errors.phone}
                  isValid={formik.touched.phone && !formik.errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("address")}
                  isInvalid={formik.touched.address && formik.errors.address}
                  isValid={formik.touched.address && !formik.errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Post Code</Form.Label>
                <Form.Control
                  type="text"
                  {...formik.getFieldProps("postCode")}
                  isInvalid={formik.touched.postCode && formik.errors.postCode}
                  isValid={formik.touched.postCode && !formik.errors.postCode}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.zipCode}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  {...formik.getFieldProps("email")}
                  isInvalid={formik.touched.email && formik.errors.email}
                  isValid={formik.touched.email && !formik.errors.email}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.email}
                </Form.Control.Feedback>
              </Form.Group>


              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  {updating ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      variant="light"
                      className="mr-2"
                    />
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setUpdating(false)}
                  className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;