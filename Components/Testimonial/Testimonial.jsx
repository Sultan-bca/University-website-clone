
import React, { useRef, useEffect, useState } from 'react';
import next_icon from "../../assets/next_icon.png";
import back_icon from "../../assets/back_icon.png";
import user_1 from "../../assets/user_1.png";
import user_2 from "../../assets/user_2.png";
import user_3 from "../../assets/user_3.png";
import user_4 from "../../assets/user_4.png";
import './testimonial.css';

const Testimonial = () => {

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
            // Wait 1 second before showing animation
            timeoutRef.current = setTimeout(() => {
              setVisible(true);
            }, 1000);
          } else {
            // when leaving view → hide again
            setVisible(false);
            clearTimeout(timeoutRef.current);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`testimonials animate-testimonial ${visible ? "in-view" : ""}`}
    >
      <div className="slider">
        <ul>

          <li className="testimonial-anim">
            <div className="slide">
              <div className="user-info">
                <img src={user_1} alt='' />
                <div>
                  <h3>William Jackson – Software Engineer</h3>
                  <span>Educity, USA</span>
                </div>
              </div>
              <p>
                My experience at Educity has been transformative. The faculty
                pushed me to excel, and the hands-on learning environment helped
                me discover my true potential in the tech world.
              </p>
            </div>
          </li>

          <li className="testimonial-anim">
            <div className="slide">
              <div className="user-info">
                <img src={user_2} alt='' />
                <div>
                  <h3>Sarah Thompson – Data Analyst</h3>
                  <span>Educity, Canada</span>
                </div>
              </div>
              <p>
                Educity helped me build confidence in my analytical abilities.
                The practical projects and industry exposure played a major role
                in shaping my career as a successful data analyst.
              </p>
            </div>
          </li>

          <li className="testimonial-anim">
            <div className="slide">
              <div className="user-info">
                <img src={user_3} alt='' />
                <div>
                  <h3>Michael Lee – UX Designer</h3>
                  <span>Educity, Singapore</span>
                </div>
              </div>
              <p>
                What I loved the most was the creative freedom Educity offered.
                It allowed me to experiment, innovate, and grow into a
                professional UX designer capable of solving real-world problems.
              </p>
            </div>
          </li>

          <li className="testimonial-anim">
            <div className="slide">
              <div className="user-info">
                <img src={user_4} alt='' />
                <div>
                  <h3>Emily Carter – Marketing Specialist</h3>
                  <span>Educity, Australia</span>
                </div>
              </div>
              <p>
                The marketing program at Educity gave me deep insights into the
                digital world. The mentors were inspiring, and the curriculum
                prepared me perfectly for the competitive industry.
              </p>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Testimonial;
