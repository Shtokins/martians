import { useEffect, useRef, useState } from "react";
import { useValidation } from "../../hooks/useValidation";
import styles from "./Input.module.scss";

function Input({
  formValue,
  onFormChange,
  login,
  placeholder,
  type,
  validation,
  name
}) {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const { hiddenError, text, checkError } = useValidation(inputRef);

  const keyDownHandler = e => {
    const { keyCode } = e;

    if (keyCode === 13) {
      if (!hiddenError && value) {
        login();
      } else checkError();
    }
  };

  useEffect(() => {
    if ((hiddenError || !value) && formValue) onFormChange("", name);
    else if (value && !formValue && !hiddenError) onFormChange(value, name);
  }, [hiddenError]);

  const onChangeHandler = e => {
    const {
      target: { value }
    } = e;
    setValue(value);
  };

  return (
    <div className={styles.inputBlock}>
      <input
        type={type}
        name={name}
        onChange={onChangeHandler}
        ref={inputRef}
        onKeyDown={keyDownHandler}
        value={value}
        placeholder={placeholder}
        {...validation}
      />
      {text ? <div className={styles.alarm}>{text}</div> : null}
    </div>
  );
}

export default Input;
