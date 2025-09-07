# 52Apps Hub

Central hub for 52 weekly app releases. Features a command center for daily rituals, progressive app unlocking, and themed design (Cats → Space → Data).

## Setup

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run development server:
\`\`\`bash
npm run dev
\`\`\`

3. Build for production:
\`\`\`bash
npm run build
\`\`\`

## Deploy to GitHub Pages

1. Build and deploy:
\`\`\`bash
npm run deploy
\`\`\`

2. In your GitHub repo settings:
   - Go to Settings → Pages
   - Set source to "Deploy from a branch"
   - Choose "gh-pages" branch
   - Save

Your site will be live at: https://yourusername.github.io/C-52/

## Adding New Apps

Edit the `generateApps()` function in `src/App.jsx` to add your weekly apps.

## Features

- ✨ Progressive weekly app unlocking
- 🎨 Three-theme gradient design
- 🚀 Command Center with daily rituals
- 📧 Subscription system
- 📱 Fully responsive
- ⚡ Fast Vite build system
