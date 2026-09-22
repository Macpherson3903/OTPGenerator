# OTP Generator

A small React application that generates random numeric one-time passwords (OTPs), shows a countdown until they expire, and lets you copy the displayed code.

## Features

- Generates a random six-digit OTP
- Starts a five-second expiry countdown for each generated code
- Prevents generating another OTP while the current code is active
- Copies the displayed OTP to the clipboard
- Announces timer updates to screen readers

## Tech stack

- React
- Vite
- Tailwind CSS

## Getting started

### Prerequisites

Install a current [Node.js](https://nodejs.org/) LTS release, which includes npm.

### Install and run

```bash
npm install
npm run dev
```

Vite will print a local address in the terminal, normally `http://localhost:5173`. Open it in your browser.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Creates an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | Checks the project with ESLint. |

## How it works

Selecting **Generate OTP** creates a numeric code and begins its countdown. While the timer is running, the generate button is disabled. When the countdown reaches zero, the application marks the code as expired; generate another OTP to start again. Use **Copy** to place the displayed code on your clipboard.

## Configuration

The `App` component accepts optional props:

```jsx
<App length={6} validSeconds={5} />
```

- `length` sets the number of digits in each OTP (default: `6`).
- `validSeconds` sets how long the OTP remains active in seconds (default: `5`).

## Project structure

```text
src/
├── App.jsx       # OTP generation, countdown, and copy behavior
├── App.css       # Component styles
├── index.css     # Global styles and Tailwind import
└── main.jsx      # React application entry point
```
