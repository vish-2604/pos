// Toggle search input on small devices
function toggleSearch() {
  let searchContainer = document.querySelector(".search-container");
  let searchInput = document.querySelector(".search-input");

  searchContainer.classList.toggle("active");
  if (searchContainer.classList.contains("active")) {
    searchInput.focus();
  }
}

// Search function
document.getElementById("searchInput").addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();
  let rows = document.querySelectorAll("#staffBody tr");

  rows.forEach(function (row) {
    let fullName = row.cells[1].textContent.toLowerCase();
    let userName = row.cells[2].textContent.toLowerCase();

    if (fullName.includes(filter) || userName.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("staffForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        addStaff();
      }
    });
});

function validateForm() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let emailValue = email.value.trim();
  let passwordValue = password.value.trim();

  // Regular expressions for validation
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Min 8 chars, 1 special character & 1 uppercase , 1 lowercase ,1 number

  // Remove previous error messages
  removeError(email);
  removeError(password);

  let isValid = true;

  // Email Validation
  if (!emailRegex.test(emailValue)) {
    showError(email, "Enter a valid email (e.g., user@example.com)");
    isValid = false;
  }

  // Password Validation
  if (!passwordRegex.test(passwordValue)) {
    showError(
      password,
      "Password must be at least 8 characters, with at least 1 Uppercase, 1 lowercase , 1 special character and 1 number."
    );
    isValid = false;
  }

  return isValid;
}

// Function to display error messages
function showError(input, message) {
  let errorSpan = document.createElement("span");
  errorSpan.classList.add("error-message");
  errorSpan.style.color = "red";
  errorSpan.style.fontSize = "12px";
  errorSpan.innerText = message;
  input.parentNode.appendChild(errorSpan);
}

// Function to remove previous error messages
function removeError(input) {
  let error = input.parentNode.querySelector(".error-message");
  if (error) {
    error.remove();
  }
}

function addStaff() {
  if (!validateForm()) {
    return; // STOP adding data if validation fails
  }

  let table = document.getElementById("staffBody");
  let rowCount = table.rows.length + 1;

  let fullName = document.getElementById("fullName").value;
  let userName = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let staffRole = document.getElementById("staffRole").value;
  let stores = document.getElementById("Stores").value;

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>${fullName}</td>
        <td>${userName}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>${staffRole}</td>
        <td>${stores}</td>
        <td class="action-buttons">
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;
  document.getElementById("staffBody").appendChild(newRow);

  document.getElementById("staffForm").reset();
  closeForm();
}

function updateRow(button) {
  let row = button.closest("tr");
  let columns = row.getElementsByTagName("td");

  document.getElementById("fullName").value = columns[1].innerText;
  document.getElementById("userName").value = columns[2].innerText;
  document.getElementById("email").value = columns[3].innerText;
  document.getElementById("password").value = columns[4].innerText;
  document.getElementById("staffRole").value = columns[5].innerText.trim();
  document.getElementById("Stores").value = columns[6].innerText.trim();

  openForm();
  row.remove();
}

function deleteRow(button) {
  button.closest("tr").remove();
}

function openForm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("myForm").style.display = "block";
  document.body.classList.add("popup-open"); // Prevent background scrolling
}

function closeForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myForm").style.display = "none";
  document.body.classList.remove("popup-open");
}
