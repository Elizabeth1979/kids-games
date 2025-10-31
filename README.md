# Kids Games

An educational games platform for children, featuring interactive learning games for letters, numbers, and more.

## Features

- **Multilingual Support**: Hebrew, English, Russian, and Arabic
- **Multiple Games**:
  - Letter learning games (Hebrew, English, Russian, Arabic)
  - Tic-Tac-Toe with AI opponent
  - Free drawing canvas
  - Coming soon: Math games, memory games, and more
- **Learning Modes**: Learn, Find, and Shuffle modes for educational games
- **Dark/Light Theme**: Eye-friendly mode switching
- **Mobile Friendly**: Works on tablets and smartphones
- **Text-to-Speech**: Hear letter pronunciations in multiple languages
- **Progressive Web App**: Can be installed on devices for offline use

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl
- **PWA Support**: next-pwa for progressive web app capabilities
- **Testing**: Vitest + Playwright
- **UI Components**: Radix UI + shadcn/ui

## For Developers

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Documentation

For detailed development instructions, see:
- **[PROJECT_GUIDELINES.md](PROJECT_GUIDELINES.md)** - Development workflow, how to run the server, and coding guidelines
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - Detailed guide for understanding the development environment
- **[HOW_IT_WORKS.md](HOW_IT_WORKS.md)** - Simple explanation of how the development server works

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code for errors |
| `npm test` | Run tests |
| `npm run fresh` | Clear cache and restart dev server |

## Deployment

This project is designed to be deployed on [Vercel](https://vercel.com). See [PROJECT_GUIDELINES.md](PROJECT_GUIDELINES.md) for deployment instructions.

## License

This project is for educational purposes.

## Learn More

To learn more about the technologies used:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
