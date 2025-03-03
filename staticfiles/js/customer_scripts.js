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
  let rows = document.querySelectorAll("#customerBody tr");

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
    .getElementById("customerForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      if (validateForm()) {
        addCustomer();
      }
    });
});

function validateForm() {
  let email = document.getElementById("email");
  let phoneNo = document.getElementById("phoneNo");

  let emailValue = email.value.trim();
  let phoneNoValue = phoneNo.value.trim();

  // Regular expressions for validation
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email format
  let phoneNoRegex = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;

  // Remove previous error messages
  removeError(email);
  removeError(phoneNo);

  let isValid = true;

  // Email Validation
  if (!emailRegex.test(emailValue)) {
    showError(email, "Enter a valid email (e.g., user@example.com)");
    isValid = false;
  }

  // Password Validation
  if (!phoneNoRegex.test(phoneNoValue)) {
    showError(
      phoneNo,
      "Invalid Phone Format.Phone number must be 10 digits & start with 6-9 (e.g., 9876543210)"
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

function addCustomer() {
  if (!validateForm()) {
    return; // STOP adding data if validation fails
  }

  let table = document.getElementById("customerBody");
  let rowCount = table.rows.length + 1;

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let address = document.getElementById("address").value;
  let phoneNo = document.getElementById("phoneNo").value;
  let email = document.getElementById("email").value;
  let gender = document.getElementById("gender").value;

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${rowCount}</td>
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${address}</td>
        <td>${phoneNo}</td>
        <td>${email}</td>
        <td>${gender}</td>
        <td class="action-buttons">
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;
  document.getElementById("customerBody").appendChild(newRow);

  document.getElementById("customerForm").reset();
  closeForm();
}

function updateRow(button) {
  let row = button.closest("tr");
  let columns = row.getElementsByTagName("td");

  document.getElementById("firstName").value = columns[1].innerText;
  document.getElementById("lastName").value = columns[2].innerText;
  document.getElementById("address").value = columns[3].innerText;
  document.getElementById("phoneNo").value = columns[4].innerText;
  document.getElementById("email").value = columns[5].innerText;
  document.getElementById("gender").value = columns[6].innerText.trim();

  openForm();
  row.remove(); // Remove the row before re-adding updated data
}

function deleteRow(button) {
  button.closest("tr").remove();
}

function openForm() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("myForm").style.display = "block";
  document.body.classList.add("popup-open");
}

function closeForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myForm").style.display = "none";
  document.body.classList.remove("popup-open");
}
