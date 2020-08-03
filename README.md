![LOGO](/client/public/logo.PNG)
# emailyy
Send bulk emails to your recipients using a simple interface

# Tools Used
* Google OAuth 2.0
* MongoDB
* Stripe Payments
* SendGrid Email Provider

# Instruction For Use
1. Look up `/config/prod.js` to figure out what Api keys you need.
2. Sign Up and create a project for each service.
3. Create a file `/config/dev.js` for your development environment and export the same object (as in prod.js) by replacing `process.env.*` by API Keys of the corresponding services.
4. After doing so, run command `npm install` first in root directory then in `client` directory.
5. Finally run command `npm run dev` in root directory to run front-end on `localhost:3000` and back-end on `localhost:5000` concurrently.
