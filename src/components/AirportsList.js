import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { availableAirports } from '../reducers/airportReducer';

const AirportList = () => {
  const [inputs, setInputs] = useState({ origin: '', destination: '' });
  const dispatch = useDispatch();
  const { airport } = useSelector(availableAirports);

  const handleSelectedAirport = ({ target }) => {
    const name = target.getAttribute('name');
    if (inputs.origin === '') {
      setInputs({ ...inputs, origin: { code: target.id, name: name } });
    } else if (inputs.destination === '') {
      setInputs({ ...inputs, destination: { code: target.id, name: name } });
    }
    dispatch({
      type: 'airports/selected',
      payload: { ...airport, selected: target.id },
    });
  };

  useEffect(() => {
    if (inputs.origin !== '' && inputs.destination !== '') {
      dispatch({
        type: 'airports/hidelist',
        payload: { hideR: true },
      });
    }
    
    dispatch({
      type: 'airports/inputs',
      payload: {
        origin: inputs.origin,
        destination: inputs.destination,
      },
    });
  }, [inputs, dispatch]);

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
