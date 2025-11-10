import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import LogoS from '../../../assets/images/logo-s.png'
import './index.scss'

const Logo = () => {
  const bgRef = useRef()
  const outlineLogoRef = useRef()
  const solidLogoRef = useRef()

  useEffect(() => {
    gsap.registerPlugin(DrawSVGPlugin)

    gsap
      .timeline()
      .to(bgRef.current, {
        duration: 1,
        opacity: 1,
      })
      .from(outlineLogoRef.current, {
        drawSVG: 0,
        duration: 20,
      })

    gsap.fromTo(
      solidLogoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        delay: 4,
        duration: 4,
      }
    )
  }, [])

  return (
    <div className='logo-container' ref={bgRef}>
      <img
        ref={solidLogoRef}
        className='solid-logo'  // ✅ fixed "classname" typo
        src={LogoS}
        alt='C'
      />
      <svg
        width='559pt'
        height='897pt'
        version='1.0'
        viewBox='0 0 559 897'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g
          className='svg-container'
          transform='translate(0 457) scale(.1 -.1)'
          fill='none'
        >
          <path
            d='m2930 4560c-344-16-623-85-915-228... (rest of path unchanged)'
          />
        </g>
      </svg>
    </div>
  )
}

export default Logo
