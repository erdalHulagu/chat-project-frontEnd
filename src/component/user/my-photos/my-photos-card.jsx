import React, { useEffect, useState } from "react";

import {
    HiOutlinePhoto,
    HiOutlineTrash,
    HiOutlineXMark,
    HiOutlineArrowLeft,
} from "react-icons/hi2";

import {
    deleteImage,
    getImageById,
} from "../../../api/service/image-service";

import {
    deleteUsersImage,
} from "../../../api/service/user-service";

import {
    getImageId,
    revokeImageObjectUrl,
} from "../../../helper/profile-image-utils";

const MyPhotos = ({ myImages = [] }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let cancelled = false;
        const createdUrls = [];

        const fetchImages = async () => {
            if (!Array.isArray(myImages) || myImages.length === 0) {
                setImageUrls([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setErrorMessage("");

            try {
                const results = await Promise.all(
                    myImages.map(async (image, index) => {
                        const imageId = getImageId(image);

                        if (
                            typeof image === "string" &&
                            (
                                image.startsWith("http://") ||
                                image.startsWith("https://") ||
                                image.startsWith("blob:") ||
                                image.startsWith("data:")
                            )
                        ) {
                            return {
                                id: image,
                                imageId: null,
                                url: image,
                                isObjectUrl: false,
                            };
                        }

                        if (!imageId) return null;

                        try {
                            const response = await getImageById(imageId);

                            const blob = new Blob([response.data], {
                                type:
                                    response.headers?.["content-type"] ||
                                    "image/jpeg",
                            });

                            const url = URL.createObjectURL(blob);
                            createdUrls.push(url);

                            return {
                                id: imageId || index,
                                imageId,
                                url,
                                isObjectUrl: true,
                            };
                        } catch (error) {
                            console.error("Fotoğraf yüklenemedi:", imageId, error);
                            return null;
                        }
                    })
                );

                if (!cancelled) {
                    setImageUrls(results.filter(Boolean));
                }
            } catch (error) {
                console.error("Fotoğraflar yüklenemedi:", error);

                if (!cancelled) {
                    setErrorMessage("Fotoğraflar yüklenirken bir hata oluştu.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchImages();

        return () => {
            cancelled = true;
            createdUrls.forEach(revokeImageObjectUrl);
        };
    }, [myImages]);

    const handleDeletePhoto = async () => {
        if (!selectedPhoto || deleting) return;

        if (!selectedPhoto.imageId) {
            setErrorMessage("Bu fotoğraf için geçerli bir görsel ID'si bulunamadı.");
            return;
        }

        const confirmed = window.confirm(
            "Bu fotoğrafı kalıcı olarak silmek istediğinize emin misiniz?"
        );

        if (!confirmed) return;

        setDeleting(true);
        setErrorMessage("");

        try {
            const imageId = selectedPhoto.imageId;

            await deleteUsersImage(imageId);
            await deleteImage(imageId);

            setImageUrls((previous) =>
                previous.filter((photo) => photo.id !== selectedPhoto.id)
            );

            if (selectedPhoto.isObjectUrl) {
                revokeImageObjectUrl(selectedPhoto.url);
            }

            setSelectedPhoto(null);
        } catch (error) {
            console.error("Fotoğraf silinemedi:", error);

            setErrorMessage(
                error.response?.data?.message ||
                "Fotoğraf silinirken bir hata oluştu. Lütfen tekrar deneyin."
            );
        } finally {
            setDeleting(false);
        }
    };

    const closePhoto = () => {
        if (deleting) return;
        setSelectedPhoto(null);
    };

    return (
        <div className="w-full rounded-2xl border border-slate-300 bg-white p-4 shadow-xl shadow-slate-900/10 sm:p-6">

            {/* Başlık */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#075E45] text-white shadow-lg shadow-[#075E45]/25">
                        <HiOutlinePhoto className="h-6 w-6" />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#043D30]">
                            Fotoğraf Galerim
                        </h2>
                        <p className="text-sm text-slate-500">
                            Fotoğraflarınızı görüntüleyin ve yönetin.
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-[#075E45] px-3 py-1.5 text-sm font-semibold text-white shadow-sm">
                    {imageUrls.length} fotoğraf
                </span>
            </div>

            {/* Hata mesajı */}
            {errorMessage && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                </div>
            )}

            {/* Yükleniyor */}
            {loading ? (
                <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 py-16">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-[#075E45]" />
                    <p className="mt-4 text-sm font-medium text-slate-600">
                        Fotoğraflar yükleniyor...
                    </p>
                </div>
            ) : imageUrls.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-[#F1F5F9] px-4 py-16 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
                        <HiOutlinePhoto className="h-10 w-10 text-slate-400" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-[#043D30]">
                        Henüz fotoğrafınız yok
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                        Eklediğiniz fotoğraflar burada görüntülenecek.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#F1F5F9] p-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {imageUrls.map((photo) => (
                        <button
                            key={photo.id}
                            type="button"
                            onClick={() => setSelectedPhoto(photo)}
                            className="group relative aspect-square overflow-hidden rounded-xl border-2 border-white bg-slate-200 text-left shadow-md transition duration-300 hover:-translate-y-1 hover:border-[#075E45] hover:shadow-xl"
                        >
                            <img
                                src={photo.url}
                                alt="Galeri fotoğrafı"
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-[#043D30]/0 transition duration-300 group-hover:bg-[#043D30]/60">
                                <HiOutlinePhoto className="h-8 w-8 text-white opacity-0 transition duration-300 group-hover:opacity-100" />
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* Fotoğraf modalı */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#021F18]/90 p-4 backdrop-blur-md"
                    onClick={closePhoto}
                >
                    <div
                        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        {/* Modal başlığı */}
                        <div className="flex items-center justify-between border-b border-slate-200 bg-[#F1F5F9] px-4 py-4 sm:px-6">
                            <div className="flex items-center gap-2">
                                <HiOutlinePhoto className="h-5 w-5 text-[#075E45]" />
                                <h3 className="font-bold text-[#043D30]">
                                    Fotoğraf Detayı
                                </h3>
                            </div>

                            <button
                                type="button"
                                onClick={closePhoto}
                                disabled={deleting}
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-600 transition hover:bg-[#075E45] hover:text-white disabled:opacity-50"
                            >
                                <HiOutlineXMark className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Büyük fotoğraf */}
                        <div className="flex max-h-[65vh] items-center justify-center bg-slate-200 p-3 sm:p-6">
                            <img
                                src={selectedPhoto.url}
                                alt="Seçilen fotoğraf"
                                className="max-h-[60vh] max-w-full rounded-xl bg-white object-contain shadow-lg"
                            />
                        </div>

                        {/* Alt butonlar */}
                        <div className="flex flex-col gap-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                            <p className="text-sm text-slate-500">
                                Bu fotoğrafı galerinizden kaldırabilirsiniz.
                            </p>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={closePhoto}
                                    disabled={deleting}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#075E45] hover:bg-[#E2E8F0] hover:text-[#043D30] disabled:opacity-50 sm:flex-none"
                                >
                                    <HiOutlineArrowLeft className="h-5 w-5" />
                                    Geri dön
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeletePhoto}
                                    disabled={deleting}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
                                >
                                    {deleting ? (
                                        <>
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                            Siliniyor...
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlineTrash className="h-5 w-5" />
                                            Fotoğrafı Sil
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPhotos;
