import { useState, useEffect } from 'react';
import { fetchDates, fetchAirports } from '../store/reducer';
import { useDispatch, useSelector } from 'react-redux';

const selectDates = (state) => {
  const { dates } = state;
  return dates;
};
const availableAirports = (state) => {
  const {
    airports: { reducer },
  } = state;

  if (reducer.selected) {
    const filtered = reducer.airports.filter(
      (x) => x.code !== reducer.selected
    );
    console.log(filtered);
    return filtered;
  }

  return reducer;
};

const airportsStatus = (state) => state.airports.fetchStatus;

const Dashboard = () => {
  const [inputs, setInputs] = useState({ origin: '', destination: '' });
  const [dates, setDates] = useState({ departure: '', comeback: '' });
  const [hide, setHide] = useState(true);
  const dispatch = useDispatch();
  const flyDates = useSelector(selectDates);
  const airports = useSelector(availableAirports);
  const airportsStatusSelector = useSelector(airportsStatus);

  const handleSelectedAirport = (e) => {
    const { target } = e;
    if (inputs.origin === '') {
      setInputs({ ...inputs, origin: target.id });
    } else if (inputs.destination === '') {
      setInputs({ ...inputs, destination: target.id });
      setHide(true);
    }
    dispatch({
      type: 'airports/selected',
      payload: { airports, selected: target.id },
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleHide = (e) => {
    if (e.target.id === 'origin') {
      setHide(!hide);
    } else if (e.target.id === 'destination' && inputs.origin === '') {
      setHide(!hide);
    }
  };

  useEffect(() => {
    dispatch(fetchDates());
    dispatch(fetchAirports());
  }, []);

  if (
    airportsStatusSelector.loading === 'pending' ||
    airportsStatusSelector.loading === 'idle'
  ) {
    return <h1>Loading</h1>;
  }

  return (
    <form>
      <div>
        <div>
          <input
            id='origin'
            type='text'
            placeholder='Origin'
            value={inputs.origin}
            onChange={handleChange}
            onClick={handleHide}
          />
          <input
            id='destination'
            type='text'
            placeholder='Destination'
            value={inputs.destination}
            onChange={handleChange}
            onClick={handleHide}
          />
        </div>
        <div hidden={!hide}>
          <input
            type='date'
            name='departure'
            id='departure'
            onChange={(e) => console.log(e.target.value)}
            min='2022-02-16'
          />
          <input type='date' name='comeback' id='comeback' />
        </div>
        <div hidden={!hide}>
          <input
            type='number'
            name='passagers'
            id='passagers'
            placeholder='Passagers'
          />
        </div>
      </div>
      <div hidden={hide}>
        <ul>
          {airports.map((x, i) => {
            return (
              <li id={x.code} key={i} onClick={handleSelectedAirport}>
                <p>{x.code}</p> <p>{x.name}</p>{' '}
              </li>
            );
          })}
        </ul>
      </div>
    </form>
  );
};

export default Dashboard;
