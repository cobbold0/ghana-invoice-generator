"use client";

import { useState, useCallback } from "react";
import { MONETIZATION } from "@/lib/monetization";

interface UseAdGatedDownloadOptions {
  onFinalDownload: () => void | Promise<void>;
  directLink1?: string;
  directLink2?: string;
}

export function useAdGatedDownload({
  onFinalDownload,
  directLink1 = MONETIZATION.astraDirectLink1,
  directLink2 = MONETIZATION.astraDirectLink2,
}: UseAdGatedDownloadOptions) {
  const [clickCount, setClickCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDownloadClick = useCallback(() => {
    if (clickCount === 0) {
      // 1st click: open ad/sponsor redirect in a new tab
      setClickCount(1);
      if (typeof window !== "undefined" && directLink1) {
        window.open(directLink1, "_blank", "noopener,noreferrer");
      }
    } else if (clickCount === 1) {
      // 2nd click: open ad/sponsor redirect 2 in a new tab
      setClickCount(2);
      if (typeof window !== "undefined" && directLink2) {
        window.open(directLink2, "_blank", "noopener,noreferrer");
      }
    } else {
      // 3rd click: open the download modal with ad banner
      setIsModalOpen(true);
    }
  }, [clickCount, directLink1, directLink2]);

  const handleModalConfirm = useCallback(async () => {
    setIsModalOpen(false);
    setClickCount(0); // reset counter for next download session
    await onFinalDownload();
  }, [onFinalDownload]);

  const resetCount = useCallback(() => {
    setClickCount(0);
  }, []);

  return {
    clickCount,
    isModalOpen,
    setIsModalOpen,
    handleDownloadClick,
    handleModalConfirm,
    resetCount,
  };
}
