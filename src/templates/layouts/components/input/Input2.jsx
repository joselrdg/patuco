import React from "react";

export const Input2 = ({
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
  autoComplete
}) => {
  return (
    <div class="_ipt2_group">
      <input
        className={`_ipt2 ${classN}`}
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
      <span className="_highlight"></span>
      <span className="_bar"></span>
      <label className="_ipt2label">{label}</label>
      {errors && <div className="">{errors}</div>}
    </div>
  );
};
