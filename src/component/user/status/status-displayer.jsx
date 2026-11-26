import React, { useEffect, useState } from "react";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import ProgressBar from "./progress-bar/progres-bar";

const STORY_DURATION = 5000;

const StatusDisplayer = ({
  stories = [],
  user = {},
  onClose,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const currentStory = stories?.[currentStoryIndex];

  const userName =
    user.name ||
    user.username ||
    user.fullName ||
    "Status";

  const userImage =
    user.profileImage ||
    user.image ||
    user.avatar ||
    "https://placehold.co/100x100/E6F2ED/075E45?text=User";

  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((previous) => previous + 1);
    } else {
      onClose?.();
    }
  };

  const handlePreviousStory = () => {
    setCurrentStoryIndex((previous) =>
      Math.max(previous - 1, 0)
    );
  };

  // Her status için tek bir otomatik ilerleme timer'ı.
  useEffect(() => {
    if (!stories?.length) return;

    const timeoutId = setTimeout(() => {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((previous) => previous + 1);
      } else {
        onClose?.();
      }
    }, STORY_DURATION);

    return () => clearTimeout(timeoutId);
  }, [currentStoryIndex, stories, onClose]);

  if (!stories?.length) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-background p-6 text-center">
        <p className="font-semibold text-text">
          No status available
        </p>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!currentStory) return null;

  const image =
    currentStory.image ||
    currentStory.imageUrl ||
    currentStory.mediaUrl;

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-slate-950">

      {/* Story progress bars */}
      <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 px-3 pt-3">
        {stories.map((story, index) => (
          <ProgressBar
            key={story.id || story._id || index}
            index={index}
            activeIndex={currentStoryIndex}
            duration={STORY_DURATION}
          />
        ))}
      </div>

      {/* Header */}
      <div className="absolute left-0 right-0 top-5 z-20 flex items-center gap-3 px-4 py-3">
        <img
          src={userImage}
          alt={userName}
          onError={(event) => {
            event.currentTarget.src =
              "https://placehold.co/100x100/E6F2ED/075E45?text=User";
          }}
          className="h-10 w-10 rounded-full border-2 border-white/80 object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {userName}
          </p>

          <p className="text-xs text-white/70">
            {currentStory.time ||
              currentStory.createdAt ||
              "Status update"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close status"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-white/20"
        >
          <FiX size={22} />
        </button>
      </div>

      {/* Story image */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-16">
        {image ? (
          <img
            src={image}
            alt="Status update"
            className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary-dark p-8 text-center">
            <p className="text-2xl font-semibold text-white">
              {currentStory.caption ||
                currentStory.text ||
                "Status update"}
            </p>
          </div>
        )}

        {/* Previous story */}
        <button
          type="button"
          onClick={handlePreviousStory}
          aria-label="Previous status"
          disabled={currentStoryIndex === 0}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/60 disabled:opacity-20"
        >
          <FiChevronLeft size={25} />
        </button>

        {/* Next story */}
        <button
          type="button"
          onClick={handleNextStory}
          aria-label="Next status"
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-black/60"
        >
          <FiChevronRight size={25} />
        </button>
      </div>

      {/* Caption */}
      {currentStory.caption && image && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-12">
          <p className="text-center text-sm text-white">
            {currentStory.caption}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusDisplayer;