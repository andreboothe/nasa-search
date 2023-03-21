const ErrorLabel = ({ message }) => {
  if (message && !message.length) return null;
  return <div className="text-danger">{message}</div>;
};

export default ErrorLabel;
