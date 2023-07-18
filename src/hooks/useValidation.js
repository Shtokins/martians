import { useState, useRef, useEffect } from "react";

const VALIDATION_ERRORS = {
  email: "Entered email is not valid",
  password: "Entered password is too short"
};

export const useValidation = ({ current: inputField }) => {
  const [hiddenError, setHiddenError] = useState(
    () =>
      !inputField?.value || (inputField?.value && !inputField?.validity?.valid)
  );
  const [text, setText] = useState(null);
  // VV: wasted used for turning the error ON if they has already mistaken before
  const wasted = useRef(false);

  useEffect(() => {
    if (inputField) {
      inputField.addEventListener("blur", () => {
        setHiddenError(currentHidden => {
          setText(currentText => {
            if (currentHidden && !currentText) {
              wasted.current = true;
              return VALIDATION_ERRORS[name];
            } else return currentText;
          });

          return currentHidden;
        });
      });
    }
  }, [inputField]);
  const checkError = () => {
    if (!text && hiddenError) {
      setText(VALIDATION_ERRORS[name]);
    }
  };

  if (!inputField) return { hiddenError, text: "", checkError };
  const {
    validity: { valid },
    name
  } = inputField;

  if (!hiddenError && !valid) setHiddenError(true);
  else if (hiddenError && valid) setHiddenError(false);
  else if (hiddenError && wasted.current && !text)
    setText(VALIDATION_ERRORS[name]);
  if (text && !hiddenError) setText(null);

  return { hiddenError, text, checkError };
};
