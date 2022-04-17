import { useState } from "react";
import { omit } from "lodash";

const useForm = () => {
  const [values, setValues] = useState({});
  // for Errors
  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (value.length < 3) {
          setErrors({
            ...errors,
            name: "Name should contain atleat 3 characters",
          });
        } else {
          let newObj = omit(errors, "name");
          setErrors(newObj);
        }
        break;

      case "phone":
        if (
          !new RegExp(/^[6-9]\d{9}$/).test(
            value
          )
        ) {
          setErrors({
            ...errors,
            phone: "Not a valid phone number",
          });
        } else {
          let newObj = omit(errors, "phone");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };

  const onInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    validate(name, value);

    setValues({
      ...values,
      [name]: value,
    });
  };

  return {
    values,
    errors,
    onInputChange,
  };
};

export default useForm;
