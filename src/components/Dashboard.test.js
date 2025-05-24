import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios'; // This will be the mock from __mocks__
import Dashboard from './Dashboard';

// Mock the onCountryChange function
const mockOnCountryChange = jest.fn();

const mockDefaultDashboardData = {
  confirmed: 1272740,
  deaths: 16296,
  recovered: 1256000,
  confirmed_diff: 1,
  deaths_diff: 0,
  recovered_diff: 2,
  active: 444,
  active_diff: -1,
  fatality_rate: 0.0128,
  last_update: '2023-03-10 08:20:05',
};

describe('Dashboard Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    axios.request.mockClear();
    mockOnCountryChange.mockClear();
  });

  test('initial render: fetches and displays data for Morocco by default, no error message', async () => {
    axios.request.mockResolvedValueOnce({ data: [mockDefaultDashboardData] });

    render(<Dashboard countryIso="MAR" onCountryChange={mockOnCountryChange} />);

    // Check if API was called with MAR
    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        params: { iso: 'MAR' },
      }));
    });

    // Check for some data points
    expect(screen.getByText(mockDefaultDashboardData.confirmed.toLocaleString('en'))).toBeInTheDocument();
    expect(screen.getByText('Confirmed')).toBeInTheDocument();
    expect(screen.getByText(mockDefaultDashboardData.deaths.toLocaleString('en'))).toBeInTheDocument();
    expect(screen.getByText('Deaths')).toBeInTheDocument();

    // Check that no error message is displayed
    expect(screen.queryByText(/could not fetch data/i)).not.toBeInTheDocument();
  });

  // More tests will be added here

  test('country input and data fetching: allows typing, calls API with new ISO, displays new data', async () => {
    // Initial load with MAR
    axios.request.mockResolvedValueOnce({ data: [mockDefaultDashboardData] });
    render(<Dashboard countryIso="MAR" onCountryChange={mockOnCountryChange} />);

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        params: { iso: 'MAR' },
      }));
    });

    // User types "USA"
    const inputField = screen.getByPlaceholderText(/enter country iso/i);
    fireEvent.change(inputField, { target: { value: 'USA' } });
    expect(inputField.value).toBe('USA');

    // User clicks "Fetch Data"
    const mockUsaData = {
      confirmed: 50000000,
      deaths: 800000,
      recovered: 45000000,
      confirmed_diff: 1000,
      deaths_diff: 50,
      recovered_diff: 800,
      active: 4200000,
      active_diff: 150,
      fatality_rate: 0.016,
      last_update: '2023-03-10 09:00:00',
    };
    axios.request.mockResolvedValueOnce({ data: [mockUsaData] });
    fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    // Check onCountryChange was called
    expect(mockOnCountryChange).toHaveBeenCalledWith('USA');

    // Dashboard will receive "USA" as a prop from App.js in a real scenario,
    // so we re-render with the new prop to simulate App.js updating Dashboard
    // For this test, we are also checking if the internal state update triggers a fetch correctly.
    // In App.js, the call to onCountryChange would update selectedCountryIso,
    // which would then be passed as the countryIso prop to Dashboard.
    // So, the useEffect [initialCountryIso] in Dashboard would run, then useEffect [countryIso] (internal)

    // Let's assume App.js passes the new prop, so we re-render Dashboard
    // In a more integrated test (like in App.test.js), this re-render would happen naturally.
    // Here, we focus on Dashboard's own behavior upon prop change.
    // The `handleFetchData` calls `onCountryChange`, App.js updates state, and re-renders Dashboard with the new prop.
    // The test for `Dashboard` should ensure its internal `useEffect` based on `initialCountryIso` (the prop) and `countryIso` (internal state for API call) work.

    // After clicking "Fetch Data", `handleFetchData` calls `setCountryIsoInternal` and `onCountryChange`.
    // The `onCountryChange` is what App.js uses.
    // The `useEffect` listening to `countryIso` (internal) should trigger the new API call.

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        params: { iso: 'USA' },
      }));
    });

    // Check for new data
    expect(screen.getByText(mockUsaData.confirmed.toLocaleString('en'))).toBeInTheDocument();
    expect(screen.getByText(mockUsaData.deaths.toLocaleString('en'))).toBeInTheDocument();

    // Ensure old data is not present if it's different
    expect(screen.queryByText(mockDefaultDashboardData.confirmed.toLocaleString('en'))).not.toBeInTheDocument();
  });

  test('API error: displays error message, clears stats, and does not display stats cards', async () => {
    // Initial successful load
    axios.request.mockResolvedValueOnce({ data: [mockDefaultDashboardData] });
    render(<Dashboard countryIso="MAR" onCountryChange={mockOnCountryChange} />);

    await waitFor(() => {
      expect(screen.getByText(mockDefaultDashboardData.confirmed.toLocaleString('en'))).toBeInTheDocument();
    });
    expect(screen.queryByText(/could not fetch data/i)).not.toBeInTheDocument();


    // User types "XYZ" (an invalid ISO)
    const inputField = screen.getByPlaceholderText(/enter country iso/i);
    fireEvent.change(inputField, { target: { value: 'XYZ' } });

    // Mock API failure
    axios.request.mockRejectedValueOnce(new Error('API Error: Invalid ISO'));
    fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));

    // Check onCountryChange was called
    expect(mockOnCountryChange).toHaveBeenCalledWith('XYZ');

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/could not fetch data. please check the country iso code or try again later./i)).toBeInTheDocument();
    });

    // Check that stats are cleared (confirm one of the previous stats is gone)
    // The cards themselves are removed, so querying by role 'heading' for a stat value won't find it.
    expect(screen.queryByText(mockDefaultDashboardData.confirmed.toLocaleString('en'))).not.toBeInTheDocument();
    expect(screen.queryByText('Confirmed')).not.toBeInTheDocument(); // The card title

    // Check that no stats cards are displayed by looking for a common role or class if available
    // For example, if cards have a specific role or test-id. Here we assume they are gone if their content is.
  });

  test('API returns empty data: displays specific error message', async () => {
    axios.request.mockResolvedValueOnce({ data: [] }); // Simulate API returning empty array
    render(<Dashboard countryIso="EMPTY" onCountryChange={mockOnCountryChange} />);

    await waitFor(() => {
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        params: { iso: 'EMPTY' },
      }));
    });

    expect(screen.getByText(/could not fetch data. the country iso code might be invalid or no data is available./i)).toBeInTheDocument();
    expect(screen.queryByText('Confirmed')).not.toBeInTheDocument();
  });
});
