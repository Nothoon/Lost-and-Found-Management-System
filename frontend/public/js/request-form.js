// ============================================================
// request-form.js
// Saves lost item form submissions to localStorage.
// No backend required.
// ============================================================

document.getElementById("lostItemForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    id:           Date.now(),
    name:         document.getElementById("name").value.trim(),
    email:        document.getElementById("email").value.trim(),
    phone:        document.getElementById("phone").value.trim(),
    notify:       document.querySelector('input[name="notifyEmail"]:checked')?.value || "none",
    itemName:     document.getElementById("itemName").value.trim(),
    category:     document.getElementById("category").value,
    description:  document.getElementById("description").value.trim(),
    dateLost:     document.getElementById("dateLost").value,
    locationLost: document.getElementById("locationLost").value.trim(),
    status:       "new",
    submittedAt:  new Date().toISOString(),
  };

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem("lostRequests") || "[]");
  existing.unshift(formData);
  localStorage.setItem("lostRequests", JSON.stringify(existing));

  document.getElementById("formMessage").textContent = "Your report has been submitted! We will notify you if your item is found.";
  document.getElementById("lostItemForm").reset();
});