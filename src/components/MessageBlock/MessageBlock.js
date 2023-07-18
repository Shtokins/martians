import styles from "./MessageBlock.module.scss";

const MessageBlock = ({ requestSuccess }) => {
  if (requestSuccess === null) return null;
  const message = requestSuccess
    ? "Login successful. Welcome!"
    : "Something went wrong. Please, try again.";
  return (
    <div
      className={`${styles.messageBlock} ${
        requestSuccess ? styles.positive : styles.negative
      }`}
    >
      {message}
    </div>
  );
};

export default MessageBlock;
