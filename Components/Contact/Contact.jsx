import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';
import msg_icon from "../../assets/msg_icon.png"; 
import mail_icon from "../../assets/mail_icon.png"; 
import phone_icon from "../../assets/phone_icon.png"; 
import location_icon from "../../assets/location_icon.png"; 
import white_arrow from "../../assets/white_arrow.png";

const Contact = () => {
  const [status, setStatus] = useState({ message: '', type: '' });
  const [errors, setErrors] = useState({});
  const timeoutRef = useRef(null); // existing for form status

  // --- visibility-related refs/state (new) ---
  const sectionRef = useRef(null);
  const visTimeoutRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  useEffect(() => {
    // cleanup form status timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (visTimeoutRef.current) {
        clearTimeout(visTimeoutRef.current);
      }
    };
  }, []);

  // -------------------
  // IntersectionObserver for visibility (new)
  // -------------------
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Start timer: wait 1s then show
            if (visTimeoutRef.current) clearTimeout(visTimeoutRef.current);
            visTimeoutRef.current = setTimeout(() => {
              setVisible(true);
            }, 1000); // <-- change this value to increase/decrease wait before animate
          } else {
            // leaving view: hide immediately and clear pending timeout
            if (visTimeoutRef.current) {
              clearTimeout(visTimeoutRef.current);
              visTimeoutRef.current = null;
            }
            setVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (visTimeoutRef.current) clearTimeout(visTimeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validate = () => {
    const tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = "Name is required";

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (formData.message.trim().length < 5) {
      tempErrors.message = "Message must be at least 5 characters";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() &&
      !formData.email.trim() &&
      !formData.phone.trim() &&
      !formData.message.trim()
    ) {
      setStatus({ message: "Fill the form first", type: "error" });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStatus({ message: "", type: "" }), 2000);
      return;
    }

    if (!validate()) {
      setStatus({ message: "Please fix the errors above", type: "error" });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStatus({ message: "", type: "" }), 2500);
      return;
    }

    setStatus({ message: "Sending...", type: "" });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus({ message: "Email sent successfully!", type: "success" });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setStatus({ message: "", type: "" }), 2000);
    }, 2000);
  };

  return (
    <div
      className={`contact animate-contact ${visible ? "in-view" : ""}`}
      ref={sectionRef}
    >
      <div className={`contact-col contact-anim`}>
        <h3>Send us a message <img src={msg_icon} alt="message icon" /></h3>

        <p>Feel free to reach out through our contact form.</p>

        <ul>
          <li><img src={mail_icon} alt="mail icon" /> Contact@sultan96sk.dev</li>
          <li><img src={phone_icon} alt="phone icon" /> +1 123-456-7890</li>
          <li><img src={location_icon} alt="location icon" /> Cambridge, MA</li>
        </ul>
      </div>

      <div className={`contact-col contact-anim`}>
        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Your name</label>
          <input 
            id="name"
            type="text"
            name="name"
            placeholder="enter your name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p className="error" id="name-error">{errors.name}</p>}

          <label htmlFor="email">Email</label>
          <input 
            id="email"
            type="email"
            name="email"
            placeholder="enter your email"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p className="error" id="email-error">{errors.email}</p>}

          <label htmlFor="phone">Phone Number</label>
          <input 
            id="phone"
            type="tel"
            name="phone"
            placeholder="enter your mobile number"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && <p className="error" id="phone-error">{errors.phone}</p>}

          <label htmlFor="message">Write your message here</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="enter your message"
            value={formData.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          ></textarea>
          {errors.message && <p className="error" id="message-error">{errors.message}</p>}

          <button type="submit" className='btn dark-btn'>
            Submit now <img src={white_arrow} alt="arrow" />
          </button>
        </form>

        {status.message && (
          <div
            className={`status-box ${
              status.type === 'success' ? 'success' : status.type === 'error' ? 'error' : ''
            }`}
            role="status"
            aria-live="polite"
          >
            {status.type === 'success' && <span className="checkmark" aria-hidden="true">✓</span>}
            <span>{status.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
