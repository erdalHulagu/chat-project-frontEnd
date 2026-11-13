
import React, { useEffect, useState } from "react";
import CustomRouters from "./router/custom-routers";

import { useAppDispatch } from "./redux/store/hooks";
import { loginSuccess, loginFailed, setImageURL } from "./redux/store/slices/user/auth/auth-slice";

import { encryptedLocalStorage } from "./helper/auth-token/encrypt-storage";
import { getUser } from "./api/service/user-service";
import { getImageById } from "./api/service/image-service";

function App() {
    const dispatch = useAppDispatch();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const initializeAuth = async () => {
            try {
                const token = encryptedLocalStorage.getItem("token");

                if (!token) {
                    dispatch(loginFailed());
                    return;
                }

                const response = await getUser();

                if (!response.data) {
                    throw new Error("User information could not be loaded.");
                }

                dispatch(loginSuccess(response.data));

                const profileImageId = response.data.profileImage;

                if (profileImageId) {
                    try {
                        const imageResponse = await getImageById(profileImageId);

                        const imageBlob = new Blob([imageResponse.data], {
                            type: "image/png",
                        });

                        const imageUrl = URL.createObjectURL(imageBlob);

                        if (isMounted) {
                            dispatch(setImageURL(imageUrl));
                        } else {
                            URL.revokeObjectURL(imageUrl);
                        }
                    } catch (imageError) {
                        console.error("Profile image could not be loaded:", imageError);
                    }
                }
            } catch (authError) {
                console.error("Session validation failed:", authError);

                encryptedLocalStorage.removeItem("token");
                dispatch(loginFailed());
            } finally {
                if (isMounted) {
                    setCheckingAuth(false);
                }
            }
        };

        initializeAuth();

        return () => {
            isMounted = false;
        };
    }, [dispatch]);

    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-950">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
                    <p className="mt-4 text-sm text-white">
                        Checking your session...
                    </p>
                </div>
            </div>
        );
    }

    return <CustomRouters />;
}

export default App;
