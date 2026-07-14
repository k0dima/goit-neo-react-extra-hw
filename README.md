# Phonebook

A React JSX phonebook for the GoIT homework. It supports registration, login, persisted sessions, contact creation/deletion, and filtering. Forms use React Hook Form with validation.

## Run locally

```bash
npm install
npm run dev
```

## Checks

```bash
npm run build
```

## Architecture

- `src/api` owns the Axios instance and bearer-header helpers.
- `src/redux` owns all server requests through Redux Toolkit thunks. Only `auth.token` is persisted.
- `src/components` holds small UI components; `Contact` receives props and has no Redux knowledge.
- `src/pages` composes features and routes.

The app uses the GoIT Contacts API at `https://connections-api.goit.global`.
