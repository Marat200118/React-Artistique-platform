import formstyles from "../styles/forms.module.css";
import PropTypes from "prop-types";

const ErrorField = ({ data, field }) => {
  if (data && data.error?.[field]) {
    return <p className={formstyles.error}>{data.error[field]}</p>;
  }
  return null;
};

ErrorField.propTypes = {
  data: PropTypes.object,
  field: PropTypes.string.isRequired,
};

export default ErrorField;