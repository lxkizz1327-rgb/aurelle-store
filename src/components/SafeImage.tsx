"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { images } from "@/data/images";

/**
 * Same as the normal Next.js image, but if a picture file is missing or fails to
 * load, a soft placeholder is shown instead of a broken-image icon.
 */
export default function SafeImage({ src, alt, ...rest }: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const current = typeof src === "string" ? src : "";
  const failed = failedSrc !== null && failedSrc === current;

  return (
    <Image
      {...rest}
      src={failed ? images.fallback : src}
      alt={alt}
      unoptimized={failed ? true : rest.unoptimized}
      onError={() => setFailedSrc(current)}
    />
  );
}
