import { useRef, useEffect, useState, useCallback } from "react";
import './Scroll.css'

export const ScrollContainer = ({ children, scrollCta }) => {
  const outerDiv = useRef(null);
  const innerDiv = useRef(null);

  const prevInnerDivHeight = useRef(null);

  const [showMessages, setShowMessages] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;
    const outerDivScrollTop = Math.ceil(outerDiv.current.scrollTop);

    if (
      !prevInnerDivHeight.current || outerDivScrollTop===0 ||
      outerDivScrollTop === prevInnerDivHeight.current - outerDivHeight
    ) {
      outerDiv.current.scrollTo({
        top: innerDivHeight - outerDivHeight,
        left: 0,
        behavior: prevInnerDivHeight.current ? "smooth" : "auto"
      });
      setShowMessages(true);
    } else {
      setShowScrollButton(true);
    }

    prevInnerDivHeight.current = innerDivHeight;
  }, [children]);

  const handleScrollButtonClick = useCallback(() => {
    const outerDivHeight = outerDiv.current.clientHeight;
    const innerDivHeight = innerDiv.current.clientHeight;

    outerDiv.current.scrollTo({
      top: innerDivHeight - outerDivHeight,
      left: 0,
      behavior: "smooth"
    });

    setShowScrollButton(false);
  }, []);

  return (
    <div style={{"position":"relative","height":"100%"}}>
      <div className="container" ref={outerDiv}>
        <div
          className="transition"
          style={{ opacity: showMessages ? 1 : 0 }}
          ref={innerDiv}
        >
          {children}
        </div>
      </div>
      <button
        style={{
          transform: "translateX(-50%)",
          opacity: showScrollButton ? 1 : 0,
          pointerEvents: showScrollButton ? "auto" : "none"
        }}
        onClick={handleScrollButtonClick}
        className="button">
        {scrollCta}
      </button>
    </div>
  );
};
