
import React from "react";
import { BsCheck2All } from "react-icons/bs";

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
                className={`max-w-[88%] overflow-hidden px-4 py-3 shadow-sm sm:max-w-[75%] md:max-w-[65%] ${
                    isReceived
                        ? "rounded-2xl rounded-bl-md border border-slate-100 bg-white text-slate-700"
                        : "rounded-2xl rounded-br-md bg-emerald-700 text-white"
                }`}
            >
                {img && (
                    <img
                        src={img}
                        alt="Message attachment"
                        className="mb-2 max-h-72 w-full rounded-xl object-cover"
                    />
                )}{/* CHAT CONTENT */}

                {content && (
                    <p className="whitespace-pre-wrap break-words text-sm leading-6">
                        {content}
                    </p>
                )}

                {formattedTime && (
                    <div
                        className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] ${
                            isReceived ? "text-slate-400" : "text-emerald-100"
                        }`}
                    >
                        <span>{formattedTime}</span>

                        {!isReceived && (
                            <BsCheck2All size={13} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageCard;
