
import React, { useEffect, useRef, useState } from "react";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiPlay,
  FiPause,
} from "react-icons/fi";

import ProgressBar from "./progress-bar/progres-bar";

const STORY_DURATION = 5000;

const StatusDisplayer = ({
  stories = [],
  user = {},
  onClose,
  onReshare,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showReshareConfirm, setShowReshareConfirm] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [videoDuration, setVideoDuration] = useState(STORY_DURATION);

  const videoRef = useRef(null);

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

  const media =
    currentStory?.image ||
    currentStory?.imageUrl ||
    currentStory?.mediaUrl;

  const isVideo =
    currentStory?.imageType?.startsWith("video/") ||
    currentStory?.type?.startsWith("video/");

  const handleNextStory = () => {
    setIsVideoPaused(false);

    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((previous) => previous + 1);
    } else {
      onClose?.();
    }
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((previous) => previous - 1);
      setIsVideoPaused(false);
    }
  };

  // Fotoğraflar 5 saniye sonra ilerler.
  // Videolar kendi süresi bitince ilerler.

  useEffect(() => {
    if (!stories?.length || isVideo) return;

    const timeoutId = setTimeout(() => {
      handleNextStory();
    }, STORY_DURATION);

    return () => clearTimeout(timeoutId);
  }, [currentStoryIndex, stories, isVideo]);

  // Yeni videoya geçildiğinde oynatma durumunu sıfırla.
  useEffect(() => {
    setIsVideoPaused(false);
    setVideoDuration(STORY_DURATION / 1000);
  }, [currentStoryIndex]);

  const handleVideoToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => { });
      setIsVideoPaused(false);
    } else {
      video.pause();
      setIsVideoPaused(true);
    }
  };

  const handleReshareConfirm = async () => {
    if (!currentStory?.id || !onReshare) return;

    await onReshare(currentStory.id);
    setShowReshareConfirm(false);
  };

  if (!stories?.length || !currentStory) {
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

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-slate-950">

      {/* Story progress bars */}
      <div className="absolute left-0 right-0 top-0 z-20 flex gap-1 px-3 pt-3">
        {stories.map((story, index) => (
          <ProgressBar
            key={story.id || story._id || index}
            index={index}
            activeIndex={currentStoryIndex}
            duration={isVideo ? videoDuration * 1000 : STORY_DURATION}
            isPaused={isVideo && isVideoPaused}
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

        {/* Reshare button */}
        {onReshare && (
          <button
            type="button"
            onClick={() => setShowReshareConfirm(true)}
            aria-label="Yeniden paylaş"
            className="flex h-10 items-center gap-2 rounded-full bg-white/20 px-3 text-sm font-semibold text-white transition hover:bg-white/30"
          >
            <FiShare2 size={18} />
            <span>Yeniden paylaş</span>
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          aria-label="Close status"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-white/20"
        >
          <FiX size={22} />
        </button>
      </div>

      {/* Story media */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-16">

        {media ? (
          isVideo ? (
            <div className="relative flex h-full w-full items-center justify-center">
              <video
                ref={videoRef}
                src={media}
                autoPlay
                playsInline
                onLoadedMetadata={(event) => {
                  const duration = event.currentTarget.duration;

                  if (Number.isFinite(duration) && duration > 0) {
                    setVideoDuration(Math.min(duration, 90));
                  }
                }}
                onEnded={handleNextStory}
                onPlay={() => setIsVideoPaused(false)}
                onPause={() => setIsVideoPaused(true)}
                onClick={handleVideoToggle}
                className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
              />

              <button
                type="button"
                onClick={handleVideoToggle}
                aria-label={isVideoPaused ? "Videoyu oynat" : "Videoyu duraklat"}
                className="absolute flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70"
              >
                {isVideoPaused ? (
                  <FiPlay size={28} />
                ) : (
                  <FiPause size={28} />
                )}
              </button>
            </div>
          ) : (
            <img
              src={media}
              alt="Status update"
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
            />
          )
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
      {currentStory.caption && media && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-12">
          <p className="text-center text-sm text-white">
            {currentStory.caption}
          </p>
        </div>
      )}

      {/* Reshare confirmation */}
      {showReshareConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">
              Status yeniden paylaşılsın mı?
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Bu kişinin statusu senin statuslarında da görünecek ve
              arkadaşların tarafından görüntülenebilecek.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowReshareConfirm(false)}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                Vazgeç
              </button>

              <button
                type="button"
                onClick={handleReshareConfirm}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Evet, paylaş
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDisplayer;
