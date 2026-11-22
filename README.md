# FitTogo — African Fitness Assessment Website

A responsive, bilingual (English/French), static website that creates personalized starter nutrition and workout recommendations from a user's answers. The food examples draw from a range of African cuisines rather than focusing on one country.

## Deploy to Vercel

The project is connected to Vercel. Commits to the production branch should trigger a new deployment automatically.

## Important limitations

- This is a static starter version. It does not send results by email, save submissions, create user accounts, or use an AI API.
- Assessment answers are processed in the visitor's browser and are not sent to a server.
- Calorie and macro numbers are estimates, not medical advice. The user should monitor results and adjust with a qualified professional where appropriate.
- Meal suggestions are examples drawn from different African food traditions. They are not yet dynamically localized to each selected country and do not guarantee a precise protein total.
- Before public promotion, have a qualified fitness or nutrition professional review the recommendations and safety language.

## Files

- `index.html` — form and results layout
- `styles.css` — responsive styling and print stylesheet
- `app.js` — recommendation logic and English/French interface translations
