import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type CommentTooltipProps = {
  content: string;
  children: React.ReactNode;
};

function CommentTooltip({ content, children }: CommentTooltipProps) {
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    setTooltipPosition({ left: mouseX, top: mouseY });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    if (tooltipRef.current && isTooltipVisible) {
      const tooltipWidth = tooltipRef.current.offsetWidth;
      const tooltipHeight = tooltipRef.current.offsetHeight;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let { left, top } = tooltipPosition;

      if (left + tooltipWidth > viewportWidth) {
        left = viewportWidth - tooltipWidth - 16;
      }

      if (top + tooltipHeight > viewportHeight) {
        top = viewportHeight - tooltipHeight - 16;
      }

      if (left !== tooltipPosition.left || top !== tooltipPosition.top) {
        setTooltipPosition({ left, top });
      }
    }
  }, [isTooltipVisible]);

  return (
    <>
      <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {isTooltipVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className={clsx(
              "fixed p-4 z-50",
              "bg-gray-800 text-white rounded-lg shadow-lg",
              "max-w-3xl break-words whitespace-pre-wrap",
              "transform -translate-x-1/2 -translate-y-full"
            )}
            style={{
              left: `${tooltipPosition.left}px`,
              top: `${tooltipPosition.top}px`
            }}
          >
            <p>{content}</p>
          </div>,
          document.body
        )}
    </>
  );
}

export default CommentTooltip;
