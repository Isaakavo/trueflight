import React from 'react';
import { render, cleanup, prettyDOM, screen, fireEvent } from '../setupTests';
import Dashboard from '../components/Dashboard';
import firebase from 'firebase';
import * as reactRedux from 'react-redux';

const mockedAiports = {
  input: { origin: { code: '' }, destination: { code: '' } },
  hideR: true,
  loading: 'succeded',
};

const airportListMock = [
  {
    code: 'MX',
    name: 'Ciudad de Mexico',
  },
  {
    code: 'MID',
    name: 'Merida',
  },
];

describe('Test of dashboard component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
  }));
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const fetchAiports = Promise.resolve([
    {
      code: 'MX',
      name: 'Ciudad de Mexico',
    },
  ]);
  jest.spyOn(firebase, 'app').mockImplementation(() => ({
    firestore: () => ({
      collection: () => ({
        get: () => fetchAiports,
      }),
    }),
  }));

  test('check loading display', () => {
    useSelectorMock.mockReturnValue(mockedAiports);
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('check if inputs are render', async () => {
    useSelectorMock.mockReturnValue(mockedAiports);
    render(<Dashboard />);
    let originInput = screen.getByPlaceholderText('Origin');
    let destinationInput = screen.getByPlaceholderText('Destination');
    let dateInput = screen.getByPlaceholderText('Departure Date');
    let passengersInput = screen.getByPlaceholderText('Passengers');
    let submitButton = screen.getByText('Submit');

    expect(originInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(passengersInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test.only('Check if aiportList is being render', () => {
    useSelectorMock.mockReturnValue({
      ...mockedAiports,
      airport: airportListMock,
    });
    render(<Dashboard />);
    let originInput = screen.getByPlaceholderText('Origin');
    let destinationInput = screen.getByPlaceholderText('Destination');
    fireEvent.click(originInput);
    fireEvent.click(destinationInput);
    console.log(prettyDOM());
  });
});
