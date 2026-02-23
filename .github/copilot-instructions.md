# GitHub Copilot / AI Agent Instructions

Purpose
- Help an AI coding agent become productive quickly in this repository: a small Lost-and-Found prototype.

Big picture (what this repo is trying to do)
- The README describes a product backlog: a database of lost-item photos, an input UI, employee login, and reporting. See [README.md](README.md#L1-L50).
- Current code is a single-file Tkinter prototype in [main.py](main.py#L1-L200). The repo is an early prototype, not a finished app.

Key files
- [main.py](main.py#L1-L200): prototype GUI and entry point. Contains UI widgets, callback wiring (e.g. `on_button_click()` wired to `tk.Button(..., command=on_button_click)`) and several incomplete / broken sections to fix first.
- [README.md](README.md#L1-L50): product backlog / intended features — use as source of truth for scope.

Discoverable patterns & conventions
- Single-file prototype: expect work to start by refactoring `main.py` into modules (recommended split: `ui/`, `models/`, `storage/`). Document any new module paths in the README.
- UI pattern: uses `tkinter` mainloop; callbacks are registered with `command=`. Keep UI callbacks thin: delegate logic to model/storage layers.
- No dependency manifest yet (no `requirements.txt` or `pyproject.toml`). When adding external packages, add `requirements.txt` and update README run instructions.

Running & debugging
- To run the prototype locally (Windows PowerShell):

```powershell
python main.py
```

- Note: `main.py` currently contains syntax errors and placeholder imports (for example `import math.py`, incomplete `item` class, and an unfinished `itemIsFound` function). Fix those before attempting to run.

Project-specific TODOs (good first tasks for an AI agent)
- Fix top-level syntax errors in [main.py](main.py#L1-L200): remove or correct invalid imports, implement the `item` class, and complete `itemIsFound` logic.
- Replace prototype UI code with a minimal MVC split: move model classes to `models/`, storage to `storage/`, and keep GUI code in `ui/`.
- Add a simple JSON or SQLite-backed storage under `storage/` and wire a basic create/read flow for items; persist photo paths (README requires photo storage).

Integration points & assumptions
- No external services are currently integrated. The README implies image storage and user authentication will be required — these are not yet implemented.
- Assume local file storage for photos until a design decision (S3, DB blob) is introduced.

When updating this file
- If this file already exists, merge preserving any existing agent-specific guidance and keep examples pointing to [main.py](main.py#L1-L200) and [README.md](README.md#L1-L50).

Questions for maintainers
- Preferred storage backend (JSON file vs SQLite vs external)?
- Intended authentication approach (simple employee password, OAuth, or external identity provider)?

If anything in this document is unclear or missing, tell me which area (architecture, run steps, example tasks) to expand and I will iterate.
