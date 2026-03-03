const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to (or create) the SQLite database file
const db = new sqlite3.Database("./lostfound.db", (err) => {
  if (err) console.error("DB error:", err.message);
  else console.log("Connected to SQLite (lostfound.db)");
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'FOUND',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// Health check
app.get("/", (req, res) => {
  res.send("Lost & Found API is running");
});

// Get all items
app.get("/items", (req, res) => {
  db.all("SELECT * FROM items ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a found item
app.post("/items", (req, res) => {
  const { title, description } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: "title is required" });
  }

  db.run(
    "INSERT INTO items (title, description) VALUES (?, ?)",
    [title.trim(), description || null],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        id: this.lastID,
        title: title.trim(),
        description: description || null,
        status: "FOUND",
      });
    }
  );
});

//Update item status (FOUND -> CLAIMED, etc.)
app.patch("/items/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowed = new Set(["FOUND", "CLAIMED", "RETURNED"]);
  if (!allowed.has(status)) {
    return res.status(400).json({ error: "status must be FOUND, CLAIMED, or RETURNED" });
  }

  db.run(
    "UPDATE items SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "item not found" });
      res.json({ ok: true });
    }
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});