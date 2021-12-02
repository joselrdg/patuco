import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../services/AuthService";
import { setAccessToken } from "../../stores/AccessTokenStore";
import { useUser } from "../../hooks/useUser";

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
};

export const LoginScreen = () => {
  const { push } = useHistory();
  const { doLogin } = useUser();

  const [state, setstate] = useState({
    fields: {
      email: "",
      password: "",
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
    const { fields } = state;
    e.preventDefault();
    if (isValid()) {
      login(fields).then((response) => {
        setAccessToken(response.access_token);
        doLogin().then(() => {
          push("/CarePet");
        });
      });
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
        [name]: validators[name] && validators[name](value),
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

  const { email, password } = state.fields;
  const { errors } = state;

  return (
    <>
      <div className="auth__head">
        <h3 className="auth__title">Login</h3>
        <Link to="/">
          <i className="fas fa-dog fa-2x"></i>
        </Link>
      </div>
      <form onSubmit={onSubmit}>
        <input
          className={`auth__input ${
            errors.email && touched.email ? "auth__invalid" : ""
          }`}
          type="text"
          placeholder="Email"
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
        {errors.password && (
          <div className="auth__alert-error">{errors.password}</div>
        )}
        {errors.email && (
          <div className="auth__alert-error">{errors.email}</div>
        )}
        <button
          className={`btn ${
            isValid() ? "btn-primary" : "btn-primary-d"
          } btn-block`}
          type="submit"
          disabled={!isValid()}
        >
          Login
        </button>
        <hr />
        {/* <div className="auth__social-networks">
          <p>Login with social networks</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div> */}
        <Link to="/auth/register">
          <p className="link __my-1">Crear una cuenta nueva</p>
        </Link>
      </form>
    </>
  );
};
