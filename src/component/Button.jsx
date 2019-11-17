import React from 'react';

const Button = ({ children, imgSrc, ...rest }) => {
  return (
    <button {...rest}>
      <span>{children}</span>
      <img src={imgSrc || ''} alt="svg" />
    </button>
  );
};

export default Button;
