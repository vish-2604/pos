// New code
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
  let rows = document.querySelectorAll("#storeTableBody tr");

  rows.forEach(function (row) {
    let store = row.cells[1].textContent.toLowerCase();
    let manager = row.cells[2].textContent.toLowerCase();

    if (store.includes(filter) || manager.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});


let ID = 1;
let updateIndex = null; // Stores the row reference for updating

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("customerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      if (updateIndex !== null) {
        saveUpdatedCustomer(); // Update existing row
      } else {
        addCustomer(); // Add new row
      }
    }
  });
});

// Search function
document.getElementById("searchInput").addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();
  let rows = document.querySelectorAll("#customerBody tr");

  rows.forEach(function (row) {
    let firstName = row.cells[1].textContent.toLowerCase();
    let lastName = row.cells[2].textContent.toLowerCase();

    if (firstName.includes(filter) || lastName.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Function to add a new customer
function addCustomer() {
  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let address = document.getElementById("address").value.trim();
  let phoneNo = document.getElementById("phoneNo").value.trim();
  let email = document.getElementById("email").value.trim();
  let gender = document.getElementById("gender").value;

  clearErrors(); // Clears previous validation errors

  let isValid = true;

  if (!phoneNo) {
    showError("phoneError", "Invalid format for phone number.");
    isValid = false;
  }
  if (!email) {
    showError("emailError", "Email is required.");
    isValid = false;
  }
  if (!gender) {
    showError("genderError", "Please select gender.");
    isValid = false;
  }

  if (!isValid) return; // Stop if validation fails

  let newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td>${ID}</td>
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
  ID++; // Increment ID
  document.getElementById("customerForm").reset();
  closeForm();
}

// Function to update a row
function updateRow(button) {
  let row = button.closest("tr");
  let columns = row.getElementsByTagName("td");

  document.getElementById("firstName").value = columns[1].textContent;
  document.getElementById("lastName").value = columns[2].textContent;
  document.getElementById("address").value = columns[3].textContent;
  document.getElementById("phoneNo").value = columns[4].textContent;
  document.getElementById("email").value = columns[5].textContent;
  document.getElementById("gender").value = columns[6].textContent;

  updateIndex = row; // Store reference to the row for updating
  openForm(true);
}

// Function to save the updated customer details
function saveUpdatedCustomer() {
  if (updateIndex) {
    let firstName = document.getElementById("firstName").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let address = document.getElementById("address").value.trim();
    let phoneNo = document.getElementById("phoneNo").value.trim();
    let email = document.getElementById("email").value.trim();
    let gender = document.getElementById("gender").value;

    updateIndex.cells[1].textContent = firstName;
    updateIndex.cells[2].textContent = lastName;
    updateIndex.cells[3].textContent = address;
    updateIndex.cells[4].textContent = phoneNo;
    updateIndex.cells[5].textContent = email;
    updateIndex.cells[6].textContent = gender;

    updateIndex = null; // Reset after update
    document.getElementById("customerForm").reset();
    closeForm();
  }
}

// Function to delete a row
function deleteRow(button) {
  button.closest("tr").remove();
}

// Form validation function
function validateForm() {
  let phoneNo = document.getElementById("phoneNo").value.trim();
  let email = document.getElementById("email").value.trim();
  
  let phoneNoRegex = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  removeError(document.getElementById("phoneNo"));
  removeError(document.getElementById("email"));

  let isValid = true;

  if (!phoneNoRegex.test(phoneNo)) {
    showError("phoneError", "Invalid phone number format.");
    isValid = false;
  }

  if (!emailRegex.test(email)) {
    showError("emailError", "Invalid email format.");
    isValid = false;
  }

  return isValid;
}

// Function to show error messages
function showError(id, message) {
  document.getElementById(id).textContent = message;
}

// Function to clear all error messages
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });
}

// Open form modal
function openForm(isUpdate = false) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("myForm").style.display = "block";
  document.body.classList.add("popup-open");

  if (!isUpdate) {
    resetForm(); // Clears the form when adding a new customer
    updateIndex = null; // Clear any previous update reference
  }
}

// Close form modal
function closeForm() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("myForm").style.display = "none";
  document.body.classList.remove("popup-open");

  resetForm(); // Ensure form resets when closing
  updateIndex = null; // Reset update index when closing
}

// Function to reset the form
function resetForm() {
  document.getElementById("customerForm").reset();
}



// // Function to display error messages
function showError(input, message) {
  let errorSpan = document.createElement("span");
  errorSpan.classList.add("error-message");
  errorSpan.style.color = "red";
  errorSpan.style.fontSize = "12px";
  errorSpan.innerText = message;
  input.parentNode.appendChild(errorSpan);
}

// // Function to remove previous error messages
function removeError(input) {
  let error = input.parentNode.querySelector(".error-message");
  if (error) {
    error.remove();
  }
}

