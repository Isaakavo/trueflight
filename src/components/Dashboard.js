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
  return reducer;
};

const airportsStatus = (state) => state.airports.fetchStatus;

const Dashboard = () => {
  const [hide, setHide] = useState(true);
  const dispatch = useDispatch();
  const flyDates = useSelector(selectDates);
  const airports = useSelector(availableAirports);
  const airportsStatusSelector = useSelector(airportsStatus);

  
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
        <input
          type='text'
          placeholder='Origin'
          onClick={() => setHide(!hide)}
        />
        <input type='text' placeholder='Destination' />
      </div>
      <div hidden={hide}>
        <ul>
          {airports.map((x, i) => {
            return (
              <li id={x.code} key={i} onClick={(e) => console.log(e.target.id)}>
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
