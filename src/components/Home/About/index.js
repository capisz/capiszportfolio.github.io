import './index.scss'
import AnimatedLetters from '../../AnimatedLetters'
import { useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngular, faCss3, faGitAlt, faHtml5, faJsSquare, faReact } from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'


const About = () => {

    const [letterClass, setLetterClass] = useState('text-animate')

    useEffect(() => {
        setTimeout(() => {
           setLetterClass('text-animate-hover')
         }, 3000)
       }, [])

    return (
        <>
        <div className='container about-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters
                    letterClass={letterClass}
                        strArray={['A', 'b', 'o', 'u', 't',' ', 'm', 'e']}
                        idx={5}
                    />
                </h1>
                <p>
                I am steadfast in my commitment to lifelong learning, empathy, understanding, colloboration and building fresh new ideas to adapt and solve complex problems.
                </p>
                <p>
                Challenges bring out my best, and I perform well under pressure. My adaptability allows me to seamlessly adjust to different surroundings and situations. I truly enjoy the process of acquiring new skills and knowledge independently, and I will contribute positively to any group I become a part of.
                </p>
                <p>
                  I am a programmer and digital marketer with a diverse skillset and digital 'toolbelt'. When i'm not working or problem solving I am practicing fingerstyle guitar, doing portrait art in charcoal and graphite, taking 35mm film photography, learning new languages, hiking, biking or at the gym.
                </p>
            </div>

            <div className='stage-cube-cont'>
                <div className='cubespinner'>
                <div className='face1'>
                        <FontAwesomeIcon icon={faJsSquare} color='#EFD81D' />
                    </div>
                    <div className='face2'>
                        <FontAwesomeIcon icon={faAngular} color='#DD0031' />
                    </div>
                    <div className='face3'>
                        <FontAwesomeIcon icon={faHtml5} color='#F06529' />
                    </div>
                    <div className='face4'>
                        <FontAwesomeIcon icon={faCss3} color='#28A4D9' />
                    </div>
                    <div className='face5'>
                        <FontAwesomeIcon icon={faReact} color='#5ED4F4' />
                    </div>
                    <div className='face6'>
                        <FontAwesomeIcon icon={faGitAlt} color='#EC4' />
                    </div>
                </div>
            </div>
        </div>
        <Loader type='pacman' />
        </>
    )
}

export default About
