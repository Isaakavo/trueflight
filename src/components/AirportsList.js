import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { availableAirports } from '../features/airportReducer';

const AirportList = ({ setHide }) => {
  const [inputs, setInputs] = useState({ origin: '', destination: '' });
  // const [hide, setHide] = useState(true);
  const dispatch = useDispatch();
  const { airport } = useSelector(availableAirports);

  const handleSelectedAirport = ({ target }) => {
    if (inputs.origin === '') {
      setInputs({ ...inputs, origin: target.id });
    } else if (inputs.destination === '') {
      setHide(true);
      setInputs({ ...inputs, destination: target.id });
      // setDisabled({ ...disabled, dates: false });
    }
    // debugger;
    dispatch({
      type: 'airports/selected',
      payload: { airport, selected: target.id, inputs },
    });
  };

  useEffect(() => {
    console.log('useEffect');
    dispatch({
      type: 'airports/inputs',
      payload: { origin: inputs.origin, destination: inputs.destination },
    });
  }, [inputs, inputs.destination, dispatch]);


  return (
    <div className='airports-list'>
      <ul>
        {airport.map((x, i) => {
          return (
            <li
              id={x.code}
              name={x.name}
              key={i}
              onClick={handleSelectedAirport}
            >
              <p
                id={x.code}
                name={x.name}
                onClick={handleSelectedAirport}
                className='airports-name'
              >
                {x.name}
              </p>{' '}
              <p
                id={x.code}
                name={x.name}
                onClick={handleSelectedAirport}
                className='airports-code'
              >
                {x.code}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AirportList;
