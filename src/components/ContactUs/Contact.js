import React, { useState } from 'react';
import Header from './Header';
import './Contact.css'
import FAQ from './FAQ';

function Contact () {
  const [faqs, setfaqs] = useState([
    {
      question: "Why do I need to login to book tickets?",
      answer:
        "Logging in to the system enables us to provide data based on transactions that you have made in the past.",
      open: false,
    },
    {
      question: "What if my card number does not verify?",
      answer:
        "Please check the guidelines of the ticket offer to confirm your card type is available under this offer. If your card type is listed, please send us an email through the contact us info and we will investigate.",
      open: false,
    },
    {
      question: "What forms of payment do you accept for online bookings?",
      answer: "We accept Visa and MasterCard for online bookings.",
      open: false,
    },
    {
      question: "Can I print out my online tickets at the cinema?",
      answer:
        "Print your tickets at one of our cinema kiosks by entering in your booking reference number.",
      open: false,
    },
    {
      question: "How many seats can I reserve per transaction?",
      answer:
        "You may reserve a maximum of 5 seats per booking.",
      open: false,
    },
  ]);

  const toggleFAQ = index => {
    setfaqs(faqs.map((faq, i) => {
      if (i === index) {
        faq.open = !faq.open
      } else {
        faq.open = false;
      }

      return faq;
    }))
  }


  return (
    <div className="contact-us-container">
      <Header />
      <div className="faqs">
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, i) => (
          <FAQ faq={faq} index={i} toggleFAQ={toggleFAQ} />
        ))}
        <div className="cont">
        <div className="contact-us">
        <br />
        <h2>Contact Us</h2>
        <br />
        <h4>For any more queries Email Us on:</h4>
        <p>moviestop.customercare@gmail.com</p>
        <h4>Call us on:</h4>
        <p>1800 423 2800</p>
        <br />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
