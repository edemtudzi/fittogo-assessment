# FitTogo — Fitness Assessment Website

A responsive, static website that creates personalized starter nutrition and workout recommendations from a user's answers. It uses locally familiar Togolese / West African foods and runs entirely in the browser.

## Deploy to Vercel

1. Create a GitHub repository, for example `fittogo-assessment`.
2. Upload `index.html`, `styles.css`, and `app.js` to the repository root.
3. Sign in to https://vercel.com with GitHub.
4. Choose **Add New → Project**, import the repository.
5. Framework Preset: **Other**. Build Command: leave blank. Output Directory: `.` (or leave the default if Vercel detects the static site).
6. Click **Deploy**. Vercel will provide a public `*.vercel.app` URL.
7. Open the URL on a phone and test the form, results, edit button and Print / Save as PDF.
8. Share the public URL.

## Important limitations

- This is a static starter version. It does not send results by email, save submissions, create user accounts, or use an AI API.
- Assessment answers are processed in the visitor's browser and are not sent to a server.
- Calorie and macro numbers are estimates, not medical advice. The user should monitor results and adjust with a qualified professional where appropriate.
- The meal suggestions are templates. They do not guarantee a precise protein total or account for allergies unless the user follows the restrictions selected.
- Before public promotion, have a qualified fitness or nutrition professional review the recommendations and safety language.

## Files

- `index.html` — form and results layout
- `styles.css` — responsive styling and print stylesheet
- `app.js` — recommendation logic
