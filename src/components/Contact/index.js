import { useEffect, useState, useRef } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import useInView from "../../hooks/useInView";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

const Contact = () => {
  const [letterClass, setLetterClass] = useState("text-animate");
  const [ref, inView] = useInView();
  const formRef = useRef(null);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' | 'error'
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass("text-animate-hover");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("");
    setStatusType("");
    setIsSending(true);

    const form = formRef.current;
    if (!form) return;

    const emailValue = form.email?.value?.trim();
    const messageValue = form.message?.value?.trim();

    // Simple front-end validation
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(emailValue)) {
      setIsSending(false);
      setStatusType("error");
      setStatus("Please enter a valid email address.");
      return;
    }

    if (!messageValue || messageValue.length < 5) {
      setIsSending(false);
      setStatusType("error");
      setStatus("Please enter a slightly longer message.");
      return;
    }

    emailjs
      .sendForm(
       "service_8aq782g",   // e.g. "service_c9f0b8x"
        "template_6vewe53",  // e.g. "template_123abc"
        formRef.current,
        "b-JPfs909vxmbPVO3" 
    // ⬅️ put your real public key here
      )
      .then(
        () => {
          setIsSending(false);
          setStatusType("success");
          setStatus("Message sent! I'll get back to you soon.");
          e.target.reset();
        },
        (error) => {
          console.error("EmailJS error:", error.status, error.text || error);
          setIsSending(false);
          setStatusType("error");
          setStatus("Something went wrong. Please try again later.");
        }
      );
  };

  const statusIcon =
    statusType === "success" ? faCheckCircle : faExclamationTriangle;

  return (
    <>
      <div
        id="contact"
        ref={ref}
        className={`container contact-page fade-section ${
          inView ? "in-view" : ""
        }`}
      >
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"How to Reach Me:".split("")}
              index={15}
            />
          </h1>
          <p>
            Please use the form below to contact me, or email me directly at{" "}
            <a href="mailto:chriszcodes@gmail.com">
              <span>chriszcodes@gmail.com</span>
            </a>
            .
          </p>

          <div className="contact-form">
            <form ref={formRef} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    type="text"
                    name="title"
                    placeholder="Subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    name="message"
                    placeholder="Message"
                    required
                  />
                </li>
                <li>
                  <button
                    type="submit"
                    className="btn"
                    disabled={isSending}
                  >
                    {isSending ? "SENDING..." : "SEND"}
                  </button>
                </li>
              </ul>
            </form>

            {status && (
              <p className={`status-message ${statusType}`}>
                <FontAwesomeIcon icon={statusIcon} />
                <span>{status}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      <Loader type="pacman" />
    </>
  );
};

export default Contact;
