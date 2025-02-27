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
    let rows = document.querySelectorAll("#supplierTableBody tr");

    rows.forEach(function (row) {
        let name = row.cells[1].textContent.toLowerCase();
        let company = row.cells[2].textContent.toLowerCase();

        if (name.includes(filter) || company.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});

let supplierId = 1; // Auto-increment ID counter

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("supplierForm").addEventListener("submit", function (event) {
        event.preventDefault();
        addSupplier();
    });

    populateStaticDropdowns();
});

function populateStaticDropdowns() {
    let stores = ["Store A", "Store B", "Store C"];
    let storeDropdown = document.getElementById("supplierStore");

    // Clear existing options
    storeDropdown.innerHTML = '<option value="">Select Store</option>';

    stores.forEach(store => {
        let option = document.createElement("option");
        option.value = store;
        option.textContent = store;
        storeDropdown.appendChild(option);
    });
}

function addSupplier() {
    // Get input values
    let name = document.getElementById("supplierName").value.trim();
    let companyName = document.getElementById("companyName").value.trim();
    let email = document.getElementById("supplierEmail").value.trim();
    let phone = document.getElementById("supplierPhone").value.trim();
    let address = document.getElementById("supplierAddress").value.trim();
    let store = document.getElementById("supplierStore").value;

    // Clear previous error messages
    clearErrors();

    let isValid = true;

    // Email validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError("emailError", "Enter a valid email address.");
        isValid = false;
    }

    // Phone number validation (10 digits, starts with 6,7,8,9)
    let phoneRegex = /^[6789]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        showError("phoneError", "Enter a valid phone number (10 digits, starts with 6,7,8,9).");
        isValid = false;
    }

    // Check if fields are empty
    if (!name) {
        showError("nameError", "Name is required.");
        isValid = false;
    }
    if (!companyName) {
        showError("companyError", "Company name is required.");
        isValid = false;
    }
    if (!email) {
        showError("emailError", "Email is required.");
        isValid = false;
    }
    if (!phone) {
        showError("phoneError", "Phone number is required.");
        isValid = false;
    }
    if (!address) {
        showError("addressError", "Address is required.");
        isValid = false;
    }
    if (!store) {
        showError("storeError", "Please select a store.");
        isValid = false;
    }

    if (!isValid) return; // Stop execution if validation fails

    // Add row if validation passes
    let newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${supplierId}</td>
        <td>${name}</td>
        <td>${companyName}</td>
        <td>${email}</td>
        <td>${address}</td>
        <td>${phone}</td>
        <td>${store}</td>
        <td class="action-buttons">
            <button class="update-btn" onclick="updateRow(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteRow(this)"><i class="fas fa-trash"></i></button>
        </td>
    `;

    document.getElementById("supplierTableBody").appendChild(newRow);
    supplierId++;

    document.getElementById("supplierForm").reset();
    closeForm();
}

// Function to display error messages
function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Function to clear error messages
function clearErrors() {
    document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
    });
}

// Update supplier details (Fix: Keep supplier ID)
function updateRow(button) {
    let row = button.closest("tr");
    let columns = row.getElementsByTagName("td");

    let currentId = columns[0].innerText; // Store supplier ID before deleting the row

    document.getElementById("supplierName").value = columns[1].innerText;
    document.getElementById("companyName").value = columns[2].innerText;
    document.getElementById("supplierEmail").value = columns[3].innerText;
    document.getElementById("supplierAddress").value = columns[4].innerText;
    document.getElementById("supplierPhone").value = columns[5].innerText;
    document.getElementById("supplierStore").value = columns[6].innerText;

    row.remove();
    supplierId = currentId; // Keep the same ID for the updated supplier

    openForm();
}

// Delete supplier row
function deleteRow(button) {
    button.closest("tr").remove();
}

// Open popup form
function openForm() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("myForm").style.display = "block";
}

// Close popup form
function closeForm() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("myForm").style.display = "none";
}
