# Lastasa

**Lastasa** is a modern frontend web application built using **React** and **Vite**. It serves as the user interface for the IntentSearch AI backend, providing a fast, responsive, and interactive experience for end users in an e-commerce setting.

## ✨ Features

- ⚛️ **React with Vite** – Lightning-fast development and build times.
- 🎨 **Reusable Components** – Organized, scalable architecture using modular React components.
- 🌐 **API Integration Ready** – Designed to work seamlessly with AI services like [IntentSearch](https://github.com/AkashKoley012/IntentSearch).
- 📦 **ESLint & Code Formatting** – Maintains code quality and consistency.
- 🚀 **Production Optimized** – Fast load times and great performance out of the box.

## 🧠 Backend AI

This front end interfaces with the AI-powered [IntentSearch](https://github.com/AkashKoley012/IntentSearch) engine that handles:

- Multimodal input (text, image, voice)
- Query intent detection
- Structured search output

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/arindammannawork/lastasa.git
cd lastasa
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```
Visit http://localhost:5173 in your browser.

## 🧾 Project Structure

```bash
lastasa/
├── public/             # Static assets
├── src/
│   ├── assets/         # Images and icons
│   ├── components/     # Reusable React components
│   ├── App.jsx         # Main App component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Scripts and dependencies
├── vite.config.js      # Vite configuration
└── .eslintrc.js        # ESLint rules
```

## 📜 Available Scripts

| Command           | Description                   |
|:---:|:---:|
| `npm run dev`    | Start the development server  |
| `npm run build`  | Build for production          |
| `npm run preview`| Preview the production build  |
| `npm run lint`   | Run ESLint for code analysis  |

## 🚀 Deployment

This app can be easily deployed to the following platforms:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- Or any static hosting provider

Simply build the app using the production command and upload the contents of the `dist/` folder.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

