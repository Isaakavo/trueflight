import React from 'react';

const FormErrors = ({ formErrors }) => {
  return (
    <div>
      {Object.keys(formErrors).map((x, i) => {
        if (formErrors[x].length > 0) {
          return (
            <p key={i}>
              {x} {formErrors[x]}
            </p>
          );
        } else {
          return '';
        }
      })}
    </div>
  );
};

export default FormErrors;