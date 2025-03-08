# e42sto®e 💻

e42store is a modern e-commerce web application providing seamless shopping experiences,
featuring user authentication, payment processing, real-time data visualization, and a robust backend.
The project utilizes cutting-edge technologies such as React, Vite, Express,
and Stripe for efficient performance and scalability.

![Описание картинки](doc/Doc.png)

<img src="doc/Login.png" alt="Скриншот приложения" width="280"> <img src="doc/Filter.png" alt="Скриншот приложения" width="280"> <img src="doc/Pay.png" alt="Скриншот приложения" width="246">

---

## 🚀 Latest Updates & Enhancements

- **Added Helmet.js for improved security by setting Content Security Policy (CSP)** and other security headers.
- **Migrated from Create React App (CRA) to Vite** for faster build times and optimized performance.
- **Improved ESM (ECMAScript Modules) support** in the backend for compatibility with modern Node.js environments.
- **Fixed deprecated Sass functions** (`nth()` replaced with `list.nth()`).
- **Updated environment variable handling** (`import.meta.env` → `process.env`) for better security and compatibility.
- **Enhanced Stripe API integration**, explicitly defining API version (`2023-10-16`).
- **Enabled automatic browser opening in macOS** when running `npm run dev`.
- **Refactored backend code** for improved efficiency and maintainability.

---

## 📌 Table of Contents

1. [Project Structure](#project-structure)
2. [Dependencies](#dependencies)
3. [Scripts](#scripts)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [Development](#development)
7. [Build](#build)
8. [Testing](#testing)
9. [Contributing](#contributing)
10. [License](#license)

---

## 🌿 Project Structure

### `public/`

Contains static assets such as images, icons, and the main HTML file.

### `src/`

Contains the frontend application, including:

- **Components**: Reusable React UI components.
- **Redux**: State management logic.
- **Pages**: Full-page components for different routes.
- **Styles**: Global and modular SCSS stylesheets.
- **Hooks**: Custom React hooks for better code reuse.

### `server.js`

Node.js/Express backend handling API requests, payment processing, and middleware.

### `package.json`

Manages dependencies, scripts, and project metadata.

---

---

## 📦 Dependencies

### Frontend Dependencies

- **React** - JavaScript library for building UI components.
- **React-DOM** - Serves as the entry point for rendering React components into the DOM.
- **React-Redux** - Official bindings for Redux in React applications.
- **React-Router-DOM** - Declarative routing for React applications.
- **Chart.js** - Simple yet flexible JavaScript charting library.
- **React-Chartjs-2** - React wrapper for Chart.js.
- **Swiper** - Modern mobile touch slider.
- **React-Icons** - Include popular icons in React projects easily.
- **React-Toastify** - Beautiful notifications for React applications.
- **Firebase** - Platform for real-time data and authentication.
- **Stripe** - Payment processing service.
- **@stripe/react-stripe-js** - React components for Stripe.js.
- **@stripe/stripe-js** - Stripe.js JavaScript SDK.
- **Sass** - CSS extension language for styling.
- **classnames** - Utility for conditionally joining classNames in React components.
- **dotenv** - Module to load environment variables from a `.env` file.

### Backend

- **Express**, **Cors**, **Dotenv**, **Stripe** (`apiVersion: '2023-10-16'`)

### Development Tools

- **Vite** (replaces CRA for better performance)
- **Nodemon**, **Typescript**, **ESLint**, **Prettier**

---

## 📜 Scripts

- **`npm run dev`** - Starts the frontend (automatically opens in Chrome on macOS).
- **`npm run build`** - Builds the frontend for production.
- **`npm run start:backend`** - Runs the Express server with nodemon.
- **`npm run lint`** - Runs ESLint for code quality checks.

---

## Configuration

### Environment Variables

> The project uses environment variables for configuration. Create a `.env` file in the root of your project with the
> following variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

STRIPE_SECRET_KEY=your_stripe_secret_key

VITE_STRIPE_PK=your_stripe_public_key
VITE_ADMIN_USER=your_admin_email
VITE_FB_API_KEY=your_firebase_api_key
VITE_EMAIL_JS_SERVICE_ID=your_emailjs_service_id
VITE_EMAIL_JS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAIL_JS_PUBLIC_KEY=your_emailjs_public_key

NODE_ENV=development
PORT=4242
```

---

## 🛠️ Usage

To run the project locally:

```bash
git clone https://github.com/yourusername/e42store.git
cd e42store
npm install
npm run dev
```

## Contributing

Contributions are welcome! Please read the contributing guidelines before getting started.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

This README provides a comprehensive overview of the e42store project, including its structure,
dependencies, scripts, and more.