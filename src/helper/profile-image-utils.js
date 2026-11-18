
import { getImageById } from "../api/service/image-service";

// Varsayılan profil fotoğrafı
export const DEFAULT_IMAGE = require("../assets/img/user.webp");

/**
 * Backend'den gelen görsel bilgisinden ID bulur.
 * profileImage alanı string veya nesne olabilir.
 */
export const getImageId = (image) => {
    if (!image) return null;

    if (typeof image === "string") {
        // URL değerlerini görsel ID'si olarak değerlendirme.
        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("blob:") ||
            image.startsWith("data:")
        ) {
            return null;
        }

        return image;
    }

    if (typeof image === "object") {
        return (
            image.imageId ||
            image.id ||
            image._id ||
            image.uuid ||
            null
        );
    }

    return null;
};

/**
 * Backend görselini tarayıcıda gösterilebilir Blob URL'ye çevirir.
 */
export const createImageObjectUrl = async (image) => {
    if (!image) return DEFAULT_IMAGE;

    // Görsel zaten URL ise tekrar backend'e istek gönderme.
    if (typeof image === "string") {
        if (
            image.startsWith("http://") ||
            image.startsWith("https://") ||
            image.startsWith("blob:") ||
            image.startsWith("data:")
        ) {
            return image;
        }
    }

    const imageId = getImageId(image);

    if (!imageId) {
        return DEFAULT_IMAGE;
    }

    try {
        const response = await getImageById(imageId);

        const contentType =
            response.headers?.["content-type"] ||
            "image/jpeg";

        const blob = new Blob([response.data], {
            type: contentType,
        });

        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Görsel yüklenemedi:", error);
        return DEFAULT_IMAGE;
    }
};

/**
 * Yalnızca uygulamanın oluşturduğu Blob URL'lerini temizler.
 */
export const revokeImageObjectUrl = (url) => {
    if (
        typeof url === "string" &&
        url.startsWith("blob:")
    ) {
        URL.revokeObjectURL(url);
    }
};
