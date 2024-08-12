import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppContext";

const SmoothScroll: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { isScrollDisabled } = useAppContext();

  useEffect(() => {
    if (isScrollDisabled) return;

    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const smoothScrollTo = (targetY: number) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 1000; // Duration in ms
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easedProgress = easeInOutQuad(progress);

        window.scrollTo(0, startY + distance * easedProgress);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    const handleScroll = (event: WheelEvent) => {
      if (!isInitialized) {
        setIsInitialized(true);
        return;
      }

      event.preventDefault();

      const delta = Math.sign(event.deltaY);
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      let targetScroll = currentScroll + delta * viewportHeight;

      smoothScrollTo(targetScroll);
    };

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      touchEndY = event.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const delta = touchStartY - touchEndY;
      const currentScroll = window.scrollY;
      const viewportHeight = window.innerHeight;

      let targetScroll =
        currentScroll + (delta > 0 ? viewportHeight : -viewportHeight);

      smoothScrollTo(targetScroll);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isInitialized, isScrollDisabled]);

  return null;
};

export default SmoothScroll;
