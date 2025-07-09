import React from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import kerasLogo from '@/assets/keras-logo.png'
import PostgreSQLLogo from '@/assets/postgresql-logo.png'
import sklearnLogo from '@/assets/scikit-learn-logo.svg'
import fastAPILogo from '@/assets/fastapi-logo.svg'
import reactLogo from '@/assets/react-logo.svg'
import dockerLogo from '@/assets/docker-logo.svg'
import tensorFlowLogo from '@/assets/tensorflow-logo.svg'
import openCVLogo from '@/assets/opencv-logo.svg'
import pythonLogo from '@/assets/python-logo.svg'
import uvicornLogo from '@/assets/uvicorn-logo.png'
import viteLogo from '@/assets/vite-logo.svg'

const techStack = [
  { name: 'PostgreSQL', logo: PostgreSQLLogo },
  { name: 'Keras', logo: kerasLogo },
  { name: 'Scikit-learn', logo: sklearnLogo },
  { name: 'FastAPI', logo: fastAPILogo },
  { name: 'React', logo: reactLogo },
  { name: 'Docker', logo: dockerLogo },
  { name: 'TensorFlow', logo: tensorFlowLogo },
  { name: 'OpenCV', logo: openCVLogo },
  { name: 'Python', logo: pythonLogo },
  { name: 'Uvicorn', logo: uvicornLogo },
  { name: 'Vite', logo: viteLogo },
]

const TechStackSlider: React.FC = () => {
  const animation = { duration: 40000, easing: (t: number) => t }

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: false,
    mode: 'free',
    slides: {
      perView: 5,
      spacing: 20,
    },
    created(slider) {
      const slidesCount = slider.track.details.slides.length
      slider.moveToIdx(slidesCount, true, animation)
    },
    updated(slider) {
      const slidesCount = slider.track.details.slides.length
      slider.moveToIdx(slider.track.details.abs + slidesCount, true, animation)
    },
    animationEnded(slider) {
      const slidesCount = slider.track.details.slides.length
      slider.moveToIdx(slider.track.details.abs + slidesCount, true, animation)
    },
  })

  return (
    <div className="py-12">
      <div className="mb-6 w-48 h-1.5 bg-gradient-to-r from-sky-500 to-teal-400 rounded-full mx-auto" />
      <h2 className="text-xl font-semibold text-center mb-6">Tech Stack</h2>
      <div ref={sliderRef} className="keen-slider">
        {techStack.map((tech, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex justify-center items-center"
          >
            <img
              src={tech.logo}
              alt={tech.name}
              className="h-16 w-auto max-w-[120px]"
              title={tech.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechStackSlider
