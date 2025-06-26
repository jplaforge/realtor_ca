import PropertySearch from '../src/components/PropertySearch';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ location: 'Toronto', beds: 3 }),
  }) as any;
});

afterEach(() => {
  (global.fetch as jest.Mock).mockReset();
});

test('generates url with location and beds', async () => {
  render(<PropertySearch />);
  fireEvent.change(screen.getByPlaceholderText(/describe the property/i), {
    target: { value: 'something' },
  });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  const link = await screen.findByRole('link', { name: /open search results/i });
  expect(link.getAttribute('href')).toBe(
    'https://www.realtor.ca/map#GeoName=Toronto&BedsMin=3'
  );
});

test('generates url with multiple criteria', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      location: 'Vancouver',
      propertyType: '2',
      minPrice: 100,
      maxPrice: 200,
      beds: 2,
    }),
  });
  render(<PropertySearch />);
  fireEvent.change(screen.getByPlaceholderText(/describe the property/i), {
    target: { value: 'another' },
  });
  fireEvent.click(screen.getByRole('button', { name: /search/i }));

  const link = await screen.findByRole('link', { name: /open search results/i });
  expect(link.getAttribute('href')).toBe(
    'https://www.realtor.ca/map#GeoName=Vancouver&PropertyTypeGroupID=2&MinPrice=100&MaxPrice=200&BedsMin=2'
  );
});
