import React from 'react';

function Button({ buttonText, buttonColor,textColor }) {
  return (
    <button className={`text-${textColor} hover:bg-${buttonColor}-800 focus:ring-${buttonColor}-300 font-medium text-sm dark:bg-${buttonColor}-600 dark:hover:bg-${buttonColor}-700 focus:outline-none px-5 py-2 inline-block rounded-lg`}>
      {buttonText}
    </button>
  );
}

export default Button;
