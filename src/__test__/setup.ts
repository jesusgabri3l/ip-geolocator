import '@testing-library/jest-dom';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';
import geoMockResponse from './mocks/ipGeoResponse.json';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

export const restHandlers = [
  rest.get('https://geo.ipify.org/api/v2/country,city', (req, res, ctx) => {
    const ipAddress = req.url.searchParams.get('ipAddress');
    // Default IP ADDRESS - Google IP (Only for testing purpose)
    if (!ipAddress) return res(ctx.status(200), ctx.json(geoMockResponse[0]));
    else return res(ctx.status(200), ctx.json(geoMockResponse[1]));
  }),
];
const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
