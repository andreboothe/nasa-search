import ErrorLabel from "./ErrorLabel";

const FormInput = ({
  id,
  type,
  label,
  placeholder,
  className,
  value,
  onChange,
  errorMessage,
  inputProps,
}) => {
  return (
    <div className={"form-group " + className}>
      <label htmlFor="query-input ">{label}</label>
      <div>
        <input
          type={type}
          className="form-control"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...inputProps}
        ></input>
        <ErrorLabel message={errorMessage} />
      </div>
    </div>
  );
};

export default FormInput;
