
import React from "react";

const MessageCard = ({
  isRegUserMessage,
  content,
  img,
  createdAt,
}) => {
  const isReceived = isRegUserMessage;

  const formattedTime = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div
      className={`flex w-full px-2 ${
        isReceived ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-[85%] overflow-hidden rounded-2xl px-4 py-3 shadow-sm sm:max-w-[70%] md:max-w-[60%] ${
          isReceived
            ? "rounded-bl-sm bg-white text-slate-700"
            : "rounded-br-sm bg-indigo-600 text-white"
        }`}
      >
        {img && (
          <img
            src={img}
            alt="Message attachment"
            className="mb-2 max-h-72 w-full rounded-xl object-cover"
          />
        )}

        {content && (
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
            {content}
          </p>
        )}

        {formattedTime && (
          <div
            className={`mt-1 text-right text-[10px] ${
              isReceived ? "text-slate-400" : "text-indigo-200"
            }`}
          >
            {formattedTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageCard;
