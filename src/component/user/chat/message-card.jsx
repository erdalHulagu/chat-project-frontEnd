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
            className={`flex w-full min-w-0 overflow-hidden px-2 py-1 ${
                isReceived ? "justify-start" : "justify-end"
            }`}
        >
            <div
                className={`w-fit min-w-0 max-w-[88%] overflow-hidden px-3 py-2.5 shadow-sm sm:max-w-[75%] sm:px-4 sm:py-3 md:max-w-[65%] ${
                    isReceived
                        ? "rounded-2xl rounded-bl-md border border-border bg-surface text-text"
                        : "rounded-2xl rounded-br-md bg-primary text-white"
                }`}
            >
                {/* IMAGE ATTACHMENT */}
                {img && (
                    <div className="mb-2 max-w-full overflow-hidden rounded-xl">
                        <img
                            src={img}
                            alt="Message attachment"
                            className="max-h-72 w-full max-w-full rounded-xl object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                {/* MESSAGE CONTENT */}
                {content && (
                    <p className="max-w-full whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-sm leading-6">
                        {content}
                    </p>
                )}

                {/* MESSAGE TIME */}
                {formattedTime && (
                    <div
                        className={`mt-1.5 flex items-center justify-end gap-1 whitespace-nowrap text-[10px] ${
                            isReceived
                                ? "text-text-muted"
                                : "text-white/70"
                        }`}
                    >
                        <span>{formattedTime}</span>

                        {!isReceived && (
                            <BsCheck2All
                                size={13}
                                className="shrink-0 text-white/80"
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageCard;