# 📘 TypeScript Learning Hub

An interactive, beautifully designed learning platform for JavaScript developers transitioning to TypeScript. Features **36 lessons** across 3 difficulty levels with **3 hands-on projects**.

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61dafb?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.0+-646cff?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0+-06b6d4?logo=tailwindcss&logoColor=white)

## ✨ Features

- 🎯 **3 Difficulty Levels**: Beginner → Intermediate → Advanced
- 📚 **36 Comprehensive Lessons**: From basic types to advanced generics
- 🛠️ **3 Hands-on Projects**: Typed To-Do List, API Client, Event Emitter
- 🌓 **Dark Mode**: Easy on the eyes for late-night learning
- 🔍 **Full-Text Search**: Find any topic instantly
- 📊 **Progress Tracking**: Mark lessons as complete (saved locally)
- 💻 **Syntax Highlighting**: Beautiful code blocks with copy-to-clipboard
- ⚡ **JS vs TS Comparisons**: See the difference side-by-side
- 📱 **Fully Responsive**: Works great on mobile, tablet, and desktop
- 🚀 **Fast & Lightweight**: Built with Vite for instant loading

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/typescript-learning-hub.git

# Navigate to the project
cd typescript-learning-hub

# Install dependencies
npm install
```

### Run Locally

```bash
# Start development server
npm run dev
```

Open your browser and visit: **http://localhost:5173**

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📖 Curriculum Overview

### 🟢 Level 1 — Beginner (12 lessons)

Perfect for JavaScript developers new to TypeScript.

1. **What is TypeScript?** — Setup, first file, compilation
2. **tsconfig & Strict Mode Basics** — Understand your compiler
3. **Basic Types** — string, number, boolean, void, any, unknown, never
4. **Type Annotations** — Variables, parameters, return types
5. **Arrays & Tuples** — Typed collections
6. **Union & Literal Types** — Combine and restrict types
7. **Type Aliases** — Custom type names
8. **Interfaces** — Object shapes, optional, readonly
9. **Enums vs Union Literals** — Modern alternatives to enums
10. **Functions** — Typed params, optional, defaults, callbacks
11. **Type Assertions** — `as` keyword, non-null assertion
12. 🛠️ **Project: Typed To-Do List** — Build a fully typed app

### 🟡 Level 2 — Intermediate (12 lessons)

Level up with generics, utility types, and real-world patterns.

1. **Generics** — Reusable, type-safe code
2. **Type Guards & Narrowing** — typeof, in, instanceof, predicates
3. **Discriminated Unions** — State machines, API responses, reducers
4. **keyof, typeof & Indexed Access** — Building blocks for advanced types
5. **Utility Types** — Partial, Required, Pick, Omit, Record
6. **Mapped Types** — Transform types programmatically
7. **Conditional Types** — T extends X ? A : B
8. **satisfies & as const** — Modern TypeScript essentials
9. **Type Inference** — How TS figures out types
10. **Classes & Access Modifiers** — public, private, protected
11. **Modules & Declaration Files** — .d.ts, @types, ambient declarations
12. 🛠️ **Project: Typed API Client** — Generic HTTP client with full type safety

### 🔴 Level 3 — Advanced (12 lessons)

Master advanced patterns, ecosystem tools, and real-world integration.

1. **Advanced Generic Patterns** — Covariance, contravariance, infer
2. **Template Literal Types** — String manipulation at type level
3. **Recursive Types** — Self-referencing type definitions
4. **Declaration Merging** — Module augmentation, interface merging
5. **Decorators** — Brief coverage for Angular/NestJS users
6. **Type Challenges** — Complex type puzzles
7. **tsconfig Deep Dive** — All flags, path aliases, project references
8. **Performance & Best Practices** — Avoid any, structural typing gotchas
9. **Ecosystem: Framework Integration** — React, Node.js, Express
10. **Ecosystem: Tooling** — ESLint, Prettier, Vitest, CI
11. **Migration Guide** — Move JS projects to TS incrementally
12. 🛠️ **Project: Type-Safe Event Emitter** — Fully typed event system

## 🏗️ Project Structure

```
typescript-learning-hub/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── CodeBlock.tsx       # Syntax-highlighted code
│   │   ├── ComparisonPanel.tsx # JS vs TS comparisons
│   │   ├── LessonView.tsx      # Lesson content renderer
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── data/            # Lesson content
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── level1.ts           # Beginner lessons
│   │   ├── level2.ts           # Intermediate lessons
│   │   └── level3.ts           # Advanced lessons
│   ├── App.tsx          # Main application
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── README.md            # This file
```

## 🎨 Tech Stack

- **[React 18](https://react.dev/)** — UI framework
- **[TypeScript](https://www.typescriptlang.org/)** — Type safety (meta!)
- **[Vite](https://vitejs.dev/)** — Lightning-fast build tool
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Utility-first styling
- **[Prism React Renderer](https://github.com/FormidableLabs/prism-react-renderer)** — Syntax highlighting

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint (if configured)
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments.

### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
netlify deploy --prod
```

### GitHub Pages

```bash
# Build the project
npm run build

# Deploy dist folder to gh-pages branch
npm run deploy  # (add a deploy script if needed)
```

### Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build and run
docker build -t ts-learning-hub .
docker run -p 8080:80 ts-learning-hub
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-lesson`)
3. **Add** your content to the appropriate level file in `src/data/`
4. **Commit** your changes (`git commit -m 'Add amazing lesson'`)
5. **Push** to the branch (`git push origin feature/amazing-lesson`)
6. **Open** a Pull Request

### Adding a New Lesson

1. Open the appropriate level file (`src/data/level1.ts`, `level2.ts`, or `level3.ts`)
2. Add a new lesson object following this structure:

```typescript
{
  id: 'your-lesson-id',
  title: 'Your Lesson Title',
  level: 1, // or 2, or 3
  order: 13, // next number in sequence
  description: 'Brief description of what this lesson covers',
  sections: [
    {
      heading: 'Section Title',
      content: 'Section content with **markdown** support',
      code: {
        code: `// Your code example here`,
        language: 'typescript',
        title: 'example.ts'
      }
    }
  ],
  comparisons: [
    {
      js: `// JavaScript version`,
      ts: `// TypeScript version`,
      explanation: 'Key insight about the difference'
    }
  ]
}
```

3. Test locally with `npm run dev`
4. Submit a PR!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the TypeScript community and official documentation
- Built with modern web technologies for the best learning experience
- Designed for JavaScript developers transitioning to TypeScript

## 📮 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/typescript-learning-hub/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YOUR_USERNAME/typescript-learning-hub/discussions)
- **Twitter**: [@YOUR_HANDLE](https://twitter.com/YOUR_HANDLE)

## 🌟 Show Your Support

If this project helped you learn TypeScript, consider giving it a ⭐ on GitHub!

---

**Happy Learning!** 🚀📘

Built with ❤️ for the TypeScript community
