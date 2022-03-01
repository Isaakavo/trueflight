import React from 'react';
import {
  render,
  cleanup,
  prettyDOM,
  fireEvent,
  screen,
  waitFor,
} from '../setupTests';
import Dashboard from '../components/Dashboard';
import * as reactRedux from 'react-redux';

import { initialStateMock,inputsMock } from './mocks/mocks';

const mockedAiports = {
  input: { origin: { code: '' }, destination: { code: '' } },
  hideList: true,
  loading: 'succeded',
  airport: ['MX', 'MID', 'TOR'],
  dates: {
    allDates: [],
    comeback: '',
    departure: '',
    maxDate: '',
    minDate: { date: '2022-02-15' },
  },
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

  test('check loading display', () => {
    useSelectorMock.mockReturnValue(initialStateMock);
    render(<Dashboard />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test.only('check if inputs are render', async () => {
    useSelectorMock.mockReturnValue(inputsMock);
    render(<Dashboard />);
    let originInput = screen.getByPlaceholderText('Origin');
    let destinationInput = screen.getByPlaceholderText('Destination');
    let dateInput = screen.getByPlaceholderText('Departure Date');
    let passengersInput = screen.getByPlaceholderText('Passengers (max 10)');
    let submitButton = screen.getByText('Submit');

    expect(originInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
    expect(passengersInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('Check if aiportList is being render', async () => {
    useSelectorMock.mockReturnValue({
      ...mockedAiports,
      airport: airportListMock,
      hideList: false,
    });
    render(<Dashboard />);
    let originInput = screen.getByPlaceholderText('Origin');
    let destinationInput = screen.getByPlaceholderText('Destination');
    let airportList = screen.getByText('MX');
    expect(originInput).toBeInTheDocument();
    expect(destinationInput).toBeInTheDocument();
    expect(airportList).toBeInTheDocument();
  });

  test('Form must not send data when inputs are empty', () => {
    useSelectorMock.mockReturnValue({
      ...mockedAiports,
      airport: airportListMock,
    });
    render(<Dashboard />);
    let button = screen.getByText('Submit');
    expect(button).toBeDisabled();
  });
});
