import React from "react";

export const Input3 = ({
  icon,
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  errors,
  classN,
  autoComplete,
  touched,
}) => {
  return (
    <div className={`_ipt3cont _h_2 ${classN} `}>
      {/* <div className="_d_f _ai_c"> */}
      <i className={`${icon} _pl5s _p_a `} style={{ bottom: "15px" }}></i>
      <input
        className="_ipt3ef1_0 _h_2 _br_2"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        required
        autoComplete={autoComplete}
      />
      {/* </div> */}
      <span className="focus-border"></span>
      {errors && touched && <div className="_ml1 _mt1s _mb2">{errors}</div>}
    </div>
  );
};
