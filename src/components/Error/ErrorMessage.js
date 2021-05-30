import { Message } from "semantic-ui-react";

const ErrorMessage = ({ message }) => {
  return <Message error>{message}</Message>;
};

export default ErrorMessage;
