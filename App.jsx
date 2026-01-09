import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Main from './components/Navbar/Main/Main'
import Programs from './components/Navbar/Programs/Programs'
import Title from './components/Navbar/Title/Title'
import About from './components/About/About'
import Campus from './components/Campus/Campus'
import Testimonial from './components/Testimonial/Testimonial'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import VideoPlayer from './components/VideoPlayer/VideoPlayer'


function App() {
  const [count, setCount] = useState(0)
  const [playState, setPlayState] = useState(false)

  return (
    <>
    <div>

    <Navbar/>
      <Main/>
      <div className="container">
        <Title subTitle='Our Program' title='What We Offer'/>
        <Programs/>
        <About setPlayState={setPlayState}/>
        <Title subTitle='Gallery' title='Campus photos'/>
        <Campus/>
        <Title subTitle='Testimonials' title='What Student Says'/>
        <Testimonial/>
        <Title subTitle='Contact us' title='Get in Touch'/>
        <Contact/>
        <Footer/>
    </div>
    <VideoPlayer playState={playState} setPlayState={setPlayState}/>
    </div>
      
    </>
  )
}

export default App
