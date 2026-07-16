# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # ng serve — dev server at http://localhost:4200
npm run build      # ng build
npm test           # ng test (Karma + Jasmine)
npm run lint       # ng lint (tslint)
```

Run a single spec file:
```bash
npx ng test --include='src/app/auth/auth.guard.spec.ts'
```

> **Node version**: requires Node 14 (the project uses Angular 9 + webpack 4, which break on Node 17+ due to OpenSSL changes). `--openssl-legacy-provider` must NOT be in `package.json` scripts on Node 14 — it was removed in the last fix.

## Architecture

This is an **Ionic 5 / Angular 9** course project (Udemy). All app code lives in `src/app/`.

### Module / routing structure

```
AppRoutingModule          ← root
  /auth                   ← lazy: AuthPageModule
  /places  (AuthGuard)    ← lazy: PlacesPageModule
    /tabs/discover        ← lazy: DiscoverPageModule
      /:placeId           ← lazy: PlaceDetailPageModule
    /tabs/offers          ← lazy: OffersPageModule
      /new                ← lazy: NewOfferPageModule
      /edit/:placeId      ← lazy: EditOfferPageModule
      /:placeId           ← lazy: OfferBookingsPageModule
  /bookings (AuthGuard)   ← lazy: BookingsPageModule
```

`PlacesPage` is the tab shell (ion-tabs). Each tab section is a child route group under `/places/tabs`.

### Services (all `providedIn: 'root'`, in-memory state — no HTTP yet)

- **`AuthService`** — simple boolean flag; `login()` / `logout()` methods. `AuthGuard` implements `CanLoad` and redirects to `/auth` when not authenticated.
- **`PlacesService`** — holds a hard-coded `Place[]` array; exposes `places` getter (spread copy) and `getPlace(id)`.
- **`BookingsService`** — holds a hard-coded `Booking[]` array; exposes `bookings` getter.

### Key cross-feature interaction

`PlaceDetailPage` (discover tab) opens a `CreateBookingComponent` via `ModalController`. The modal is a standalone component declared in `BookingsModule` but imported into `PlaceDetailPageModule` directly. It receives `selectedPlace: Place` as an `@Input` via `componentProps` and dismisses with role `'confirm'` or `'cancel'`.

### Models

- `Place` — `id, title, description, imageUrl, price`
- `Booking` — `id, placeId, userId, placeTitle, guestNumber`

### Styling

Global design tokens and component overrides are in `src/theme/variables.scss`. Custom CSS variables are prefixed `--app-*` (e.g. `--app-primary`, `--app-radius`). The theme applies rounded corners and a floating tab bar globally — no per-component classes needed for standard Ionic components.
