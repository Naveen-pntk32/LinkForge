# **App Name**: LinkForge

## Core Features:

- URL Shortening: Allows users to input a long URL, validity period (optional), and custom shortcode (optional) to generate a shortened URL.
- Client-Side Validation: Validates URL format, validity period (integer), and alphanumeric shortcode before submitting the request.
- Short URL Redirection: Redirects users to the original long URL when visiting the shortened URL if it's valid and not expired.
- Statistics Display: Shows all created short URLs with details like shortened URL, original long URL, expiry time, total clicks, click timestamps, source, and mock geographical location.
- Session-Based State: Stores short URLs and associated statistics in session-based state for display on the statistics page.
- Error Handling: Displays user-friendly Material UI alerts for invalid input, duplicate shortcodes, and expired links.
- Logging Middleware: Logs API requests, API responses, and errors to a local JS object or array for debugging and monitoring.

## Style Guidelines:

- Primary color: A vibrant purple (#9C27B0) evokes innovation and trustworthiness.
- Background color: A light purple (#F3E5F5) to create a calm and clean background.
- Accent color: A bright pink (#E91E63) is used for emphasis and calls to action.
- Body and headline font: 'Inter', a sans-serif font for a modern and readable interface.
- Use clean, minimalist icons from Material UI's icon set.
- Employ a responsive, grid-based layout with Material UI Grid to adapt to different screen sizes.
- Subtle fade-in animations on content load to enhance user experience.