import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../../services/AuthService";
import { setAccessToken } from "../../../stores/AccessTokenStore";
import { login } from "../../../services/AuthService";
import { useUser } from "../../../hooks/useUser";
//eslint-disable-next-line
const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const NUM_PATTERN = /[0-9]/;
const CAPITAL_PATTERN = /[A-Z]/;

const validators = {
  email: (value) => {
    let message;
    if (!value) {
      message = "Email is required";
    } else if (!EMAIL_PATTERN.test(value)) {
      message = "Email is invalid";
    }
    return message;
  },
  password: (value) => {
    let message;
    if (!value) {
      message = "Password is required";
    } else if (!NUM_PATTERN.test(value)) {
      message = "Your password must contain at least one number";
    } else if (!CAPITAL_PATTERN.test(value)) {
      message = "Your password must contain at least one capital letter";
    } else if (value && value.length < 8) {
      message = "Your password must contain at least 8 characters";
    }
    return message;
  },
  password2: (value, password) => {
    let message;
    if (!value) {
      message = "Password is required";
    } else if (value !== password) {
      message = "Their passwords don't match";
    }
    return message;
  },
};

export const RegisterScreen = () => {
  const { push } = useHistory();
  const { doLogin } = useUser();
  const [state, setstate] = useState({
    fields: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    errors: {
      email: validators.email(),
      password: validators.password(),
    },
  });

  const [touched, setTouched] = useState({});

  const isValid = () => {
    const { errors } = state;
    return !Object.keys(errors).some((error) => errors[error]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      register(state.fields)
        .then((response) => {
          const fields = {
            email: state.fields.email,
            password: state.fields.password,
          };
          login(fields).then((response) => {
            setAccessToken(response.access_token);
            doLogin().then(() => {
              push("/CarePet");
            });
          });
        })
        .catch((e) => console.log(e));
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setstate((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: value,
      },
      errors: {
        ...prevState.errors,
        [name]:
          validators[name] && validators[name](value, state.fields.password),
      },
    }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const onFocus = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: false,
    }));
  };

  const { name, email, password, password2 } = state.fields;
  const { errors } = state;
  return (
    <>
      <div className="auth__head">
        <h3 className="auth__title">Register</h3>
        <Link to="/">
          <i className="fas fa-dog fa-2x"></i>
        </Link>
      </div>
      <form onSubmit={onSubmit}>
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
        />
        <input
          className={`auth__input ${
            errors.email && touched.email ? "auth__invalid" : ""
          }`}
          type="text"
          placeholder="email"
          name="email"
          value={email}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
        />
        <input
          className={`auth__input ${
            errors.password && touched.password ? "auth__invalid" : ""
          }`}
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          value={password2}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          autoComplete="off"
        />
        {errors.email && (
          <div className="auth__alert-error">{errors.email}</div>
        )}
        {errors.password && (
          <div className="auth__alert-error">{errors.password}</div>
        )}
        {errors.password2 && (
          <div className="auth__alert-error">{errors.password2}</div>
        )}
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Register
        </button>
        <Link className="link" to="/auth/login">
          Ya estás registrado?
        </Link>
      </form>
    </>
  );
};
