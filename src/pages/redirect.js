document.getElementById("roleForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const selectedRole = document.getElementById("role").value;
    localStorage.setItem("userRole", selectedRole);

    if (selectedRole === "user") {
      window.location.href = "/user-dashboard.html";
    } else if (selectedRole === "admin") {
      window.location.href = "/admin-dashboard.html";
    }
  });