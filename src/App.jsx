import { useRef } from 'react';
import './App.css'

export default function App() {
  const fNameErr = useRef(null),
        lNameErr = useRef(null),
        emailErr = useRef(null),
        messageErr = useRef(null),
        checkBoxErr = useRef(null),
        qTypeErr = useRef(null);

  return (
    <main>
      <h1>Contact Us</h1>

      <form>
        <div className="name-container">
          <div>
            <label htmlFor="fName">First Name</label>
            <input
              type="text"
              name="fName"
              id="fName"
              autoComplete="on"
              required={true}
              aria-describedby="fNameErr"
            />
            <p id="fNameErr" aria-live="polite" ref={fNameErr}></p>
          </div>
          <div>
            <label htmlFor="lName">Last Name</label>
            <input
              type="text"
              name="lName"
              id="lName"
              autoComplete="on"
              required={true}
              aria-describedby="lNameErr"
            />
            <p id="lNameErr" aria-live="polite" ref={lNameErr}></p>
          </div>
        </div>

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          aria-describedby="emailErr"
        />
        <p id="emailErr" aria-live="polite" ref={emailErr}></p>

        <fieldset aria-required="true" aria-describedby='qTypeErr'>
          <legend>Query Type</legend>

          <label htmlFor="genEnq">
            <input type="radio" name="queryType" id="genEnq" value="general_enquiry" />
            General Enquiry
          </label>

          <label htmlFor="supReq">
            <input type="radio" name="queryType" id="supReq" value="support_request" />
            Support Request
          </label>
        </fieldset>
        <p aria-live="polite" id="qTypeErr" ref={qTypeErr}></p>

        <label htmlFor="msg">Message</label>
        <textarea name="message" id="msg" required={true} aria-describedby='msgErr'></textarea>
        <p aria-live="polite" id="msgErr" ref={messageErr}></p>

        <input type="checkbox" name="consent" id="consent" aria-describedby='consentErr' required={true}/>
        <label htmlFor="consent">I consent to being contacted by the team</label>
        <p id="consentErr" aria-live="polite" ref={checkBoxErr}></p>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
