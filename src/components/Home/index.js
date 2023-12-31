import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import Logo from './Logo'
import AnimatedLetters from '../AnimatedLetters'
import LogoTitle from '../../assets/images/logo-s.png'
import './index.scss'


const Home = () => {

    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = ['h', 'r', 'i', 's',',']
    const jobArray = [
        ' W',
        'e',
        'b',
        ,
        ' ',
        ,
        'D',
        'e',
        'v',
        'e',
        'l',
        'o',
        'p',
        'e',
        'r',
        '.',
      ]

      useEffect(() => {
       setTimeout(() => {
          setLetterClass('text-animate-hover')
        }, 4000)
      }, [])


    return (
        <>
        <div className="container home-page">
            <div className='text-zone'>
        <h1>
           <span className={letterClass}>H</span>

            <span className={`${letterClass} _12`}>i</span>
            <span className={letterClass}>,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <img src={LogoTitle} alt='Javascript developer' />
            <AnimatedLetters letterClass={letterClass}
            strArray={nameArray}
            idx={18}
            />
            <br />
            <AnimatedLetters
            letterClass={letterClass}
            strArray={jobArray}
            idx={-2} />
            </h1>
            <h2>Frontend Developer /  Javascript, HTML/CSS, React </h2>
            <Link to='/contact' className='flat-button'>CONTACT ME</Link>
        </div>
        <Logo />
    </div>

    <Loader type="pacman" />
    </>
    )
}

export default Home
