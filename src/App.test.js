import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios'; // This will be the mock from __mocks__
import App from './App';

// Mock data for Dashboard (RapidAPI)
const mockMarData = {
  confirmed: 1272740, deaths: 16296, recovered: 1256000, active: 444,
  confirmed_diff: 1, deaths_diff: 0, recovered_diff: 2, active_diff: -1,
  fatality_rate: 0.0128, last_update: '2023-03-10 08:20:05',
};

const mockUsaData = {
  confirmed: 50000000, deaths: 800000, recovered: 45000000, active: 4200000,
  confirmed_diff: 1000, deaths_diff: 50, recovered_diff: 800, active_diff: 150,
  fatality_rate: 0.016, last_update: '2023-03-10 09:00:00',
};

// Mock data for StatsChart (covid-morocco-api.vercel.app)
const mockMoroccoCases = [
  { date: '2023-01-01', new_cases: 100 },
  { date: '2023-01-02', new_cases: 150 },
];
const mockMoroccoDeaths = [
  { date: '2023-01-01', new_deaths: 5 },
  { date: '2023-01-02', new_deaths: 10 },
];

describe('App Component Integration Tests', () => {
  beforeEach(() => {
    axios.request.mockClear();
    axios.get.mockClear(); // Clear if StatsChart uses axios.get
  });

  test('initial render: Dashboard shows MAR data, StatsChart shows MAR charts', async () => {
    // Dashboard (RapidAPI)
    axios.request.mockResolvedValueOnce({ data: [mockMarData] });
    // StatsChart (Morocco API) - two calls
    axios.get
      .mockResolvedValueOnce({ data: mockMoroccoCases }) // First call for cases
      .mockResolvedValueOnce({ data: mockMoroccoDeaths }); // Second call for deaths

    render(<App />);

    // Verify Dashboard content for MAR
    await waitFor(() => {
      expect(screen.getByText(mockMarData.confirmed.toLocaleString('en'))).toBeInTheDocument();
    });
    expect(screen.getByText('Confirmed')).toBeInTheDocument(); // From Dashboard

    // Verify StatsChart content for MAR (e.g., by checking chart titles or a piece of data if possible)
    // Since charts are complex, we might just check that it doesn't show the "only for morocco" message initially
    expect(screen.getByText(/Daily new Covid Cases \(Morocco\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Daily new deaths from covid \(Morocco\)/i)).toBeInTheDocument();
    expect(screen.queryByText(/Daily charts are currently only available for Morocco/i)).not.toBeInTheDocument();

    // Check API calls
    expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
      params: { iso: 'MAR' },
    }));
    expect(axios.get).toHaveBeenCalledWith("https://covid-morocco-api.vercel.app/cases");
    expect(axios.get).toHaveBeenCalledWith("https://covid-morocco-api.vercel.app/deaths");
  });

  test('country change propagation: USA selection updates Dashboard, StatsChart shows message', async () => {
    // Initial load for MAR
    axios.request.mockResolvedValueOnce({ data: [mockMarData] });
    axios.get
      .mockResolvedValueOnce({ data: mockMoroccoCases })
      .mockResolvedValueOnce({ data: mockMoroccoDeaths });

    render(<App />);

    // Wait for initial MAR data in Dashboard
    await waitFor(() => {
      expect(screen.getByText(mockMarData.confirmed.toLocaleString('en'))).toBeInTheDocument();
    });

    // User types "USA" in Dashboard's input
    const inputField = screen.getByPlaceholderText(/enter country iso/i);
    fireEvent.change(inputField, { target: { value: 'USA' } });

    // Mock API response for USA for Dashboard
    axios.request.mockResolvedValueOnce({ data: [mockUsaData] });

    // User clicks "Fetch Data"
    fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    // Verify Dashboard updates to USA data
    await waitFor(() => {
      expect(screen.getByText(mockUsaData.confirmed.toLocaleString('en'))).toBeInTheDocument();
    });
    expect(screen.queryByText(mockMarData.confirmed.toLocaleString('en'))).not.toBeInTheDocument(); // Old MAR data gone

    // Verify StatsChart updates to show the "only available for Morocco" message
    expect(screen.getByText(/Daily charts are currently only available for Morocco/i)).toBeInTheDocument();
    expect(screen.queryByText(/Daily new Covid Cases \(Morocco\)/i)).not.toBeInTheDocument(); // Morocco chart title gone

    // Verify API calls: Dashboard called for USA, StatsChart should not make new calls for USA
    expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
      params: { iso: 'USA' },
    }));
    // Ensure StatsChart's Morocco API calls were made once for initial load, but not again for USA
    expect(axios.get).toHaveBeenCalledTimes(2); // Still 2 from initial load
  });

  test('country change back to MAR: Dashboard shows MAR data, StatsChart shows MAR charts again', async () => {
    // Initial load for USA (to simulate being on a different country)
    axios.request.mockResolvedValueOnce({ data: [mockUsaData] });
    // StatsChart will initially show message because App starts with MAR, then we change to USA
    // So, first App render: MAR for Dashboard, MAR for StatsChart
    // Then, change to USA: USA for Dashboard, message for StatsChart
    // Then, change back to MAR: MAR for Dashboard, MAR for StatsChart

    // 1. Initial load (MAR)
    axios.request.mockResolvedValueOnce({ data: [mockMarData] });
    axios.get
      .mockResolvedValueOnce({ data: mockMoroccoCases }) // cases for initial MAR
      .mockResolvedValueOnce({ data: mockMoroccoDeaths }); // deaths for initial MAR
    render(<App />);
    await waitFor(() => expect(screen.getByText(mockMarData.confirmed.toLocaleString('en'))).toBeInTheDocument());
    expect(screen.getByText(/Daily new Covid Cases \(Morocco\)/i)).toBeInTheDocument();


    // 2. Change to USA
    const inputField = screen.getByPlaceholderText(/enter country iso/i);
    fireEvent.change(inputField, { target: { value: 'USA' } });
    axios.request.mockResolvedValueOnce({ data: [mockUsaData] });
    fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));
    await waitFor(() => expect(screen.getByText(mockUsaData.confirmed.toLocaleString('en'))).toBeInTheDocument());
    expect(screen.getByText(/Daily charts are currently only available for Morocco/i)).toBeInTheDocument();
    
    // API calls so far: Dashboard (MAR, USA), StatsChart (MAR)
    expect(axios.request).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledTimes(2);


    // 3. Change back to MAR
    fireEvent.change(inputField, { target: { value: 'MAR' } });
    axios.request.mockResolvedValueOnce({ data: [mockMarData] }); // Dashboard MAR data
    // StatsChart Morocco API calls will be made again
    axios.get
      .mockResolvedValueOnce({ data: mockMoroccoCases }) // cases for new MAR
      .mockResolvedValueOnce({ data: mockMoroccoDeaths }); // deaths for new MAR
    fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    // Verify Dashboard updates to MAR data
    await waitFor(() => {
      expect(screen.getByText(mockMarData.confirmed.toLocaleString('en'))).toBeInTheDocument();
    });
    expect(screen.queryByText(mockUsaData.confirmed.toLocaleString('en'))).not.toBeInTheDocument(); // Old USA data gone

    // Verify StatsChart updates to show Morocco charts again
    await waitFor(() => {
       expect(screen.getByText(/Daily new Covid Cases \(Morocco\)/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/Daily charts are currently only available for Morocco/i)).not.toBeInTheDocument();

    // API calls: Dashboard (MAR, USA, MAR), StatsChart (MAR, MAR)
    expect(axios.request).toHaveBeenCalledTimes(3);
    expect(axios.request).toHaveBeenLastCalledWith(expect.objectContaining({ params: { iso: 'MAR' } }));
    expect(axios.get).toHaveBeenCalledTimes(4); // 2 for initial MAR, 2 for re-selected MAR
  });
});
