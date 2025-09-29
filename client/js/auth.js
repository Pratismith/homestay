// Backend base URL
const API_URL = "/api/auth";

// ---------- Register ----------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("✅ Registered successfully!");
        if (data.user.role === 'owner') {
          window.location.href = "owner-dashboard.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        alert("❌ " + (data.msg || data.message));
      }
    } catch (err) {
      console.error(err);
      alert("Error registering");
    }
  });
}

// ---------- Login ----------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("✅ Login successful!");
        if (data.user.role === 'owner') {
          window.location.href = "owner-dashboard.html";
        } else {
          window.location.href = "index.html";
        }
      } else {
        alert("❌ " + (data.msg || data.message));
      }
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  });
}
