const form = document.getElementById("itemForm");
const itemsList = document.getElementById("itemsList");

async function loadItems() {
  const res = await fetch("http://localhost:3001/items");
  const items = await res.json();

  itemsList.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = `${item.title} - ${item.description || ""} (${item.status})`;
    itemsList.appendChild(li);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  await fetch("http://localhost:3001/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  form.reset();
  loadItems();
});

loadItems();