
import React, { useEffect, useState } from "react";
import {
  FiCamera,
  FiUsers,
  FiGlobe,
  FiSave,
  FiImage,
  FiX,
} from "react-icons/fi";

import defaultImage from "../../../../../assets/img/user.webp";

const CreateComminityGroup = ({ onSave }) => {
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(defaultImage);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (typeof preview === "string" && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMessage("Lütfen JPEG, PNG veya WEBP formatında bir fotoğraf seçin.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrorMessage("Fotoğraf boyutu en fazla 5 MB olabilir.");
      event.target.value = "";
      return;
    }

    setErrorMessage("");
    setImageFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setPreview(defaultImage);
  };

  const resetForm = () => {
    setCommunityName("");
    setDescription("");
    setImageFile(null);
    setPreview(defaultImage);
    setErrorMessage("");

    const input = document.getElementById("community-image");
    if (input) input.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!communityName.trim()) {
      setErrorMessage("Lütfen topluluk adını girin.");
      return;
    }

    if (!onSave) {
      setErrorMessage("Topluluk kayıt işlemi henüz bağlanmadı.");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      await onSave({
        communityName: communityName.trim(),
        description: description.trim(),
        image: imageFile,
      });

      resetForm();
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message ||
        (typeof error === "string"
          ? error
          : "Topluluk oluşturulurken bir hata oluştu.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
    >
      <div className="flex items-center gap-3 border-b border-border bg-background/70 px-5 py-4 sm:px-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <FiGlobe size={22} />
        </div>
        <div>
          <h2 className="text-base font-bold text-text sm:text-lg">
            Create Community
          </h2>
          <p className="mt-0.5 text-xs text-text-muted">
            Build a new community and bring people together.
          </p>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        <div className="flex flex-col items-center">
          <div className="group relative">
            <img
              src={preview}
              alt="Community preview"
              className="h-32 w-32 rounded-2xl border-4 border-primary-soft object-cover shadow-sm sm:h-36 sm:w-36"
            />

            <label
              htmlFor="community-image"
              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-2xl bg-black/0 text-white transition group-hover:bg-black/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white opacity-90 shadow-lg transition group-hover:scale-105">
                <FiCamera size={21} />
              </span>
            </label>

            {imageFile && (
              <button
                type="button"
                onClick={handleRemoveImage}
                aria-label="Remove image"
                className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-danger text-white shadow-md transition hover:bg-red-700"
              >
                <FiX size={15} />
              </button>
            )}
          </div>

          <input
            id="community-image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />

          <p className="mt-3 text-xs font-medium text-text-secondary">
            <FiImage className="mr-1 inline" size={14} />
            Community photo
          </p>
          <p className="mt-1 text-xs text-text-muted">
            JPEG, PNG or WEBP · Max 5 MB
          </p>
        </div>

        <div>
          <label
            htmlFor="community-name"
            className="mb-2 block text-sm font-semibold text-text"
          >
            Community Name
            <span className="ml-1 text-danger">*</span>
          </label>

          <input
            id="community-name"
            type="text"
            value={communityName}
            onChange={(event) => setCommunityName(event.target.value)}
            placeholder="Enter community name"
            maxLength={60}
            required
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
          />

          <p className="mt-1 text-right text-xs text-text-muted">
            {communityName.length}/60
          </p>
        </div>

        <div>
          <label
            htmlFor="community-description"
            className="mb-2 block text-sm font-semibold text-text"
          >
            Community Description
          </label>

          <textarea
            id="community-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Tell people what your community is about..."
            rows={5}
            maxLength={500}
            className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-6 text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
          />

          <p className="mt-1 text-right text-xs text-text-muted">
            {description.length}/500
          </p>
        </div>

        <div className="flex gap-3 rounded-xl border border-primary/10 bg-primary-soft p-4">
          <FiUsers className="mt-0.5 shrink-0 text-primary" size={19} />
          <p className="text-xs leading-5 text-primary-dark">
            Give your community a clear name and description so people can
            understand its purpose.
          </p>
        </div>

        {errorMessage && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-border bg-background/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-7">
        <button
          type="button"
          onClick={resetForm}
          disabled={loading}
          className="rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text-secondary transition hover:bg-background disabled:opacity-50"
        >
          Clear
        </button>

        <button
          type="submit"
          disabled={loading || !communityName.trim()}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiSave size={17} />
          {loading ? "Creating..." : "Create Community"}
        </button>
      </div>
    </form>
  );
};

export default CreateComminityGroup;
