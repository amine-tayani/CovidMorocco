// src/__mocks__/axios.js
const mockAxios = {
  request: jest.fn(() => Promise.resolve({ data: [] })),
  get: jest.fn(() => Promise.resolve({ data: {} })),
};

export default mockAxios;
