import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import gsap from "gsap";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const SmoothScrollComponent = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 2,
          effects: true,
        });
      }
    );
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};
export default SmoothScrollComponent;
