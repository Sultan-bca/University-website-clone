import React, { useRef, useEffect, useState } from "react";
import "./About.css";
import about_img from "../../assets/about.png";
import play_icon from "../../assets/play_icon.png";

const About = ({ setPlayState }) => {

  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Wait 1 second, then animate
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              setVisible(true);
            }, 1000);
          } else {
            // When leaving the section, hide again
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className={`about animate-section ${visible ? "in-view" : ""}`} ref={sectionRef}>
      
      <div className="about-left program-anim">
        <img src={about_img} alt="" className="about-img" />
        <img
          src={play_icon}
          alt=""
          className="play-icon"
          onClick={() => setPlayState(true)}
        />
      </div>

      <div className="about-right program-anim">
        <h3>ABOUT UNIVERSITY</h3>
        <h2>Nurturing Tomorrow's Leaders Today</h2>

        
        <p>
        Embark on a transformative educational journey with our
        university's comprehensive education programs. Our cutting-edge
        curriculum is designed to empower students with the knowledge,
        skills, and experiences needed to excel in the dynamic field of
        education.
      </p>

      <p>
      With a focus on innovation, hands-on learning, and personalized
      mentorship, our programs prepare aspiring educators to make a
      meaningful impact in classrooms, schools, and communities.
      </p>

    <p>
      Whether you aspire to become a teacher, administrator, counselor,
      or educational leader, our diverse range of programs offers the
      perfect pathway to achieve your goals and unlock your full
      potential in shaping the future of education.
    </p>
      </div>

    </div>
  );
};

export default About;






