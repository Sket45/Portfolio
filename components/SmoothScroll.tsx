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

      const sections = document.querySelectorAll("header, section");
      const sectionPositions = Array.from(sections).map(
        (section) => (section as HTMLElement).offsetTop
      );

      const delta = Math.sign(event.deltaY);
      const currentScroll = window.scrollY;

      let targetSectionIndex =
        delta > 0
          ? sectionPositions.findIndex(
              (position) => position > currentScroll + 1
            )
          : sectionPositions
              .slice()
              .reverse()
              .findIndex((position) => position < currentScroll - 1);

      if (targetSectionIndex === -1) {
        targetSectionIndex = delta > 0 ? sections.length - 1 : 0;
      } else if (delta < 0) {
        targetSectionIndex = sections.length - 1 - targetSectionIndex;
      }

      smoothScrollTo(sectionPositions[targetSectionIndex]);
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isInitialized, isScrollDisabled]);

  return null;
};

export default SmoothScroll;
