import { useState } from "react";


const InputPassagers = ({hide}) => {
  const [passagers, setPassagers] = useState({ number: 1 });

  const handlePassagersNumber = ({ target }) => {
    setPassagers({ ...passagers, number: target.value });
  };

  return (
    <div
      className='airports-container '
      hidden={!hide}
      onChange={handlePassagersNumber}
      // disabled={disabled.passagers}
    >
      <input
        className='inputs inputs-disabled'
        type='number'
        name='passagers'
        id='passagers'
        placeholder='Passagers'
        value={passagers.number}
        onChange={handlePassagersNumber}
        // disabled={disabled.passagers}
      />
    </div>
  );
};

export default InputPassagers;
