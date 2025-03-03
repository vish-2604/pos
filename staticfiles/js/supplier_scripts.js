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
let currentRow = null;


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

    if (currentRow) {
        // If updating an existing row
        currentRow.cells[1].innerText = itemName;
    }
    else {

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
}

    document.getElementById("supplierForm").reset();
    closeForm();
    currentRow = null
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
    currentRow = button.closest("tr");
    let columns = row.getElementsByTagName("td");

    let sname = currentRow.cells[1].innerText;
    let cname = currentRow.cells[1].innerText;
    let semail = currentRow.cells[1].innerText;
    let saddr = currentRow.cells[1].innerText;
    let sphone = currentRow.cells[1].innerText;
    let store = currentRow.cells[1].innerText;

    document.getElementById("supplierName").value = sname;
    document.getElementById("companyName").value = cname;
    document.getElementById("supplierEmail").value = semail;
    document.getElementById("supplierAddress").value = saddr;
    document.getElementById("supplierPhone").value = sphone;
    document.getElementById("supplierStore").value = store;

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
    document.body.classList.add("popup-open");
}

// Close popup form
function closeForm() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("myForm").style.display = "none";
    document.body.classList.add("popup-open");
    currentRow = null;
}
