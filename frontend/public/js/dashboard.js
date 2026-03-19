// ============================================================
// employee-dashboard.js
// Reads lost item requests from localStorage.
// No backend required.
// ============================================================

let allRequests = [];

// ── Load requests on page load ──
function loadRequests() {
  allRequests = JSON.parse(localStorage.getItem("lostRequests") || "[]");
  renderRequests();
}

// ── Save status changes back to localStorage ──
function saveLocally() {
  localStorage.setItem("lostRequests", JSON.stringify(allRequests));
}

// ── Render the table ──
function renderRequests() {
  const search  = document.getElementById("searchInput").value.toLowerCase();
  const statusF = document.getElementById("statusFilter").value;
  const tbody   = document.getElementById("requestsBody");

  const filtered = allRequests.filter(r => {
    const matchSearch = !search ||
      r.name?.toLowerCase().includes(search) ||
      r.itemName?.toLowerCase().includes(search) ||
      r.email?.toLowerCase().includes(search);
    const matchStatus = !statusF || r.status === statusF;
    return matchSearch && matchStatus;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = "<tr><td colspan='11'>No requests found.</td></tr>";
    return;
  }

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td>${r.name}</td>
      <td>${r.email}</td>
      <td>${r.phone || "—"}</td>
      <td>${r.itemName}</td>
      <td>${r.category || "—"}</td>
      <td>${r.description}</td>
      <td>${formatDate(r.dateLost)}</td>
      <td>${r.locationLost || "—"}</td>
      <td>${r.notify || "—"}</td>
      <td>${r.status}</td>
      <td>
        ${r.status === "new"     ? `<button onclick="updateStatus(${r.id}, 'matched')">Mark Matched</button>` : ""}
        ${r.status === "matched" ? `<button onclick="updateStatus(${r.id}, 'notified')">Mark Notified</button>` : ""}
        ${r.status !== "closed"  ? `<button onclick="updateStatus(${r.id}, 'closed')">Close</button>` : ""}
      </td>
    </tr>
  `).join("");
}

// ── Update a request's status ──
function updateStatus(id, newStatus) {
  const req = allRequests.find(r => r.id === id);
  if (!req) return;
  req.status = newStatus;
  saveLocally();
  renderRequests();
}

// ── Clear all requests ──
function clearAll() {
  if (!confirm("Clear all requests? This cannot be undone.")) return;
  localStorage.removeItem("lostRequests");
  allRequests = [];
  renderRequests();
}

// ── Helpers ──
function formatDate(str) {
  if (!str) return "—";
  const d = new Date(str);
  return isNaN(d) ? str : d.toLocaleDateString();
}

// ── Init ──
loadRequests();