"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PostContentProps {
  contentHtml: string;
}

interface ActiveImage {
  alt: string;
  src: string;
  height: number;
  width: number;
}

export default function PostContent({ contentHtml }: PostContentProps) {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleContentClick(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target;

    if (!(target instanceof HTMLImageElement)) {
      return;
    }

    setActiveImage({
      alt: target.alt,
      height: target.naturalHeight || target.height || 1200,
      src: target.currentSrc || target.src,
      width: target.naturalWidth || target.width || 1600,
    });
  }

  return (
    <>
      <div
        className="prose max-w-none"
        onClick={handleContentClick}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {activeImage && (
        <div
          className="post-lightbox"
          aria-modal="true"
          role="dialog"
          onClick={() => setActiveImage(null)}
        >
          <button
            type="button"
            className="post-lightbox-close"
            aria-label="Close image preview"
            onClick={() => setActiveImage(null)}
          >
            x
          </button>
          <figure
            className="post-lightbox-figure"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              className="post-lightbox-image"
              alt={activeImage.alt}
              src={activeImage.src}
              width={activeImage.width}
              height={activeImage.height}
              unoptimized
            />
            {activeImage.alt && (
              <figcaption className="post-lightbox-caption">
                {activeImage.alt}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
