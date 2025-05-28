# projet_ent
Bienvenue sur l’Espace Numérique de Travail de l’EST Salé.  Connectez-vous pour accéder à vos cours

# React/Vite TypeScript Project

## Project Setup

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org))
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
Navigate to project directory:

```bash
cd your-repo
Install dependencies:
```

```bash
npm install
```
Running the Development Server
```bash
npm run dev
```
Opens at: http://localhost:5173

Building for Production
```bash
npm run build
```
Generates production-ready files in /dist directory

Previewing Production Build
```bash
npm run preview
```
```
Project Structure
├── node_modules/     # Dependencies (auto-generated)
├── public/           # Static assets
├── src/              # Source files
│   ├── assets/       # Images/fonts
│   ├── components/   # React components
│   ├── styles/       # CSS/SCSS files
│   ├── App.tsx       # Main application
│   ├── main.tsx      # Entry point
│   └── vite-env.d.ts # TypeScript types
├── .gitignore
├── index.html        # Main HTML template
├── package.json
├── tsconfig.json     # TypeScript config
└── vite.config.ts    # Vite configuration
```
Environment Variables
Create .env file in root directory:

```env
VITE_API_KEY=your_api_key_here
VITE_API_URL=https://api.example.com
```
Access in code:

```ts
const apiKey = import.meta.env.VITE_API_KEY;
```
Troubleshooting
Dependency issues:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```
Port conflict: Update port in vite.config.ts:

```ts
export default defineConfig({
  server: { port: 3000 }  // Change to available port
})
```
TypeScript errors:

```bash
npm run build
```
Recommended VS Code Extensions
ESLint

Prettier

TypeScript Vue Plugin (Volar)


Key features of this README:
1. Clear installation and usage instructions
2. Environment variables setup guide
3. Visual project structure overview
4. Common troubleshooting solutions
5. Development workflow scripts
6. Clean markdown formatting for GitHub

Customize these sections as needed:
- Add your actual GitHub URL in the clone command
- Include project-specific dependencies in troubleshooting
- Add framework-specific notes (e.g., if using Redux, Tailwind, etc.)
- Update the project structure to match your actual folders

For best results:
1. Replace `your-username/your-repo` with your actual GitHub path
2. Add framework-specific notes if using additional libraries
3. Include any special build requirements
4. Add deployment instructions if applicable
