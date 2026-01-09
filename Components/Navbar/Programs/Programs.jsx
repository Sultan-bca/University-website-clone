import React, { useRef, useEffect, useState } from "react";
import program_1 from "../../../assets/program_1.png";
import program_2 from "../../../assets/program_2.png";
import program_3 from "../../../assets/program_3.png";
import program_icon_1 from "../../../assets/program_icon_1.png";
import program_icon_2 from "../../../assets/program_icon_2.png";
import program_icon_3 from "../../../assets/program_icon_3.png";
import "./Programs.css";

const Programs = () => {
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(false); // controls in-view class

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // start a 1s timer, then show
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setVisible(true);
            }, 1000);
          } else {
            // leaving viewport -> hide immediately and clear any pending timer
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            setVisible(false);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`programs animate-section ${visible ? "in-view" : ""}`}
      ref={sectionRef}
    >
      <div className="program">
        <img src={program_1} alt="" />
        <div className="caption">
          <img src={program_icon_1} alt="" />
          <p>Graducation Degree</p>
        </div>
      </div>

      <div className="program">
        <img src={program_2} alt="" />
        <div className="caption">
          <img src={program_icon_2} alt="" />
          <p>Masters Degree</p>
        </div>
      </div>

      <div className="program">
        <img src={program_3} alt="" />
        <div className="caption">
          <img src={program_icon_3} alt="" />
          <p> Post Graducation </p>
        </div>
      </div>
    </div>
  );
};

export default Programs;
