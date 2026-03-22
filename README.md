### Ngx-Admin Angular 14 application from akveo.com

This is modified and more lightweight version of original application to practice UI Automation with Playwright.

The original repo is here: https://github.com/akveo/ngx-admin

## Prerequisites
- Node.js (version 14 or later)
- npm

## Installation and Setup

1. Clone the repository and navigate to the project directory.

2. Install dependencies:
   ```
   npm install --legacy-peer-deps
   ```
   **Note:** Use `--legacy-peer-deps` to resolve version conflicts (e.g., Angular CDK and deprecated tools like codelyzer/tslint).

3. If webpack is missing (may occur due to dependency issues), install it separately:
   ```
   npm install webpack --save-dev --legacy-peer-deps
   ```

4. Install Playwright browsers for cross-browser testing:
   ```
   npx playwright install
   ```
   This installs Chromium, Firefox, WebKit, and branded browsers (Edge, Chrome).

5. Start the Angular development server:
   ```
   npm start
   ```
   The app will compile and be available at `http://localhost:4200`.

5. Run Playwright tests for UI automation:
   ```
   npx playwright test
   ```

## Notes
- The project uses Angular 14 with Nebular UI components.
- Playwright is configured for cross-browser testing on Chromium, Firefox, WebKit, Microsoft Edge, and Google Chrome.
- If you encounter build errors, ensure all dependencies are installed with the flags above.