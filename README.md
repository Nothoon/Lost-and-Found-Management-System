# Lost & Found Management System

Lightweight prototype meant for the tracking, matching, and archiving of lost items, tailor-made for universities. Contains a minimal browser-based frontend with lost-item requests, employee upload forms, and a dashboard for employee review of lost items and lost item retrieval requests. Uses localStorage for persistence and can currently be run without a backend. 

Status: Prototype. Not production-ready.

---

## Key features

- Submit lost-item requests (student-facing form)
- Employee browser upload for found items
- Lost-item browsing page with search and filters
- Employee dashboard with split view: student requests (left) and uploaded/API-found items (right)
- Images are hidden by default behind "Expand Image" buttons
- LocalStorage-backed persistence for quick prototyping

---

## Quick demo / Try it locally

1. From the project root, run a simple static server (Python):

```bash
python3 -m http.server 8000
```

2. Open these pages in your browser:

- Student request form: http://localhost:8000/frontend/public/pages/lost-item-request-form.html
- Employee upload: http://localhost:8000/frontend/public/pages/browser-upload.html
- Found items browser: http://localhost:8000/frontend/public/pages/lost-item-browser.html
- Employee dashboard: http://localhost:8000/frontend/public/pages/employee-dashboard.html

3. Try these flows:

- Submit a lost-item request (saves to localStorage key `lostRequests`).
- Upload a found item from the employee upload page (saves to localStorage key `foundItems`).
- Open the browser page, it will fetch API items (if available) and persist them under `apiFoundItems` to avoid overwriting employee uploads.
- Visit the employee dashboard to see student requests on the left and employee/API items on the right.

---

## Project layout

```
frontend/public/
  pages/
    lost-item-request-form.html   # student-facing request form
    browser-upload.html          # employee upload form (saves to foundItems)
    lost-item-browser.html       # browser of found items (fetches /api/found-items)
    employee-dashboard.html      # employee dashboard (split view)
  js/ (some pages reference inline scripts)
  css/
README.md
```

---

## Data storage (prototype details)

This prototype stores data in browser localStorage. Keys and shapes used by the frontend:

- `lostRequests` - array of student-submitted requests. Example item:

```json
{
  "id": 1616161616161,
  "name": "Jane Doe",
  "email": "jane@example.edu",
  "phone": "(555) 000-0000",
  "notify": "email",
  "itemName": "Black Backpack",
  "category": "bags",
  "description": "North Face, sticker on front",
  "dateLost": "2026-03-15",
  "locationLost": "Library",
  "status": "new"
}
```

- `foundItems` - array of employee-uploaded found items (created by `browser-upload.html`). Example:

```json
{
  "id": 1616161617000,
  "itemName": "Black Water Bottle",
  "category": "other",
  "description": "Matte black metal bottle",
  "dateLost": "2026-03-15",
  "locationLost": "Student Union",
  "image_url": "",
  "status": "FOUND"
}
```

- `apiFoundItems`, when `lost-item-browser.html` fetches `/api/found-items`, it persists the returned list here (separate key to avoid overwriting `foundItems`). On this prototype, `/api/found-items` is a placeholder endpoint; without a backend, the page will use a fallback item.

Notes:

- Because storage is client-side, data is scoped to the browser and machine. This is intentional for the prototype and meant to be replaced by a backend service in a follow-up.

---

## API behavior 

The frontend references a minimal API path for future integration. The expected behavior:

- GET /api/found-items
  - Response: 200 OK with JSON array of found-item objects matching the `foundItems` shape above.

---

## Potential Improvements

- Replace localStorage with a backend service (Node/Express, Flask, etc.) and a small database (SQLite for prototyping, Postgres for production).
- Add secure file storage for images (S3 or similar) and store stable image URLs in the item records.
- Add authentication & authorization for employees (simple session + password or OAuth provider).
- Add server-side validation and tests (unit + integration) for endpoints.
- Improve UI/UX: responsive layout, consistent styling, and accessibility checks.
