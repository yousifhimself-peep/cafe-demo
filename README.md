# Café ordering app — unbranded demo

Clickable design preview of a café ordering app with **no café name or logo**, ready to show a new client.
React + Vite + Tailwind CSS. Local data and local state only; orders and payments are simulated.

## Live demo

https://yousifhimself-peep.github.io/cafe-demo/ (staff portal: `/cafe-demo/admin/`)

To publish changes: `npm run deploy` (builds with the `/cafe-demo/` base and force-pushes `dist/` to the `gh-pages` branch).

## Run

```bash
npm install
npm run dev        # http://localhost:5179  (also on your Wi-Fi IP, port 5179, for a phone)
```

| App | URL | Code |
|---|---|---|
| Customer ordering app | `/` | `src/` (screens, components) |
| **Admin / Staff Portal** | `/admin/` | `src/admin/` |

The two are separate pages — the customer app never links to the portal.
On a laptop the customer app appears inside a phone frame, with presenter controls beside it.

### Admin / Staff Portal

Demo sign-in (no passwords): **Staff / Barista** or **Admin / Manager**.

- **Live orders** (staff + admin): New → Preparing → Ready → Completed, reject, filter by pickup / curbside / delivery.
- **Menu & stock** (staff + admin): mark items sold out.
- **Overview** (admin): last-24-hour orders, revenue, average order, orders by hour, top items.
- **Store settings** (admin): pause online ordering, set "how busy" pickup estimate, reset demo data.

Both apps share the browser's localStorage (`src/shared/storage.js`), so with the two open in the same browser:
an order placed in the app appears on the staff board instantly, and staff actions (accept, ready, sold out,
pause) show up in the customer app live. Sample orders on the board are labelled "Sample".
A real build would replace localStorage with a backend and staff accounts.

## Placeholders to swap for the client

| Where | What |
|---|---|
| `src/components/ui.jsx` → `Wordmark` | Generic cup + "CAFÉ" mark, used in the app and portal. Replace with the client's logo |
| `src/data/menu.js` → `cafe` | Name, address, city, phone, Instagram, hours (all placeholders) |
| `src/data/menu.js` → `menu` | Sample menu and prices. Items without a photo show a styled tile |
| `public/assets/menu/` | Free-licence Unsplash stock photos: one per item (`<id>.jpg`), plus category tiles and the home banner (`_*.jpg`). `thumbs/` holds 360px copies used in lists — regenerate them if you swap a photo |
| `src/data/menu.js` → `details` | Sample descriptions, calories and allergens per item |
| `src/data/menu.js` → `sampleOptions` | Sample milk / ice / extra shot, sandwich add-ons (max 3) and "Without" removals |
| `src/styles.css` → `@theme` | Colour palette |
