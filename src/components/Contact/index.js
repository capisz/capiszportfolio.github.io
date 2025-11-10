import { useEffect, useState, useRef } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'
import emailjs from '@emailjs/browser'

const Contact = () => {

    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef()

    useEffect(() => {
        setTimeout(() => {
           setLetterClass('text-animate-hover')
         }, 3000)
       }, [])

       const sendEmail = (e) => {
            e.preventDefault()

            emailjs
            .sendForm(
                'default_service',
                'template_y7xdqd2',
                refForm.current,
                'b-JPfs909vxmbPVO3'
            )
            .then(
                () => {
                    alert('Message successfully sent!')
                    window.location.reload(false)
                },
                () => {
                    alert('Failed to send the meessage, please try again')
                }
            )
       }


    return (
        <>
        <div className='container contact-page'>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters
                    letterClass={letterClass}
                     strArray={['C','o','n','t','a','c','t',' ','M','e' ]}
                     idx={15}
                     />
                </h1>
                <p>
                    Please use the form below to contact me.
                    <br/>
                    Or contact me directly at: <i>chriszcodes@gmail.com </i>
                    <br />
                     Or using one of the links on the sidebar.
                    <br/>
                </p>
                <div className='contact-form'>
                    <form ref={refForm} onSubmit={sendEmail}>
                        <ul>
                            <li className='half'>
                                <input type='text' name='name' placeholder='Name' required />
                            </li>
                            <li className='half'>
                                <input
                                type='email'
                                name='email'
                                placeholder='Email'
                                required
                                />
                            </li>
                            <li>
                                <input placeholder='Subject' type='text' name='subject' required />
                            </li>
                            <li>
                                <textarea placeholder='Message' name='message' required></textarea>
                            </li>
                            <li>
                                <input type='submit' className='flat-button' value='SEND' />
                            </li>
                        </ul>
                    </form>
                </div>
            </div>

        </div>
        <Loader type='pacman'></Loader>
        </>
    )
}

export default Contact
