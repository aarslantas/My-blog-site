import { useRef, useState, useEffect } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

function ContactForm() {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState(); //pending success error

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestError(null);
        setRequestStatus(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();

  let enteredEmail;
  let enteredName;
  let enteredMessage;

  async function sendMessageHandler(event) {
    event.preventDefault();

    enteredEmail = emailRef.current.value;
    enteredName = nameRef.current.value;
    enteredMessage = messageRef.current.value;

    const newMessage = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    setRequestStatus("pending");

    try {
      await sendContactData(newMessage);
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
    setRequestStatus("success");
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Message sent successfully!",
    };

    enteredEmail = " ";
    enteredName = " ";
    enteredMessage = " ";
  }

  if (requestStatus === "sucerroress") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you ?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              ref={emailRef}
              value={enteredEmail}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              ref={nameRef}
              value={enteredName}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            ref={messageRef}
            value={enteredMessage}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
