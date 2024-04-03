import React from 'react';

function Button({ buttonText, buttonColor, textColor }) {
  return (
    <button className={`text-${textColor} bg-${buttonColor}-500 hover:bg-${buttonColor}-600 focus:ring-${buttonColor}-400 font-medium text-sm dark:bg-${buttonColor}-600 dark:hover:bg-${buttonColor}-700 focus:outline-none px-5 py-2 inline-block rounded-lg`}>
      {buttonText}
    </button>
  );
}

export default Button;
