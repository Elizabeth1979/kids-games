# Development Guide

## How to Run the Server Locally

### Quick Start (Every Time You Open This Project)

1. Open your terminal
2. Navigate to this folder:
   ```bash
   cd "/Users/elizabethp/Desktop/elli-projects/kids games"
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to: **http://localhost:3000**

That's it! The server will automatically reload when you save changes to your files.

---

## What's Happening?

### The Technology Stack
- **Next.js**: A React framework that runs your website
- **Development Server**: A local web server that runs on your computer
- **Port 3000**: The "address" where your app runs locally (like a door number)

### The Process

```
You run: npm run dev
    ↓
Next.js starts a server on port 3000
    ↓
You visit: http://localhost:3000 in your browser
    ↓
You see your app!
    ↓
You edit files → They auto-refresh in the browser
```

---

## Common Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start development server (use this while coding) |
| `npm run build` | Build the app for production (creates optimized version) |
| `npm start` | Run the production build locally |
| `npm run lint` | Check code for errors |
| `npm test` | Run tests |

---

## Troubleshooting

### Port Already in Use?
If you see "port 3000 is already in use":

1. **Option A**: Kill the existing process:
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. **Option B**: Use a different port:
   ```bash
   npm run dev -- -p 3001
   ```

### Changes Not Showing?
1. Hard refresh your browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
2. Restart the dev server: Press `Ctrl + C` in terminal, then run `npm run dev` again

### Server Crashed?
Just run `npm run dev` again - it happens sometimes!

---

## Making This Easier

### Visual Studio Code (Recommended)
If you use VS Code, you can:

1. Open the integrated terminal: `` Ctrl + ` ``
2. The terminal already starts in your project folder
3. Just type `npm run dev`

### Terminal Shortcut
You can create an alias in your terminal. Add this to your `~/.zshrc` or `~/.bash_profile`:

```bash
alias kids-games='cd "/Users/elizabethp/Desktop/elli-projects/kids games" && npm run dev'
```

Then you can just type `kids-games` from anywhere to start your server!

---

## What You Should Know

1. **The server only runs while the terminal window is open**
   - Close the terminal = server stops
   - Keep the terminal running while you work

2. **localhost:3000 only works on YOUR computer**
   - Other people can't access it
   - To share, you need to deploy (see DEPLOYMENT.md)

3. **Always run from the project root folder**
   - The folder with `package.json`
   - If you're in the wrong folder, it won't work

---

## Files You Shouldn't Change

- `node_modules/` - Installed dependencies
- `.next/` - Build output
- `package-lock.json` - Dependency lock file (only edit `package.json`)

---

## Next Steps

- Want to deploy? See `PROJECT_GUIDELINES.md`
- Want to add features? See `MIGRATION_REQUIREMENTS.md`
- Need help? Check `README.md`
