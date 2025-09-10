
# BlogApp

BlogApp is a modern blogging platform built with React, Vite, Redux Toolkit, Appwrite, and Tailwind CSS. It features authentication, post creation/editing, and a protected route system.

## Features
- User authentication (signup, login, logout)
- Create, edit, and view blog posts
- Protected routes for authenticated users
- Rich text editing with TinyMCE
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- Bun or npm/yarn (for package management)

### Installation
Clone the repository and install dependencies:

```sh
git clone <repo-url>
cd BlogApp
bun install # or npm install or yarn install
```

### Running the App

```sh
bun run dev # or npm run dev or yarn dev
```
The app will be available at `http://localhost:5173` by default.

### Scripts
- `dev` - Start the development server
- `build` - Build for production
- `preview` - Preview the production build
- `lint` - Run ESLint

## Project Structure

- `src/` - Main source code
	- `components/` - Reusable UI components
	- `pages/` - Route-based pages
	- `store/` - Redux store and slices
	- `appwrite/` - Appwrite configuration and API
	- `conf/` - App configuration
	- `App.jsx` - Main app component
	- `main.jsx` - Entry point

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
