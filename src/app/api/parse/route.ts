import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

export const criteriaSchema = z.object({
  location: z.string().optional().describe('City or area'),
  propertyType: z.string().optional().describe('Type of property'),
  minPrice: z.number().optional().describe('Minimum price in CAD'),
  maxPrice: z.number().optional().describe('Maximum price in CAD'),
  beds: z.number().optional().describe('Minimum bedrooms'),
});

export async function POST(req: Request) {
  const { description } = await req.json();
  if (!description) {
    return NextResponse.json({ error: 'Missing description' }, { status: 400 });
  }

  const { object } = await generateObject({
    model: openai('gpt-3.5-turbo'),
    prompt: `Extract real estate search criteria from: "${description}"`,
    schema: criteriaSchema,
  });

  return NextResponse.json(object);
}
