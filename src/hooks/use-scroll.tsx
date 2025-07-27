import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const useScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollPosition, setScrollPosition] = useState<
    "top" | "bottom" | "middle"
  >("top");

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const threshold = 5; // toleransi batas scroll atas/bawah
    const isTop = el.scrollTop <= threshold;
    const isBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;

    if (isBottom) setScrollPosition("bottom");
    else if (isTop) setScrollPosition("top");
    else setScrollPosition("middle");
  };

  // useEffects
  useEffect(() => {
    handleScroll();
  }, []);

  const ScrollIndicator = ({
    position,
  }: {
    position: "top" | "bottom";
    vertical?: boolean;
  }) => {
    const isBottom = position === "bottom";

    return (
      <motion.div
        key={position}
        initial={{ opacity: 0, y: isBottom ? 10 : -10 }}
        animate={{ opacity: 1, y: [0, isBottom ? 6 : -6, 0] }}
        exit={{ opacity: 0, y: isBottom ? 10 : -10 }}
        transition={{
          opacity: { duration: 0.3 },
          y: {
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
        }}
        className={
          cn(isBottom ? "bottom-3" : "top-3") +
          " absolute left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-blue-600 text-white hidden md:flex items-center justify-center w-8 h-8 rounded-full"
        }>
        {isBottom ? <ChevronDown /> : <ChevronUp />}
      </motion.div>
    );
  };

  return {
    scrollRef, // ref
    scrollPosition,
    ScrollIndicator,
    handleScroll,
  };
};

export default useScroll;
