// Vercel Web Analytics initialization
import { inject } from './node_modules/@vercel/analytics/dist/index.mjs';

// Inject the analytics script into the page
inject({
  mode: 'auto', // Automatically detects development vs production
  debug: false  // Set to true to see analytics events in console during development
});
