import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../../services/AuthService";
import { setAccessToken } from "../../../stores/AccessTokenStore";
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

export const LoginScreen = ({ clouse}) => {
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
        doLogin().then((r) => {
          clouse();
          push("/account/dashboard/user");
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
    <div className="_mx_2 _c_p1">
      <h1 className="_ta_c">Hola de nuevo!</h1>
      <p className="_ta_c _pb_1">Te echabamos de menos!</p>
      <form onSubmit={onSubmit}>
          <div className=" _d_f _fd_c ">
            <div className="row _d_f _bg_c_w _br_2 _my_1">
              <span class="_mw_2 material-icons _p_1 _fs_3 _m_0 _pr_1 _c_i1">alternate_email</span>
              <input
                className={`_mw_8 _m_0 _fs_2 _br_2 _bs_n  ol_n _bg_c_w   ${
                  errors.email
                    ? // && touched.email
                      "_c_r"
                    : "_c_g"
                }`}
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                // autoComplete="off"
              />
            </div>
            {errors.email && <div className="_ta_c">{errors.email}</div>}
            <div className="row _d_f _bg_c_w _br_2 _my_1">
              <span class="_mw_2 material-icons _p_1 _fs_3 _m_0 _pr_1 _c_i1">vpn_key</span>
              <input
                className={`_mw_8 _bs_n _br_2 _p_5s ol_n _fs_2 ${
                  errors.password
                    ? // && touched.password
                      "_c_r"
                    : "_c_g"
                }`}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                // autoComplete="off"
              />
            </div>
            {errors.password && (
              <div className="_ta_c _pt_1">{errors.password}</div>
            )}
            <button
              className={`_fs_2 _bs_n ol_n _my_1 _px_3 _br_2 _py_1 ${
                isValid() ? "_bg_c_r _c_w" : "_bg_c_lg "
              } btn-block`}
              type="submit"
              disabled={!isValid()}
            >
              Sing in
            </button>
            <div><p className="_ta_c">O continua con</p></div>
          </div>
      </form>
    </div>
  );
};
