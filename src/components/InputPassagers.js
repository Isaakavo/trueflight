import { useState } from 'react';
import { useDispatch } from 'react-redux';

const InputPassagers = ({ hide }) => {
  const [passagers, setPassagers] = useState({ number: 1 });
  const dispatch = useDispatch();

  const handlePassagersNumber = ({ target }) => {
    const { value } = target;
    if (value < 1) {
      setPassagers({ ...passagers, number: 1 });
      return;
    }
    setPassagers({ ...passagers, number: value });
    dispatch({
      type: 'airports/passagers',
      payload: { passagers: { number: value } },
    });
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
