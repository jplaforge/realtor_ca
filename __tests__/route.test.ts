import { POST, criteriaSchema } from '../src/app/api/parse/route';
import { generateObject } from 'ai';

jest.mock('ai');

describe('criteriaSchema', () => {
  it('parses valid data', () => {
    const data = criteriaSchema.parse({ location: 'Toronto', minPrice: 100 });
    expect(data).toEqual({ location: 'Toronto', minPrice: 100 });
  });

  it('rejects invalid data', () => {
    const result = criteriaSchema.safeParse({ minPrice: 'bad' });
    expect(result.success).toBe(false);
  });
});

describe('POST', () => {
  const mockedGenerate = generateObject as jest.Mock;

  beforeEach(() => {
    mockedGenerate.mockResolvedValue({ object: { location: 'Calgary' } });
  });

  afterEach(() => {
    mockedGenerate.mockReset();
  });

  it('returns extracted criteria', async () => {
    const req = new Request('http://test', {
      method: 'POST',
      body: JSON.stringify({ description: 'any' }),
    });
    const res = await POST(req);
    const data = await res.json();
    expect(mockedGenerate).toHaveBeenCalledWith(
      expect.objectContaining({ schema: criteriaSchema })
    );
    expect(data).toEqual({ location: 'Calgary' });
  });
});
