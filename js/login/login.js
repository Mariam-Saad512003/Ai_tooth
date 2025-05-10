document.addEventListener('DOMContentLoaded', () => {
  const authService = new AuthService('http://aidentify-gradutionff.runasp.net/api');
  const form = document.querySelector('.form.login form');

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userName = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    const payload = {
      userName: userName,
      password: password
    };

    try {
      const response = await fetch('http://aidentify-gradutionff.runasp.net/api/Account/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert("Login failed: " + errorText);
        return;
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem('authToken', token);

      alert("Login successful!");
      window.location.href = 'Admin/index_admin.html';
    } catch (error) {
      console.error('Error:', error);
      alert("Something went wrong. Please try again.");
    }
  });

  // Toggle password visibility
  const pwShowHide = document.querySelectorAll(".eye-icon");
  pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
      let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
      pwFields.forEach(password => {
        if (password.type === "password") {
          password.type = "text"; // Show password
          eyeIcon.classList.replace("bx-hide", "bx-show");
        } else {
          password.type = "password"; // Hide password
          eyeIcon.classList.replace("bx-show", "bx-hide");
        }
      });
    });
  });

  // Toggle between login and signup forms
  const forms = document.querySelector(".forms");
  const links = document.querySelectorAll(".link");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      forms.classList.toggle("show-signup");
    });
  });
});
