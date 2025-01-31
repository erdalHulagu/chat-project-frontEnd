import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "../../../helper/swal";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { updateUserProfile } from "../../../redux/store/slices/user/user/upDateUser/update-user-action";
import { HiArrowLongRight } from "react-icons/hi2";

const UpdateProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isUserLogin, user, imageUrl } = useAppSelector((state) => state.auth);
  const [update, setUpdate] = useState(true)
  const [updating, setUpdating] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(imageUrl || "../../../assets/img/user.webp");

  useEffect(() => {
    if (!isUserLogin) {
      toast.error("Please log in to update your profile!");
      navigate("/login");
    }
  }, [isUserLogin, navigate]);

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      address: user.address || "",
      postCode: user.postCode || "",
      profileImage: user.profileImage||"",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      address: Yup.string().required("Address is required"),
      profileImage: Yup.mixed().required("Profile image is required"),
    }),
    onSubmit: async (values) => {
      setUpdating(true);
      const formData = new FormData();
      // for (const key in values) {
      //   formData.append(key, values[key]);
      // }
      // formData.append("profileImage", values.profileImage);
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phone", values.phone);
      formData.append("address", values.address);
      formData.append("postCode", values.postCode);
     
  //   }
      try {
        await dispatch(updateUserProfile(formData,user.profileImage));
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error("Failed to update profile. Try again!");
      } finally {
        setUpdating(false);
      }
    },
  });
  const handleProfileImageChange  = async (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("profileImage", file);
        const reader = new FileReader();
        reader.onloadend = () => setProfileImageUrl(reader.result);
        reader.readAsDataURL(file);
    if (!file) {
      toast.error("Please upload a valid image file!");

      return;
    }
  
    // ✅ Geçerli resim türlerini belirle
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed!");
      return;
    }

  // const handleProfileImageChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     formik.setFieldValue("profileImage", file);
  //     // const reader = new FileReader();
  //     // reader.onloadend = () => setProfileImageUrl(reader.result);
  //     // reader.readAsDataURL(file);
  //   } else {
  //     toast.error("Please upload a valid image file!");
  //   }
  
  const updateProfile = () => {
    setUpdate(!update);
  };

  return (
    <div className="h-full w-full flex absolute">
      {/* Profil Görüntüleme */}
      <div className="rounded-l w-[40%] max-w-md h-full flex flex-col items-center justify-center bg-slate-200">
        {isUserLogin && (
          <div className="w-full max-w-md h-full relative flex flex-col items-center justify-center rounded-full">
            <div className="w-full h-[35%] max-w-md shadow-lg shadow-slate-800 flex items-center justify-center">
              <Form.Group
                className="mt-5 flex flex-col items-center"
                controlId="profileImage"
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
        <div className="opacity-80 w-full rounded max-w-2xl flex justify-center">
          {!update ? (
            <div className="h-30 w-full flex items-center justify-end">
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
              className="w-[70%] text-white"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              {/* Form Alanları */}
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  isInvalid={!!formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  isInvalid={!!formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  isInvalid={!!formik.errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  isInvalid={!!formik.errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.address}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="postCode">
                <Form.Label>Post Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Post Code"
                  name="postCode"
                  onChange={formik.handleChange}
                  value={formik.values.postCode}
                  isInvalid={!!formik.errors.postCode}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.postCode}
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
                  onClick={updateProfile}
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
}
export default UpdateProfile;
// import { useFormik } from "formik";
// import React, { useEffect, useState } from "react";
// import { Form, Spinner, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { toast } from "../../../helper/swal";
// import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
// import { updateUserProfile } from "../../../redux/store/slices/user/user/upDateUser/update-user-action";

// const UpdateProfile = () => {
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const { isUserLogin, user, imageUrl } = useAppSelector((state) => state.auth);
//   const [updating, setUpdating] = useState(false);
//   const [profileImageUrl, setProfileImageUrl] = useState(imageUrl || "../../../assets/img/user.webp");

//   useEffect(() => {
//     if (!isUserLogin) {
//       toast.error("Please log in to update your profile!");
//       navigate("/login");
//     }
//   }, [isUserLogin, navigate]);

//   const formik = useFormik({
//     initialValues: {
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       phone: user.phone || "",
//       address: user.address || "",
//       postCode: user.postCode || "",
//       profileImage: user.profileImage||"",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("First name is required"),
//       lastName: Yup.string().required("Last name is required"),
//       address: Yup.string().required("Address is required"),
//       profileImage: Yup.mixed().required("Profile image is required"),
//     }),
//     onSubmit: async (values) => {
//       setUpdating(true);
//       const formData = new FormData();
//       // for (const key in values) {
//       //   formData.append(key, values[key]);
//       // }
//       // formData.append("profileImage", values.profileImage);
//       formData.append("firstName", values.firstName);
//       formData.append("lastName", values.lastName);
//       formData.append("phone", values.phone);
//       formData.append("address", values.address);
//       formData.append("postCode", values.postCode);
     
//   //   }
//       try {
//         await dispatch(updateUserProfile(formData,user.profileImage));
//         toast.success("Profile updated successfully!");
//       } catch (error) {
//         toast.error("Failed to update profile. Try again!");
//       } finally {
//         setUpdating(false);
//       }
//     },
//   });
//   const handleProfileImageChange = async (event) => {
//     const file = event.target.files[0];
//     formik.setFieldValue("profileImage", file);
//         const reader = new FileReader();
//         reader.onloadend = () => setProfileImageUrl(reader.result);
//         reader.readAsDataURL(file);
//     if (!file) {
//       toast.error("Please upload a valid image file!");

//       return;
//     }
  
//     // ✅ Geçerli resim türlerini belirle
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Only JPG, JPEG, and PNG files are allowed!");
//       return;
//     }

//   // const handleProfileImageChange = async (event) => {
//   //   const file = event.target.files[0];
//   //   if (file) {
//   //     formik.setFieldValue("profileImage", file);
//   //     // const reader = new FileReader();
//   //     // reader.onloadend = () => setProfileImageUrl(reader.result);
//   //     // reader.readAsDataURL(file);
//   //   } else {
//   //     toast.error("Please upload a valid image file!");
//   //   }
  
  
//   };
//   return (
//     <div className="h-full w-full flex absolute">
//       <div className="rounded-l w-[40%] max-w-md h-full flex flex-col items-center justify-center bg-slate-200">
//         {isUserLogin && (
//           <div className="w-full max-w-md flex flex-col items-center justify-center">
//             <Form.Group className="mt-5 flex flex-col items-center" controlId="profileImage">
//               <label htmlFor="profileImageInput" className="cursor-pointer">
//                 <img src={profileImageUrl} alt="Profile" className="h-60 w-60 rounded-full p-3 mb-10 shadow-md" />
//               </label>
//               <input type="file" id="profileImageInput" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
//             </Form.Group>
//           </div>
//         )}
//       </div>
//       <div className="w-[60%] flex flex-col justify-center items-center">
//         <Form onSubmit={formik.handleSubmit} className="w-full max-w-lg">
//           <Form.Group controlId="firstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control type="text" {...formik.getFieldProps("firstName")} isInvalid={formik.touched.firstName && formik.errors.firstName} />
//             <Form.Control.Feedback type="invalid">{formik.errors.firstName}</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="lastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control type="text" {...formik.getFieldProps("lastName")} isInvalid={formik.touched.lastName && formik.errors.lastName} />
//             <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
//           </Form.Group>
//           <Form.Group controlId="address">
//             <Form.Label>Address</Form.Label>
//             <Form.Control type="text" {...formik.getFieldProps("address")} isInvalid={formik.touched.address && formik.errors.address} />
//             <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
//           </Form.Group>
//           <Button type="submit" disabled={updating} className="mt-3">
//             {updating ? <Spinner animation="border" size="sm" /> : "Update Profile"}
//           </Button>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;