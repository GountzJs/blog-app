# Gemini Code Assistant Context

This document provides context for the Gemini code assistant to understand the project structure, conventions, and commands.

## Project Overview

This is an Angular project generated with Angular CLI. It uses TypeScript and the Vitest framework for unit testing. The project is set up with basic Angular dependencies and includes Tailwind CSS for styling.

The main application component is `App` (`src/app/app.ts`), which uses `RouterOutlet` to render content based on the defined routes. Currently, no routes are defined.

## Building and Running

### Development Server

To start a local development server, run:

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Building

To build the project, run:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

### Running Unit Tests

To execute the unit tests via [Vitest](https://vitest.dev/), run:

```bash
ng test
```

## Development Conventions

*   **Styling**: The project uses Tailwind CSS. Utility classes should be used for styling.
*   **Testing**: Unit tests are written with Vitest. Test files are located alongside the source files they test and have the `.spec.ts` extension.
*   **Code Formatting**: The project uses Prettier for code formatting. You can run `npx prettier --write .` to format the code.
*   **Package Manager**: I prefer to use `bun` instead of `npm`.
