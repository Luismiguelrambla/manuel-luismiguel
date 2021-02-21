import React, { useState } from "react";
import FormSignup from "./FormSignup";
import FormSuccess from "./FormSuccess";
import "../css/Form.css";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className="form-container">
        <span className="close-btn">x</span>
        <div className="form-content-left">
          <img
            src="images/team-form.svg"
            alt="spaceship"
            className="form-img"
          />
        </div>
        {!isSubmitted ? <FormSignup /> : <FormSuccess />}
      </div>
    </>
  );
};

export default Form;
