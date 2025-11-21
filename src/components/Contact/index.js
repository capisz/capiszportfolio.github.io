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
    if (!form) {
      setIsSending(false);
      setStatusType("error");
      setStatus("Something went wrong with the form. Please try again.");
      return;
    }

    const emailValue = form.email?.value?.trim();
    const messageValue = form.message?.value?.trim();

    // Simple front-end validation
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(emailValue)) {
      setIsSending(false);
      setStatusType("error");
      setStatus("Please enter a valid email address so I can reply.");
      return;
    }

    if (!messageValue || messageValue.length < 5) {
      setIsSending(false);
      setStatusType("error");
      setStatus("Mind adding a bit more detail to your message?");
      return;
    }

    emailjs
      .sendForm(
        "service_8aq782g",
        "template_6vewe53",
        formRef.current,
        "b-JPfs909vxmbPVO3"
      )
      .then(
        () => {
          setIsSending(false);
          setStatusType("success");
          setStatus("Message sent — thanks! I usually reply within 24 hours.");
          e.target.reset();
        },
        (error) => {
          console.error("EmailJS error:", error.status, error.text || error);
          setIsSending(false);
          setStatusType("error");
          setStatus(
            "Something went wrong sending that. Please try again, or email me directly at chriszcodes@gmail.com."
          );
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
            While you're here, the form below is an easy way to get in touch about roles,
            projects, or anything you’ve seen here. You can also email me
            directly at{" "}
            <a href="mailto:chriszcodes@gmail.com">
              <span>chriszcodes@gmail.com</span>
            </a> or follow my github for future projects updates:  
              <a href="https://github.com/capisz" target="_blank" rel="noopener noreferrer">
                <span> github.com/capisz</span>
              </a>
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

                {status && (
                  <li className="status-row">
                    <p className={`status-message ${statusType}`}>
                      <FontAwesomeIcon icon={statusIcon} />
                      <span>{status}</span>
                    </p>
                  </li>
                )}
              </ul>
            </form>
          </div>
        </div>
      </div>

      <Loader type="pacman" />
    </>
  );
};

export default Contact;
