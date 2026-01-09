import React from 'react'
import './Main.css'
import dark_arrow from "../../../assets/dark_arrow.png";

const Main = () => {
  return (
    <div>
      <div className="hero container">
            <div className="hero-text">
                <h1>we ensure better eductaion for a better world</h1>
                <p>Our Cutting-edge curriculam is designed to empower students
                    with the knowledge,skills,and experiences nedded to excel in the dynamic failed of education
                </p>
                <button className='btn'>Explore more <img src={dark_arrow} alt=''/></button>
            </div>
      </div>
    </div>
  )
}

export default Main
