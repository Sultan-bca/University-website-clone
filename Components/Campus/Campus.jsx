import React, { useRef, useEffect, useState } from 'react';
import gallery_1 from "../../assets/gallery_1.png";
import gallery_2 from "../../assets/gallery_2.png";
import gallery_3 from "../../assets/gallery_3.png";
import gallery_4 from "../../assets/gallery_4.png";
import white_arrow from "../../assets/white_arrow.png";
import './Campus.css';

const Campus = () => {

  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // wait 1 second → then animate
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setVisible(true);
            }, 1000);
          } else {
            // leaving → hide
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`campus animate-campus ${visible ? "in-view" : ""}`} ref={sectionRef}>
      <div className="gallery">
        <img src={gallery_1} alt='' className="campus-anim" />
        <img src={gallery_2} alt='' className="campus-anim" />
        <img src={gallery_3} alt='' className="campus-anim" />
        <img src={gallery_4} alt='' className="campus-anim" />
      </div>

      <button className='btn dark-btn'>
        See more Here <img src={white_arrow} alt=''/>
      </button>
    </div>
  );
};

export default Campus;
