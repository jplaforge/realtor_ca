# Realtor.ca Natural Language Search

This project is a minimal Next.js application that converts natural-language property descriptions into a search on [realtor.ca](https://www.realtor.ca/). It uses the `@ai-sdk/openai` package to interpret the description and build a realtor.ca search URL.

## Setup

1. **Install dependencies**
   ```bash
   yarn install
   ```

2. **Environment variables**

   Create a `.env.local` file with your OpenAI API key:
   ```bash
   cp .env.local.example .env.local
   # then edit .env.local and set OPENAI_API_KEY
   ```

3. **Run the development server**
   ```bash
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

On the homepage, enter a natural-language description of the type of property you are looking for. After submitting, a link appears that opens realtor.ca with the criteria extracted from your description.

## Project Structure

- `src/app/` – Next.js app router pages and API routes
- `src/components/PropertySearch.tsx` – form for entering a description and generating a realtor.ca search URL
- `src/app/api/parse/route.ts` – serverless function that calls the OpenAI API

## Environment Variables

- `OPENAI_API_KEY` – your OpenAI API key used to generate search criteria

A sample `.env.local.example` file is included.
