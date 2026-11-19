
import React, { useRef, useState } from "react";

import { BiSolidPencil } from "react-icons/bi";
import { MdPhotoCamera } from "react-icons/md";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { BsFillSave2Fill } from "react-icons/bs";

import defaultImage from "../../../../../assets/img/user.webp";
import { useAppDispatch } from "../../../../../redux/store/hooks";
import { createUserGroupChat } from "../../../../../redux/store/slices/chat/chat-thunks/create-user-group-chat";
import { error, toast } from "../../../../../helper/swal";

const CreateGroupCard = ({ onSave }) => {
  const fileInputRef = useRef(null);

  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(defaultImage);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // Fotoğraf seçimi
  const handleImageChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("JPG, PNG veya WEBP formatında bir fotoğraf seçin.");
      event.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Fotoğraf en fazla 5 MB olabilir.");
      event.target.value = "";
      return;
    }

    setImageFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  // Kaydetme
  
const handleSubmit = async (event) => {
  event.preventDefault();

  if (!groupName.trim()) {
    error("Lütfen grup adını girin.");
    return;
  }

  const groupData = {
    groupName: groupName.trim(),
    description: description.trim(),
  };

  try {
    setLoading(true);

    const result = await dispatch(
      createUserGroupChat(groupData)
    ).unwrap();

    toast("Grup başarıyla oluşturuldu.");

    console.log("Oluşturulan grup:", result);

  } catch (err) {
    console.error("Grup oluşturma hatası:", err);

    error(
      typeof err === "string"
        ? err
        : "Grup oluşturulamadı."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-surface shadow-lg"
    >
      {/* Yeşil başlık */}
      <div className="shrink-0 bg-gradient-to-r from-primary-dark via-primary to-primary-light px-5 py-5 sm:px-7">
        <p className="text-xs font-semibold tracking-widest text-white/70">
          GRUP YÖNETİMİ
        </p>

        <h2 className="mt-1 text-xl font-bold text-white">
          Yeni grup oluştur
        </h2>

        <p className="mt-1 text-sm text-white/80">
          Grubunuzun fotoğrafını ve bilgilerini belirleyin.
        </p>
      </div>

      {/* Form içeriği */}
      <div className="flex min-h-0 w-full flex-1 flex-col gap-6 p-5 sm:p-7">

        {/* Fotoğraf alanı */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={preview}
              alt="Grup fotoğrafı"
              className="h-32 w-32 rounded-full border-4 border-white bg-background object-cover shadow-md ring-2 ring-primary/20 sm:h-36 sm:w-36"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-white shadow-md transition hover:bg-primary-dark"
              aria-label="Grup fotoğrafı seç"
            >
              <MdPhotoCamera className="h-5 w-5" />
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />

          <p className="mt-3 text-xs text-text-secondary">
            Grup fotoğrafı seçin (JPG, PNG veya WEBP - Maks. 5 MB)
          </p>

          {imageFile && (
            <p className="mt-2 max-w-full truncate text-xs font-medium text-primary">
              {imageFile.name}
            </p>
          )}
        </div>

        {/* Grup adı */}
        <div className="w-full min-w-0">
          <label
            htmlFor="groupName"
            className="mb-2 block text-sm font-semibold text-text"
          >
            Grup adı
            <span className="ml-1 font-normal text-text-muted">
              (Zorunlu)
            </span>
          </label>

          <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-white px-3 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
            <input
              id="groupName"
              type="text"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              placeholder="Grup adını girin"
              maxLength={80}
              className="w-full min-w-0 bg-transparent py-3 text-sm text-text outline-none placeholder:text-text-muted"
            />

            <BiSolidPencil className="h-5 w-5 shrink-0 text-text-muted" />
          </div>

          <p className="mt-1 text-right text-xs text-text-muted">
            {groupName.length}/80
          </p>
        </div>

        {/* Grup açıklaması */}
        <div className="w-full min-w-0">
          <div className="mb-2 flex items-center justify-between gap-2">
            <label
              htmlFor="groupDescription"
              className="text-sm font-semibold text-text"
            >
              Grup açıklaması
            </label>

            <TfiCommentsSmiley className="h-5 w-5 text-primary" />
          </div>

          <textarea
            id="groupDescription"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Grubunuzun amacını, kurallarını veya üyeler için önemli bilgileri yazın..."
            rows={5}
            maxLength={500}
            className="w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
          />

          <p className="mt-1 text-right text-xs text-text-muted">
            {description.length}/500
          </p>
        </div>
      </div>

      {/* Alt buton alanı */}
      <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-border bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-xs text-text-secondary">
          Grup bilgilerini istediğiniz zaman güncelleyebilirsiniz.
        </p>

        <button
          type="submit"
          disabled={loading || !groupName.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <BsFillSave2Fill className="h-4 w-4" />

          {loading ? "Oluşturuluyor..." : "Grup oluştur"}
        </button>
      </div>
    </form>
  );
};

export default CreateGroupCard;
