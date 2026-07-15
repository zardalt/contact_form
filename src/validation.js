export const INPUT_INDEXES = Object.freeze({
  fName: 0,
  lName: 1,
  email: 2,
  msg: 3,
  chkBx: 4,
  qType: 5,
});

export const BASIC_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initThrowErr(setErrMsg, setErrIndex) {
  let errMsg = "",
    // -1 is the no error state
    errIdx = -1;

  function throwErr(msg, idx) {
    errMsg = msg;
    errIdx = idx;
  }

  return [
    throwErr,
    () => errIdx,
    (msg, idx) => {
      if (msg && idx) throwErr(msg, idx);
      setErrMsg(errMsg);
      setErrIndex(errIdx);
    },
  ];
}

export const validationFunctions = {
  nameValidations(name) {
    if (!name) return "This field is required";
    else if (!/^[a-zA-Z]+$/.test(name))
      return "This field can contain only letters";
    else if (!/^.{3,50}$/.test(name))
      return "Input must be more than 2 letters and less than 50";

    return "";
  },
  emailValidations(email) {
    const trimmed = email.trim();

    if (!trimmed) {
      return "This field is required";
    } else if (!BASIC_EMAIL_REGEX.test(trimmed)) {
      return "Please enter a valid email address";
    }

    return "";
  },
  qTypeValidation(qType) {
    return !qType ? "Please select a query type" : "";
  },
  msgValidation(msg) {
    return !msg.trim() ? "This field is required" : "";
  },
  chkBxValidation(chkBx) {
    return !chkBx
      ? "To submit this form, please consent to being contacted"
      : "";
  },
};