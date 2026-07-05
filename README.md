# Ionic / Angular Learning Project

This repository contains learning projects and exercises for Ionic and Angular.

The goal of this repo is to keep small course examples, experiments, and practice applications in one place, so they can be versioned with Git and reused later as reference material.

## Project Structure

```text
.
└── ng-01-creating-our-first-component
    ├── angular.json
    ├── package.json
    ├── src
    └── README.md
```

## Projects

### `ng-01-creating-our-first-component`

First Angular course project focused on creating and using Angular components.

Main files:

```text
src/app/app.component.ts
src/app/app.component.html
src/app/app.module.ts
src/app/persons/persons.component.ts
src/app/persons/persons.component.html
```

## Getting Started

Go into the project folder:

```bash
cd ng-01-creating-our-first-component
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

or, if Angular CLI is available:

```bash
ng serve
```

Then open the app in the browser:

```text
http://localhost:4200
```

## Useful Commands

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm start
```

Build the project:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Notes

This is a learning repository, so older course projects may use older Angular tooling, for example Protractor or TSLint.

For new production Ionic / Angular projects, newer tools are usually preferred, such as:

* ESLint instead of TSLint
* Playwright or Cypress instead of Protractor
* Modern Angular CLI project structure
* Ionic Capacitor for mobile builds

## Git Rules

Commit source code, configuration files, and lock files.

Do not commit:

* `node_modules`
* build output such as `dist` or `www`
* generated mobile folders such as `android`, `ios`, `platforms`, or `plugins`
* local `.env` files
* IDE/cache/system files

## Repository Purpose

This repository is mainly for:

* learning Angular basics
* learning Ionic app structure
* testing components
* keeping course exercises under version control
* experimenting before creating bigger production applications
