import { INPUT_INDEXES, BASIC_EMAIL_REGEX, validationFunctions, initThrowErr } from './validation';
import { useState } from 'react';
import './App.css';

export default function App() {
  const [fName, setFName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [chkBx, setChkBx] = useState(false);
  const [qType, setQType] = useState("");

  // validation state

  const [errIndex, setErrIndex] = useState(-1);
  const [errMsg, setErrMsg] = useState('');

  function handleRadioChange(e) {
    setQType(e.target.value);
  }

  function handleChange(e, callbckFunc) {
    callbckFunc(e.target.value);
  }

  function handleCheckBox() {
    setChkBx(prev => !prev);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const [throwErr, errIndex, setError] = initThrowErr(setErrMsg, setErrIndex);

    // names validation rules:
    //  Must be more than 3 characters and less than 30.
    //  Must contain only letters
    //  Must be one word

    [
      [fName.trim(), "nameValidations", INPUT_INDEXES.fName],
      [lName.trim(), "nameValidations", INPUT_INDEXES.lName],
      [email.trim(), "emailValidations", INPUT_INDEXES.email],
      [qType, "qTypeValidation", INPUT_INDEXES.qType],
      [msg.trim(), "msgValidation", INPUT_INDEXES.msg],
      [chkBx, "chkBxValidation", INPUT_INDEXES.chkBx],
    ].forEach(([name, func, idx]) => {
      if (errIndex() !== -1) return;

      const validation =
        func in validationFunctions
          ? validationFunctions[func](name)
          : (() => {
              throw TypeError(
                `${func} is not a property in validationFunctions`,
              );
            })();

      if (validation) throwErr(validation, idx);
    });

    setError();
  }

  function handleFormBlur() {
    const noErr = initThrowErr(setErrMsg, setErrIndex)[2];

    switch (errIndex) {
      case INPUT_INDEXES.chkBx:
        !validationFunctions.chkBxValidation(chkBx) && noErr();
        break;
      case INPUT_INDEXES.email:
        !validationFunctions.emailValidations(email) && noErr();
        break;
      case INPUT_INDEXES.fName:
        !validationFunctions.nameValidations(fName) && noErr();
        break;
      case INPUT_INDEXES.lName:
        !validationFunctions.nameValidations(lName) && noErr();
        break;
      case INPUT_INDEXES.msg:
        !validationFunctions.msgValidation(msg) && noErr();
        break;
      case INPUT_INDEXES.qType:
        !validationFunctions.qTypeValidation(qType) && noErr();
        break;
    }
  }

  return (
    <main>
      <h1>Contact Us</h1>

      <form onSubmit={handleFormSubmit} noValidate={true} onBlur={handleFormBlur}>
        <div className="name-container">
          <div className="names">
            <label htmlFor="fName">First Name</label>
            <input
              type="text"
              name="fName"
              id="fName"
              autoComplete="on"
              required={true}
              aria-describedby="fNameErr"
              value={fName}
              aria-invalid={errIndex === INPUT_INDEXES.fName}
              onChange={(e) => handleChange(e, setFName)}
            />
            <p id="fNameErr" aria-live="polite">
              {errIndex === INPUT_INDEXES.fName ? errMsg : ""}
            </p>
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
              value={lName}
              aria-invalid={errIndex === INPUT_INDEXES.lName}
              onChange={(e) => handleChange(e, setlName)}
            />
            <p id="lNameErr" aria-live="polite">
              {errIndex === INPUT_INDEXES.lName ? errMsg : ""}
            </p>
          </div>
        </div>

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          required={true}
          aria-describedby="emailErr"
          value={email}
          aria-invalid={errIndex === INPUT_INDEXES.email}
          onChange={(e) => handleChange(e, setEmail)}
        />
        <p id="emailErr" aria-live="polite">
          {errIndex === INPUT_INDEXES.email ? errMsg : ""}
        </p>

        <fieldset aria-required="true">
          <legend>Query Type</legend>
          <div>
            <label htmlFor="genEnq">
              <input
                type="radio"
                name="queryType"
                id="genEnq"
                value="general_enquiry"
                onChange={handleRadioChange}
                aria-describedby="qTypeErr"
                aria-invalid={errIndex === INPUT_INDEXES.qType}
              />
              General Enquiry
            </label>

            <label htmlFor="supReq">
              <input
                type="radio"
                name="queryType"
                id="supReq"
                value="support_request"
                onChange={handleRadioChange}
                aria-describedby="qTypeErr"
                aria-invalid={errIndex === INPUT_INDEXES.qType}
              />
              Support Request
            </label>
          </div>
        </fieldset>
        <p aria-live="polite" id="qTypeErr">
          {errIndex === INPUT_INDEXES.qType ? errMsg : ""}
        </p>

        <label htmlFor="msg">Message</label>
        <textarea
          name="message"
          id="msg"
          required={true}
          aria-describedby="msgErr"
          aria-invalid={errIndex === INPUT_INDEXES.msg}
          onChange={(e) => handleChange(e, setMsg)}
        ></textarea>
        <p aria-live="polite" id="msgErr">
          {errIndex === INPUT_INDEXES.msg ? errMsg : ""}
        </p>

        <div className="checkbox">
          <input
            type="checkbox"
            name="consent"
            id="consent"
            aria-describedby="consentErr"
            required={true}
            aria-invalid={errIndex === INPUT_INDEXES.chkBx}
            onChange={handleCheckBox}
          />
          <label htmlFor="consent">
            I consent to being contacted by the team
          </label>
        </div>
        <p id="consentErr" aria-live="polite">
          {errIndex === INPUT_INDEXES.chkBx ? errMsg : ""}
        </p>

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
