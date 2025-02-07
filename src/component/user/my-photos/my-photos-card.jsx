// import React, { useState } from 'react'
// import {  BiSolidLeftArrowSquare, BiSolidTrash } from 'react-icons/bi';

// const MyPhotos = ({isEnlarged, handleToggleSize,myImages}) => {


//   // const [isEnlarged, setIsEnlarged] = useState(false);

//   // const handleToggleSize = () => {
//   //   setIsEnlarged(!isEnlarged);
//   // };
  

//   const imageDisplay = (myImages) => {
//     if (!myImages || myImages.length === 0) return;
  
//     const imageUrls = myImages.map((image) => {
//       const imageBlob = new Blob([image], { type: "image/png" });
//       return URL.createObjectURL(imageBlob);
//     });

//   return (


//     <div className={`${isEnlarged ? ' w-full h-auto  flex justify-center items-center  ' : 'object-cover  m-2 w-[92%] h-auto rounded hover:w-[96%] hover:flex  shadow-2xl shadow-slate-800 cursor-pointer'}`}>
//     {/* <div className={`${isEnlarged ? 'object-fill h-48 w-96 z-10 mb-20 ' : 'flex items-center h-40 w-80 m-4 p-2'}`}> */}
//       <div className='w-full h-auto relative '>
//         <img onClick={handleToggleSize} className=' object-cover  max-h-[85vh] w-full h-auto rounded hover:opacity-90 cursor-pointer ' src={imageDisplay} alt="" />
//           <BiSolidLeftArrowSquare onClick={handleToggleSize}  className={`${!isEnlarged ? 'hidden' : 'hover:opacity-40 absolute rounded-full w-14 h-14 p-3 hover:bg-slate-100 top-1 left-1 text-slate-200 hover:text-red-800 cursor-pointer'}`} />
//           <BiSolidTrash className={`${isEnlarged ? 'hidden' : 'hover:opacity-40 absolute rounded-full w-14 h-14 p-3 hover:bg-slate-100 top-1 right-1 text-slate-200 hover:text-red-800 cursor-pointer'}`} />
//         {/* </div> */}
//       </div>
//     </div>


//   )
// }

// export default MyPhotos
import React, { useEffect, useState } from "react";
import { BiSolidLeftArrowSquare, BiSolidTrash } from "react-icons/bi";
import { getImageById } from "../../../api/service/image-service";
 // API metodunu içe aktar

const MyPhotos = ({ isEnlarged, handleToggleSize, myImages }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (!myImages || myImages.length === 0) return;

    const fetchImages = async () => {
      try {
        // İç içe dizileri düzleştir
        // const imageIds = myImages.flat().filter((id) => typeof id === "string");

        // ID'ler ile API'den resimleri çek
        const urls = await Promise.all(
          myImages.map(async (image) => {
            try {
              const response = await getImageById(image); // API çağrısı
              const imageBlob = new Blob([response.data], { type: "image/png" });
              return URL.createObjectURL(imageBlob);
            } catch (error) {
              console.error("Error fetching image:", error);
              return null; // Hata durumunda null döndür
            }
          })
        );

        // null olmayanları filtreleyerek state'e ata
        setImageUrls(urls.filter((url) => url !== null));
      } catch (error) {
        console.error("Error processing images:", error);
      }
    };

    fetchImages();

    // Bellek sızıntısını önlemek için cleanup işlemi
    return () => {
      imageUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [myImages]);

  return (
    <div
      className={`${
        isEnlarged
          ? "w-full h-auto flex justify-center items-center"
          : "object-cover m-2 w-[92%] h-auto rounded hover:w-[96%] hover:flex shadow-2xl shadow-slate-800 cursor-pointer"
      }`}
    >
      <div className="w-full h-auto relative">
        {imageUrls.length > 0 ? (
          <img
            onClick={handleToggleSize}
            className="object-cover max-h-[85vh] w-full h-auto rounded hover:opacity-90 cursor-pointer"
            src={imageUrls} // İlk resmi gösteriyoruz
            alt="Uploaded"
          />
        ) : (
          <p className="text-center text-gray-500">No Image Available</p>
        )}

        {/* Büyütme/Kapatma Butonu */}
        <BiSolidLeftArrowSquare
          onClick={handleToggleSize}
          className={`${
            !isEnlarged
              ? "hidden"
              : "hover:opacity-40 absolute rounded-full w-14 h-14 p-3 hover:bg-slate-100 top-1 left-1 text-slate-200 hover:text-red-800 cursor-pointer"
          }`}
        />

        {/* Silme Butonu */}
        <BiSolidTrash
          className={`${
            isEnlarged
              ? "hidden"
              : "hover:opacity-40 absolute rounded-full w-14 h-14 p-3 hover:bg-slate-100 top-1 right-1 text-slate-200 hover:text-red-800 cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
};

export default MyPhotos;

