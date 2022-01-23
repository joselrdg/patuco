import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../../services/AuthService";
import { setAccessToken } from "../../../../stores/AccessTokenStore";
import { useUser } from "../../../../hooks/useUser";
import { Input3 } from "../../../common/input/Input3";
import LogoName from "../../../../assets/svg/logoopti.svg";
// import "./c.css";
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
  const { push } = useNavigate();
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
          push("/");
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
    <div className="">
      <div
        className="_mx_a _my5 _d_f _fw_w _bg_c_p1"
        style={{ maxWidth: "500px" }}
      >
        <div className="_mx1">
          <div style={{ minWidth: "100%" }}>
            <div className="_d_f _fw_w _jc_sb _ai_c">
              <div className="_ml1 _mt1">
                <h1 className="_ta_c _pb2">Hola de nuevo!</h1>
                <p className="_ta_c">Te echabamos de menos!</p>
              </div>
              <Link to="/">
                <img
                  className="_mr1"
                  style={{ height: "150px" }}
                  src={LogoName}
                  alt="logo"
                />
              </Link>
            </div>
            <form onSubmit={onSubmit} className="">
              <div className="_my2">
                <Input3
                  icon="fas fa-envelope"
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  errors={errors.email}
                  autoComplete="off"
                  touched={touched.password}
                  classN={`${errors.email ? "_c_r" : "_c_p0"}`}
                />
              </div>
              <div>
                <Input3
                  icon={errors.password ? "fas fa-lock" : "fas fa-unlock"}
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  errors={errors.password}
                  autoComplete="off"
                  touched={touched.email}
                  classN={`${errors.password ? "_c_r" : "_c_p0"}`}
                />
              </div>

              <div className="_d_f _fd_c _jc_c _mt2">
                <button
                  className={`_btn1  ${
                    isValid() ? "_btn_bg1" : "_btn_bg0"
                  } _mx_a`}
                  type="submit"
                  disabled={!isValid()}
                >
                  Iniciar sesión
                </button>
                <a href="#" className="_ta_c _pt1">
                  He olvidado mi contraseña
                </a>
              </div>
            </form>
          </div>
          <div>
            <div className="_d_f _ai_c _jc_c _my3">
              <div style={{ minWidth: "100px" }}>
                <hr />
              </div>
              <p className="_ta_c _mx2">O continua con</p>
              <div style={{ minWidth: "100px" }}>
                <hr />
              </div>
            </div>

            <button href="#" className="_btn1 _btn_bg2">
              <i className="fab fa-facebook-f _pr1"></i> Continuar con Facebook
            </button>
            <button href="#" className="_btn1 _btn_bg3  _my1">
              <i className="fab fa-google-plus-g _pr1"></i>Continuar con Google+
            </button>
          </div>
          <div className="_my2">
            <hr />
            <p className="_my2 _ta_c">
              ¿Todabía sin cuenta?{" "}
              <Link to="/auth/register" className="_ml1">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
